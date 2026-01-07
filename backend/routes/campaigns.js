import express from 'express'
import { Campaign } from '../models/Campaign.js'
import { authenticate, requireAdmin } from '../middleware/auth.js'

const router = express.Router()

// Get all campaigns
router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.findAll(req.query)
    res.json(campaigns)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single campaign
router.get('/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id)
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' })
    }
    res.json(campaign)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create campaign (admin only)
router.post('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const campaign = await Campaign.create(req.body)
    res.status(201).json(campaign)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Update campaign (admin only)
router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const campaign = await Campaign.update(req.params.id, req.body)
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' })
    }
    res.json(campaign)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete campaign (admin only)
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    await Campaign.delete(req.params.id)
    res.json({ message: 'Campaign deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router

