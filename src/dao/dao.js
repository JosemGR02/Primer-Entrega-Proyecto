import { ContenedorFilesystem } from "../contenedor/index.js";
import { configura3 } from "../configuracion/index.js";

const ProductoDao = new ContenedorFilesystem('configura3.DATABASES.Productos_FileName')
const CarritoDao = new ContenedorFilesystem('configura3.DATABASES.Carritos_FileName')

export { ProductoDao, CarritoDao }


