import { Router } from "express";
import { FECHA_UTILS } from "../../utils/index.js";
import { ProductoDao, CarritoDao } from "../../dao/dao.js";


const rutaCarrito = Router();

rutaCarrito.post('/', async (solicitud, respuesta) =>{
    try {
        const carritoBase = { timestamp: FECHA_UTILS.getTimestamp(), productos: [] };

        const carrito = await CarritoDao.guardar(carritoBase);

        respuesta.send({ success: true, carritoId: carrito.id });
    } catch (error) {
        respuesta.send({error: "Error al guardar un carrito"})
    }
});

rutaCarrito.post("/:carritoId/productos", async (solicitud, respuesta) => {
    try {
        const { productoId } = solicitud.body;
        const { carritoId } = solicitud.params;

        const carrito = await CarritoDao.obtenerXid(Number(carritoId));

        if (!carrito) return respuesta.send({ error: true, mensaje: "No se encontro el carrito solicitado"});

        const producto = await ProductoDao.obtenerXid(Number(productoId));

        if (!producto) return respuesta.send({ error: true, mensaje: "No se encontro el producto solicitado"});

        carrito.productos.push(producto);

        const carritoActualizado = await CarritoDao.actualizar(Number(carritoId), carrito);

        respuesta.send({ success: true, carrito: carritoActualizado });
    } catch (error) {
        respuesta.send({error: "Error al guardar un producto al carrito"})
    }
})

rutaCarrito.get('/:carritoId/productos', async (solicitud, respuesta) =>{
    try {
        const { carritoId } = solicitud.params;

        const carrito = await CarritoDao.obtenerXid(Number(carritoId));
        if (!carrito) { respuesta.send({error: "Error, no se encontro el carrito"})} 

        else {
            const listadoProductos = await ProductoDao.obtenerTodos();
            
            if (!listadoProductos) return respuesta.send({ error: true, mensaje: "No se encontraron los productos solicitados"});

            respuesta.send({success: true, productos: carrito.productos });
        }
    } catch (error) {
        respuesta.send({error: "Error al obtener la lista los productos del carrito"})
    }
});

rutaCarrito.delete('/:carritoId/productos/:productoId', async (solicitud, respuesta) =>{
    try {
        const { carritoId, productoId } = solicitud.params;

        const carrito = await CarritoDao.obtenerXid(Number(carritoId));
        if (!carrito) { respuesta.send({error: "Error, no se encontro el carrito"})} 

        else {
            const producto = await ProductoDao.obtenerXid(Number(productoId));
            if (!producto) return respuesta.send({error: "Error, no se encontro el producto"})

            const elementoEncontradoIndex = carrito.productos.findIndex(elemento => elemento.id === Number(productoId))
            if (elementoEncontradoIndex === -1) return respuesta.send({error: "Error, no se encontro el producto"})
            carrito.productos.splice(elementoEncontradoIndex, 1)
        }
        const carritoActualizado = await CarritoDao.actualizar(Number(carritoId), carrito)
        respuesta.send({success: true, mensaje: "Se elimino correctamente el producto del carrito", carrito: carritoActualizado})

    } catch (error) {
        respuesta.send({error: "Error al eliminar un producto del carrito"})
    }
});

rutaCarrito.delete('/:carritoId', async (solicitud, respuesta) =>{
    try {
        const { carritoId } = solicitud.params;

        await CarritoDao.eliminarXid(Number(carritoId));
        
        respuesta.send({success: true, mensaje: `Se elimino correctamente el carrito ${carritoId}`})
    } catch (error) {
        respuesta.send({error: "Error al eliminar el carrito seleccionado"})
    }
});

export { rutaCarrito }
