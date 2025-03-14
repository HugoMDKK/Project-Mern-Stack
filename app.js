import 'dotenv/config'; // Formato ES Modules
import express from "express";
import connectDatabase from "./src/database/db.js";
import cors from "cors"; // Adicionando o CORS
import router from "./src/routes/index.js";


const app = express();

connectDatabase();
app.use(cors()); // Configurando o CORS
app.use(express.json());
app.use(router);

export default app; // Exportando app para uso em outros arquivos
