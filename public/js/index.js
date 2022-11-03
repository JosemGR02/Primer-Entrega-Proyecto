const obtenerProdsFetch = async () => {
    try {
        const respuesta = await fetch("/api/productos");
        const productos = await respuesta.json();
        return productos;
    } catch (error) {
        console.log(error);
    }
};

const tablaProductos = async (productos) => {
    const archivoPlantilla = await fetch("vistas/tablaProductos.hbs");
    const plantillaTexto = await archivoPlantilla.text();
    const plantillaCompilada = Handlebars.compile(plantillaTexto);
    return plantillaCompilada({ productos });
};

const renderizadoProductos = async () => {
    const contenedorProductos = document.getElementById("ContenedorDeProds");

    const productos = await obtenerProdsFetch();

    contenedorProductos.innerHTML = await tablaProductos(productos);
};

const botonObtener = document.getElementById("obtenerProductos");

botonObtener.addEventListener("click", renderizadoProductos);

//window.addEventListener("load", renderizadoProductos);




/*
para form productos index.html

<div id="nuevoProducto">
    <h1 id="prodTitulo"> Formulario productos </h1>
    <form id="formularioProds">
        <input type="text" name="titulo" placeholder="Titulo" class="nuevoProd_input">
        <input type="number" name="precio" placeholder="Precio" class="nuevoProd_input">
        <input type="text" name="imagen" placeholder="imagen" class="nuevoProd_input">
        <button type="submit" id="nuevoProd_input">Subir</button>
    </form>
</div>

<div>
    <div>
        <p></p>
        <h5></h5>
        <h5></h5>
        <img src="" alt="">
    </div>
    <div>
        <button id="actualizarProd">actualizar</button>
    <button id="eliminarProd">eliminar</button>
    </div>
</div>
*/