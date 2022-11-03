
import { Router } from "express";
import { ProductoDao } from "../../dao/dao.js";
import { FECHA_UTILS, VALIDACION_JOI } from "../../utils/index.js";
import { verificarAdmin } from "../../middlewares/index.js";



const rutaProductos = Router();

rutaProductos.get('/', async (solicitud, respuesta) =>{
    try {
        const productos = await ProductoDao.obtenerTodos();

        if (!productos) { respuesta.send({ error: "No se encontraron los productos" });}

        respuesta.send(productos)
    } catch (error) {
        respuesta.send({error: "Error, al obtener todos los productos"})
    }
});

rutaProductos.get('/:id', async (solicitud, respuesta) =>{
    try {
        const { id } = solicitud.params
        const producto = await ProductoDao.obtenerXid(Number(id));

        respuesta.send(producto)
    } catch (error) {
        respuesta.send({error: "Error al obtener por id el producto seleccionado"})
    }
});

rutaProductos.post('/', verificarAdmin, async (solicitud, respuesta) =>{
    try {
        const { titulo, descripcion, codigo, imagen, precio, stock } = solicitud.body;

        const producto = await VALIDACION_JOI.productoJoi.validateAsync({
            titulo, descripcion, codigo, imagen, precio, stock, timestamp: FECHA_UTILS.getTimestamp()
        });
    
        const nuevoProducto = await ProductoDao.guardar(producto)
    
        respuesta.send(nuevoProducto)
    } catch (error) {
        respuesta.send({error: "Error al guardar el producto seleccionado"})
    }
});

// no entiendo porque pero en postman hay que darle send 2 veces para que actualice (capas que me pasa a mi nomas)
rutaProductos.put('/:id', async (solicitud, respuesta) =>{
    try {
        const id = solicitud.params.id;
        const { titulo, descripcion, codigo, imagen, precio, stock } = solicitud.body;
        const productoActualizado = await ProductoDao.actualizar(id, { titulo, descripcion, codigo, imagen, precio, stock });

        respuesta.send({success: true, actualizado: productoActualizado})
    } catch (error) {
        respuesta.send({error: "Error al actualizar el producto seleccionado"})
    }
});


rutaProductos.delete('/:id', async (solicitud, respuesta) =>{
    try {
        const { id } = solicitud.params
        await ProductoDao.eliminarXid(Number(id));

        respuesta.send({success: true})
    } catch (error) {
        respuesta.send({error: "Error al eliminar el producto seleccionado"})
    }
});


export { rutaProductos }

