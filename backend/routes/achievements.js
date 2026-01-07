import express from 'express'
import { authenticate } from '../middleware/auth.js'
import { Achievement } from '../models/Achievement.js'
import db from '../database/index.js'

const router = express.Router()

// Get user achievements
router.get('/me', authenticate, async (req, res) => {
  try {
    const achievements = await Achievement.findByUser(req.user.id)
    res.json(achievements)
  } catch (error) {
    console.error('Error loading achievements:', error)
    // Не блокуємо кабінет, якщо сталася помилка з досягненнями
    res.json([])
  }
})

// Check and unlock achievements after donation
router.post('/check', authenticate, async (req, res) => {
  try {
    const userId = req.user.id
    const donations = await db.getAllDonations()
    const userDonations = donations.filter(d => d.email === req.user.email)
    
    const totalAmount = userDonations.reduce((sum, d) => sum + (d.amount || 0), 0)
    const donationCount = userDonations.length
    const campaignsSupported = new Set(userDonations.map(d => d.campaignId)).size
    
    const newAchievements = await Achievement.checkAndUnlock(userId, {
      totalAmount,
      donationCount,
      campaignsSupported,
    })
    
    res.json({ newAchievements })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router

