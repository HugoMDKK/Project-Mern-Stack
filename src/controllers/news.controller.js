import * as newsService from "../services/news.service.js";

const handleError = (res, err) => {
  res.status(500).send({ message: err.message });
};

export const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body;
    await newsService.createService({ title, text, banner, user: req.userId });
    res.sendStatus(201);
  } catch (err) {
    handleError(res, err);
  }
};

export const findAll = async (req, res) => {
  try {
    let { limit = 10, offset = 0 } = req.query;
    limit = Number(limit);
    offset = Number(offset);

    const [news, total] = await Promise.all([
      newsService.findAllService(offset, limit),
      newsService.countNewsService()
    ]);

    const currentUrl = req.baseUrl;
    const nextUrl = offset + limit < total ? `${currentUrl}?limit=${limit}&offset=${offset + limit}` : null;
    const previousUrl = offset - limit >= 0 ? `${currentUrl}?limit=${limit}&offset=${offset - limit}` : null;

    res.send({ nextUrl, previousUrl, limit, offset, total, results: formatNewsList(news) });
  } catch (err) {
    handleError(res, err);
  }
};

export const topNews = async (req, res) => {
  try {
    const news = await newsService.topNewsService();
    if (!news) return res.status(400).send({ message: "No top news found" });
    res.send({ news: formatNews(news) });
  } catch (err) {
    handleError(res, err);
  }
};

export const findById = async (req, res) => {
  try {
    const news = await newsService.findByIdService(req.params.id);
    res.send({ news: formatNews(news) });
  } catch (err) {
    handleError(res, err);
  }
};

export const searchByTitle = async (req, res) => {
  try {
    const news = await newsService.searchByTitleService(req.query.title);
    if (news.length === 0) return res.status(400).send({ message: "No news found with this title" });
    res.send({ results: formatNewsList(news) });
  } catch (err) {
    handleError(res, err);
  }
};

export const byUser = async (req, res) => {
  try {
    const news = await newsService.byUserService(req.userId);
    res.send({ results: formatNewsList(news) });
  } catch (err) {
    handleError(res, err);
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await newsService.findByIdService(id);
    if (news.user._id.toString() !== req.userId.toString()) {
      return res.status(403).send({ message: "Unauthorized update" });
    }
    await newsService.updateService(id, req.body);
    res.send({ message: "News updated successfully" });
  } catch (err) {
    handleError(res, err);
  }
};

export const erase = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await newsService.findByIdService(id);
    if (news.user._id.toString() !== req.userId.toString()) {
      return res.status(403).send({ message: "Unauthorized deletion" });
    }
    await newsService.eraseService(id);
    res.send({ message: "News deleted successfully" });
  } catch (err) {
    handleError(res, err);
  }
};

export const likeNews = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const liked = await newsService.likeNewsService(id, userId);
    if (!liked) {
      await newsService.deleteLikeService(id, userId);
      return res.send({ message: "Like removed successfully" });
    }
    res.send({ message: "Like added successfully" });
  } catch (err) {
    handleError(res, err);
  }
};

export const addComment = async (req, res) => {
  try {
    if (!req.body.comment) return res.status(400).send({ message: "Comment is required" });
    await newsService.addCommentService(req.params.id, req.body.comment, req.userId);
    res.send({ message: "Comment added successfully" });
  } catch (err) {
    handleError(res, err);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { idNews, idComment } = req.params;
    const userId = req.userId;
    const updatedNews = await newsService.deleteCommentService(idNews, idComment, userId);

    const commentExists = updatedNews.comments.some(comment => comment.idComment === idComment);
    if (!commentExists) return res.status(400).send({ message: "Comment not found" });

    res.send({ message: "Comment deleted successfully" });
  } catch (err) {
    handleError(res, err);
  }
};

// Funções auxiliares para formatação de resposta
const formatNews = (news) => ({
  id: news._id,
  title: news.title,
  text: news.text,
  banner: news.banner,
  likes: news.likes,
  comments: news.comments,
  name: news.user.name,
  userName: news.user.username,
  userAvatar: news.user.avatar,
});

const formatNewsList = (newsList) => newsList.map(formatNews);
