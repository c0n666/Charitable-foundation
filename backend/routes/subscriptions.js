import express from 'express'
import { authenticate } from '../middleware/auth.js'
import { Subscription } from '../models/Subscription.js'

const router = express.Router()

// Create subscription
router.post('/', authenticate, async (req, res) => {
  try {
    const { campaignId, amount, frequency, startDate } = req.body
    const subscription = await Subscription.create({
      userId: req.user.id,
      campaignId,
      amount,
      frequency,
      startDate,
    })
    res.status(201).json(subscription)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Get user subscriptions
router.get('/me', authenticate, async (req, res) => {
  try {
    const subscriptions = await Subscription.findByUser(req.user.id)
    res.json(subscriptions)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Cancel subscription
router.post('/:id/cancel', authenticate, async (req, res) => {
  try {
    const subscription = await Subscription.cancel(req.params.id)
    res.json(subscription)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

export default router

