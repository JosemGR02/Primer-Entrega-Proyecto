
//Imports
import express from "express";
import { rutaProductos } from "./rutas/Productos/rutaProds.js";
import { rutaCarrito } from "./rutas/Carrito/rutaCarts.js";
import { configura3 } from "../src/configuracion/index.js";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('/public'))


//Rutas
app.use('/api/productos', rutaProductos);
app.use('/api/carrito', rutaCarrito);

//Servidor
const server = app.listen(configura3.SERVER.PORT, () => console.log(`Server listening on PORT ${server.address().port}`));

