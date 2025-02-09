import express from "express";
import connectDatabase from "./src/database/db.js";

import userRoute from "./src/routes/user.route.js";
import authRoute from "./src/routes/auth.route.js";
import newsRoute from "./src/routes/news.route.js";

import 'dotenv/config'; // Formato ES Modules

const app = express();
const port = process.env.PORT || 3000;


connectDatabase()
app.use(express.json());s

app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/news", newsRoute);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));