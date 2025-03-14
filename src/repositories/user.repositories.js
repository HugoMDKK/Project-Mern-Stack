import User from "../models/User.js";

// Método para criar um novo usuário
const create = (userData) => User.create(userData);

// Método para encontrar todos os usuários
const findAll = () => User.find();

// Método para encontrar um usuário pelo email
const findByEmail = (email) => User.findOne({ email });

// Método para encontrar um usuário pelo ID
const findById = (id) => User.findById(id);

// Método para atualizar um usuário pelo ID
const update = (id, updateData) => 
  User.findByIdAndUpdate(id, updateData, { new: true }); // Atualiza e retorna o novo documento atualizado

export default { create, findAll, findByEmail, findById, update };
