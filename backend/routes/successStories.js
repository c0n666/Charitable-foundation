import express from 'express'
import { SuccessStory } from '../models/SuccessStory.js'
import { authenticate, requireAdmin } from '../middleware/auth.js'

const router = express.Router()

// Get all published success stories
router.get('/', async (req, res) => {
  try {
    const { campaignId } = req.query
    const stories = await SuccessStory.findAll({ campaignId })
    res.json(stories)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single story
router.get('/:id', async (req, res) => {
  try {
    const story = await SuccessStory.findById(req.params.id)
    if (!story) {
      return res.status(404).json({ error: 'Story not found' })
    }
    res.json(story)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create story (admin only)
router.post('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const story = await SuccessStory.create(req.body)
    res.status(201).json(story)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Publish story (admin only)
router.post('/:id/publish', authenticate, requireAdmin, async (req, res) => {
  try {
    const story = await SuccessStory.publish(req.params.id)
    res.json(story)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

export default router

