import News from "../models/News.js";

// Criação de uma nova notícia
export const createNews = (body) => News.create(body);

// Busca todas as notícias com paginação
export const findAllNews = (offset, limit) =>
  News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

// Conta o total de documentos no banco
export const countTotalNews = () => News.countDocuments();

// Busca a notícia mais recente
export const findTopNews = () =>
  News.findOne().sort({ _id: -1 }).populate("user");

// Busca uma notícia pelo ID
export const findNewsById = (id) => News.findById(id).populate("user");

// Busca notícias pelo título com filtro
export const searchNewsByTitle = (title) =>
  News.find({
    title: { $regex: `${title || ""}`, $options: "i" },
  })
    .sort({ _id: -1 })
    .populate("user");

// Busca notícias por usuário
export const findNewsByUserId = (userId) =>
  News.find({ user: userId }).sort({ _id: -1 }).populate("user");

// Atualiza notícia pelo ID
export const updateNewsById = (id, updates) =>
  News.findByIdAndUpdate(id, updates, { new: true });

// Remove notícia pelo ID
export const deleteNewsById = (id) => News.findByIdAndDelete(id);

// Adiciona like à notícia
export const addLikeToNews = (idNews, userId) =>
  News.findOneAndUpdate(
    { _id: idNews, "likes.userId": { $nin: [userId] } },
    { $push: { likes: { userId, created: new Date() } } }
  );

// Remove like de uma notícia
export const removeLikeFromNews = (idNews, userId) =>
  News.findOneAndUpdate({ _id: idNews }, { $pull: { likes: { userId } } });

// Adiciona comentário na notícia
export const addCommentToNews = (idNews, commentData) =>
  News.findOneAndUpdate(
    { _id: idNews },
    { $push: { comments: commentData } },
    { new: true }
  );

// Remove comentário de uma notícia
export const removeCommentFromNews = (idNews, idComment, userId) =>
  News.findOneAndUpdate(
    { _id: idNews },
    { $pull: { comments: { idComment, userId } } },
    { new: true }
  );
