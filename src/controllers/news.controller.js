import { createService, findAllService } from "../services/news.service.js";

const create = async (req, res) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.send(401);
    }

    const parts = authorization.split(" ");

    if (parts.length !== 2) {
      return res.send(401);
    }

    const [schema, token] = parts;

    if (schema !== "Bearer") {
      return res.send(401);
    }

    const { title, text, banner } = req.body;

    if (!title || !banner || !text) {
      res.status(400).send({
        message: "Submit all fields for registration the news",
      });
    }

    await createService({
      title,
      text,
      banner,
      user: { _id: "67a48c12f4481cb796026004" },
    });

    res.send(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const findAll = async (req, res) => {
  const news = await findAllService();
  if (news.length === 0) {
    return res.send(400).send({ message: "There are no registered news" });
  }
  res.send(news);
};

export { create, findAll };
