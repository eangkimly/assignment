// const articleData = require("../models/articles.json")
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function filter(articles, query) {
  return articles.filter((article) => {
    const matchesCreatedBy = query.created_by
      ? article.createdById === parseInt(query.created_by)
      : true;
    const matchesIsPublished =
      query.is_published !== undefined
        ? article.is_published === (query.is_published === "true")
        : true;
    const matchesTitle = query.title
      ? article.title.toLowerCase().includes(query.title.toLowerCase())
      : true;
    const matchesContent = query.content
      ? article.content.toLowerCase().includes(query.content.toLowerCase())
      : true;
    return (
      matchesCreatedBy && matchesIsPublished && matchesTitle && matchesContent
    );
  });
}

const filterArticles = async (req, res) => {
  const query = req.query;
  try {
    const articles = await prisma.article.findMany({
      include: {
        createdBy: true,
      },
    });
    const filteredArticles = filter(articles, query);
    res.status(200).json({
      message: "Articles fetched successfully",
      data: filteredArticles,
    });
  } catch (err) {
    console.error("Error fetching articles:", err);
    res.status(500).send("Internal Server Error");
  }
};

const getAllArticles = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
  const pageSize = parseInt(req.query.pageSize) || 10;
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  try {
    const articles = await prisma.article.findMany({
      skip: skip,
      take: take,
      include: {
        createdBy: true,
        is_published: true,
      },
    });

    const totalItems = await prisma.article.count();
    res.json({
      page,
      pageSize,
      totalPages: Math.ceil(totalItems / pageSize),
      totalItems: totalItems,
      articles: articles,
    });
  } catch (err) {
    console.error("Error fetching articles:", err);
    res.status(500).send("Internal Server Error");
  }
};

const getArticleById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const article = await prisma.article.findUnique({
      where: { id: id },
      include: {
        createdBy: true,
      },
    });
    if (!article) {
      res.status(404).send("Article not found");
    } else {
      res.json(article);
    }
  } catch (err) {
    console.error("Error fetching article:", err);
    res.status(500).send("Internal Server Error");
  }
};

const createNewArticle = async (req, res) => {
  const { title, content, createdById, is_published } = req.body;

  try {
    const article = await prisma.article.create({
      data: {
        title: title,
        content: content,
        createdById: createdById,
        is_published: is_published,
      },
    });
    res.status(201).json({
      status: 201,
      data: article,
    });
  } catch (err) {
    console.error("Error creating article:", err);
    res.status(500).send("Internal Server Error");
  }
};

const updateArticle = async (req, res) => {
  const articleId = parseInt(req.params.id);
  const { title, content, createdById, is_published } = req.body;

  try {
    const article = await prisma.article.findUnique({
      where: { id: articleId },
    });
    if (!article) {
      return res.status(404).send("Article not found");
    }

    const updatedArticle = await prisma.article.update({
      where: { id: articleId },
      data: {
        title: title !== undefined ? title : article.title,
        content: content !== undefined ? content : article.content,
        createdById: createdById !== undefined ? createdById : article.createdById,
        is_published: is_published !== undefined ? is_published : article.is_published,
      },
    });

    res.status(200).json({
      status: 200,
      data: updatedArticle,
    });
  } catch (err) {
    console.error("Error updating article:", err);
    res.status(500).send("Internal Server Error");
  }
};

const deleteArticle = async (req, res) => {
  const articleId = parseInt(req.params.id);

  try {
    const article = await prisma.article.findUnique({
      where: { id: articleId },
    });
    if (!article) {
      return res.status(404).send("Article not found");
    }

    await prisma.article.delete({
      where: { id: articleId },
    });

    res.status(200).send("Article deleted successfully");
  } catch (err) {
    console.error("Error deleting article:", err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  filterArticles,
  getAllArticles,
  getArticleById,
  createNewArticle,
  updateArticle,
  deleteArticle,
};