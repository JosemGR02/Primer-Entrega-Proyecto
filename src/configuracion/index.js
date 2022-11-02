
import dotenv from "dotenv";
dotenv.config();

const Productos_FileName = "productos";
const Carritos_FileName = "carritos";


const configura3 = {
    SERVER: {
        PORT: process.env.PORT || 8080,
    },
    DATABASES: {
        fileSystem: {
            Productos_FileName,
            Carritos_FileName
        }
    }
}

export { configura3 };

