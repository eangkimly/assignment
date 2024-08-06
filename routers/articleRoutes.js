const articleRoutes = require("express").Router();
const articleController = require("../controllers/articleController");

articleRoutes.get("/articles/search", articleController.filterArticles)
articleRoutes.get("/articles", articleController.getAllArticles);
articleRoutes.post("/articles", articleController.createNewArticle);
articleRoutes.get("/articles/:id", articleController.getArticleById)
articleRoutes.patch("/articles/:id", articleController.updateArticle)
articleRoutes.delete("/articles/:id", articleController.deleteArticle)

module.exports = articleRoutes;