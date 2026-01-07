import express from 'express'
import { authenticate } from '../middleware/auth.js'
import db from '../database/index.js'
import { Donation } from '../models/Donation.js'
import { Achievement } from '../models/Achievement.js'

const router = express.Router()

// Get current user's donor stats
router.get('/me/stats', authenticate, async (req, res) => {
  try {
    const donations = await db.getAllDonations()

    // Normalize emails to avoid issues with case/whitespace differences
    const normalizeEmail = (email) => (email || '').trim().toLowerCase()
    const userEmail = normalizeEmail(req.user.email)

    const userDonations = donations.filter((d) => normalizeEmail(d.email) === userEmail)
    
    const totalAmount = userDonations.reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0)
    const donationCount = userDonations.length
    const campaignsSupported = new Set(userDonations.map((d) => d.campaignId)).size
    
    const level = Achievement.getLevel(totalAmount)
    // Тимчасово не завантажуємо досягнення тут, щоб уникнути помилок 500
    const achievements = []
    
    res.json({
      totalAmount,
      donationCount,
      campaignsSupported,
      level,
      achievements: achievements || [],
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get current user's donations
router.get('/me/donations', authenticate, async (req, res) => {
  try {
    const donations = await db.getAllDonations()
    const userDonations = donations
      .filter(d => d.email === req.user.email)
      .map(d => ({
        id: d.id,
        campaignId: d.campaignId,
        campaignTitle: d.campaignTitle,
        amount: d.amount,
        message: d.message,
        createdAt: d.createdAt,
      }))
    
    res.json(userDonations)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get public donor registry
router.get('/public', async (req, res) => {
  try {
    const { limit = 50, sortBy = 'amount' } = req.query
    const donations = await db.getAllDonations()
    
    // Aggregate by email
    const donorMap = new Map()
    
    donations.forEach(donation => {
      const email = donation.email
      if (!donorMap.has(email)) {
        donorMap.set(email, {
          email: donation.anonymous ? 'Анонімний донор' : email,
          name: donation.anonymous ? 'Анонімний донор' : donation.donorName,
          totalAmount: 0,
          donationCount: 0,
          anonymous: donation.anonymous || false,
        })
      }
      
      const donor = donorMap.get(email)
      donor.totalAmount += donation.amount || 0
      donor.donationCount += 1
    })
    
    let donors = Array.from(donorMap.values())
    
    // Sort
    if (sortBy === 'amount') {
      donors.sort((a, b) => b.totalAmount - a.totalAmount)
    } else if (sortBy === 'count') {
      donors.sort((a, b) => b.donationCount - a.donationCount)
    }
    
    // Limit
    donors = donors.slice(0, parseInt(limit))
    
    // Add levels
    donors = donors.map(donor => ({
      ...donor,
      level: Achievement.getLevel(donor.totalAmount),
    }))
    
    res.json(donors)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router

