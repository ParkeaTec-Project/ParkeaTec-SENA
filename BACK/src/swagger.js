import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'API de Parqueaderos',
            description: 'Esta API permite gestionar usuarios y parqueaderos',
            version: '1.0.0'
        },
        servers: [
            {
                url: "http://localhost:4000",
                description: "Servidor de desarrollo",
            },
        ],
    },
    apis: [path.join(__dirname, "./routes/*.js")],
};
//console.log("Swagger cargando archivos desde:", path.resolve("./src/routes/*.js"));
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;


