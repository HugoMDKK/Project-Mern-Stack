import * as newsRepository from "../repositories/news.repositories.js";

// Criação de uma nova notícia
export const createService = async (newsData) => {
  return await newsRepository.createNews(newsData);
};

// Busca todas as notícias
export const findAllService = async (offset, limit) => {
  return await newsRepository.findAllNews(offset, limit);
};

// Conta o total de notícias
export const countNewsService = async () => {
  return await newsRepository.countTotalNews();
};

// Busca a notícia mais recente
export const topNewsService = async () => {
  return await newsRepository.findTopNews();
};

// Busca uma notícia pelo ID
export const findByIdService = async (id) => {
  return await newsRepository.findNewsById(id);
};

// Busca notícias pelo título
export const searchByTitleService = async (title) => {
  return await newsRepository.searchNewsByTitle(title);
};

// Busca notícias de um usuário específico
export const byUserService = async (userId) => {
  return await newsRepository.findNewsByUserId(userId);
};

// Atualiza uma notícia
export const updateService = async (id, updates) => {
  return await newsRepository.updateNewsById(id, updates);
};

// Remove uma notícia
export const eraseService = async (id) => {
  return await newsRepository.deleteNewsById(id);
};

// Adiciona um like a uma notícia
export const likeNewsService = async (idNews, userId) => {
  return await newsRepository.addLikeToNews(idNews, userId);
};

// Remove um like de uma notícia
export const deleteLikeService = async (idNews, userId) => {
  return await newsRepository.removeLikeFromNews(idNews, userId);
};

// Adiciona um comentário a uma notícia
export const addCommentService = async (idNews, commentData) => {
  return await newsRepository.addCommentToNews(idNews, commentData);
};

// Remove um comentário de uma notícia
export const deleteCommentService = async (idNews, idComment, userId) => {
  return await newsRepository.removeCommentFromNews(idNews, idComment, userId);
};
