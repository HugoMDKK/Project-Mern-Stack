import userService from "../services/user.service.js";

export const create = async (req, res) => {
  try {
    const { name, username, email, password, avatar, background } = req.body;

    const user = await userService.createUser({
      name,
      username,
      email,
      password,
      avatar,
      background,
    });

    res.status(201).send({
      message: "User created sucessfully",
      user: {
        id: user._id,
        name,
        username,
        email,
        avatar,
        background,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const findAll = async (req, res) => {
  try {
    const users = await userService.findAllUsers(); 
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const findById = async (req, res) => {
  try {
    const user = await userService.findUserById(req.params.id);
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
export const update = async (req, res) => {
  try {
    const { name, username, email, password, avatar, background } = req.body;
    const updatedUser = await userService.updateUser(req.params.id, {
      name,
      username,
      email,
      password,
      avatar,
      background,
    });
    res.send({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

export default { create, findAll, findById, update };
