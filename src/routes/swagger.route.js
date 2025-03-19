import swaggerUi from 'swagger-ui-express';
import { Router } from 'express';
import { readFile } from 'fs/promises';

const swaggerRouter = Router();

// Carregar o JSON do Swagger de forma assíncrona
const loadSwaggerDocument = async () => {
  try {
    const data = await readFile(new URL('../swagger.json', import.meta.url), 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao carregar o Swagger JSON:', error);
    return null;
  }
};

// Configuração das rotas do Swagger UI
(async () => {
  const swaggerDocument = await loadSwaggerDocument();
  if (swaggerDocument) {
    swaggerRouter.use('/', swaggerUi.serve);
    swaggerRouter.get('/', swaggerUi.setup(swaggerDocument));
  }
})();

export default swaggerRouter;
