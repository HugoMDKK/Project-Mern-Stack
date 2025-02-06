import express from "express";
import userRoute from "./src/routes/user.route.js";
import connectDatabase from "./src/database/db.js";


import 'dotenv/config'; // Formato ES Modules

const app = express();
const port = process.env.PORT;


connectDatabase()
app.use(express.json());
app.use("/user", userRoute);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));