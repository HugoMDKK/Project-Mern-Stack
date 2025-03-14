import { update } from "../controllers/user.controller.js";
import userRepositories from "../repositories/user.repositories.js";
import UserRepository from "../repositories/user.repositories.js";

export const createUser = async ({
  name,
  username,
  email,
  password,
  avatar,
  background,
}) => {
  if (!username || !name || !email || !password || !avatar || !background)
    throw new Error("Submit all fields for registration");

  const newUser = { name, username, email, password, avatar, background };

  const foundUser = await UserRepository.findById(email);

  if (foundUser) throw new Error("User already registered");

  const user = await userRepositories.create(newUser);

  if (!user) throw new Error("Error creating User");

  return user;
};

export const findAllUsers = async () => {
  const users = await userRepositories.findAll();
  if (users.length === 0) throw new Error("There are no registered users");
  return users;
};

export const findUserById = async (id) => {
  const user = await userRepositories.findUserById(id);
  if (!user) throw new Error("User not found");
  return user;
};

export const updateUser = async (
  userId,
  { name, username, email, password, avatar, background }
) => {
  if (!name && !username && !email && !password && !avatar && !background)
    throw new Error("Submit at least one field for update");

  const updatedUser = await userRepositories.update(userId, {
    id,
    name,
    username,
    email,
    password,
    avatar,
    background,
  });
  if (!updatedUser) {
    throw new Error("Error updating User");
  }
  return updatedUser;
};

export default { createUser, findAllUsers, findUserById, updateUser };
