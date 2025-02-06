import mongoose from "mongoose";
import 'dotenv/config'; // Carrega as variáveis do .env automaticamente

const connectDatabase = () => {
  console.log("Wait connecting to the database");

  mongoose
    .connect(process.env.MONGO_URI) // Usa a variável do .env
    .then(() => console.log("MongoDB Atlas Connected"))
    .catch((error) => console.error("MongoDB connection error:", error));
};

export default connectDatabase;
