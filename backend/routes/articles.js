import express from 'express'
import db from '../database/index.js'
import { authenticate, requireAdmin } from '../middleware/auth.js'

const router = express.Router()

// Get all published articles
router.get('/', async (req, res) => {
  try {
    const { category, limit } = req.query
    const articles = await db.getAllArticles({ category, limit })
    res.json(articles)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single article
router.get('/:id', async (req, res) => {
  try {
    const article = await db.getArticle(req.params.id)
    if (!article) {
      return res.status(404).json({ error: 'Article not found' })
    }
    res.json(article)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create article (admin only)
router.post('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const article = await db.addArticle({
      ...req.body,
      published: false,
    })
    res.status(201).json(article)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

export default router

