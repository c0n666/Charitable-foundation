import express from 'express'
import { Donation } from '../models/Donation.js'
import { authenticate, requireAdmin } from '../middleware/auth.js'

const router = express.Router()

// Create donation (requires authentication)
router.post('/donate', authenticate, async (req, res) => {
  try {
    const { campaignId, amount, donorName, email, message } = req.body

    if (!campaignId || !amount) {
      return res.status(400).json({ error: 'Missing required fields: campaignId and amount' })
    }

    // Use authenticated user's email if not provided
    const userEmail = email || req.user.email
    const userName = donorName || req.user.name

    if (!userEmail) {
      return res.status(400).json({ error: 'Email is required' })
    }

    const donation = await Donation.create({
      campaignId,
      amount,
      donorName: userName,
      email: userEmail,
      message,
    })

    res.status(201).json({
      message: 'Donation created successfully',
      donation,
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Get all donations (admin only)
router.get('/donations', authenticate, requireAdmin, async (req, res) => {
  try {
    const donations = await Donation.findAll()
    res.json(donations)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get donation statistics
router.get('/donations/stats', async (req, res) => {
  try {
    const stats = await Donation.getStats()
    res.json(stats)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router

