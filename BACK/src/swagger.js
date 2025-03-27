import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endPointsFiles = ['./app.js'];

const doc = {
    info: {
        title: 'API de Parqueaderos',
        description: 'Esta API permite gestionar usuarios y parqueaderos'
    },
    host: 'localhost:4000',
    scheme: ['http']
}

swaggerAutogen()(outputFile, endPointsFiles, doc);