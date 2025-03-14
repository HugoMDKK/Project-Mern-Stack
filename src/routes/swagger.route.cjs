const { Router } = require('express');
const swaggerRouter = Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');


// Configuração das rotas do Swagger UI
swaggerRouter.use('/', swaggerUi.serve);
swaggerRouter.get('/', swaggerUi.setup(swaggerDocument));

module.exports = swaggerRouter;
