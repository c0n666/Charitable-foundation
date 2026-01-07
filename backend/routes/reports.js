import express from 'express'
import { Expense } from '../models/Expense.js'
import { Donation } from '../models/Donation.js'
import db from '../database/index.js'

const router = express.Router()

// Get financial reports
router.get('/financial', async (req, res) => {
  try {
    const { startDate, endDate, campaignId } = req.query
    
    // Get expenses
    const expenses = await Expense.findAll({ startDate, endDate })
    const filteredExpenses = campaignId 
      ? expenses.filter(e => e.campaignId === campaignId)
      : expenses
    
    // Get donations
    const donations = await db.getAllDonations()
    const filteredDonations = campaignId
      ? donations.filter(d => d.campaignId === campaignId)
      : donations
    
    // Calculate totals
    const totalExpenses = filteredExpenses.reduce((sum, e) => sum + (e.amount || 0), 0)
    const totalDonations = filteredDonations.reduce((sum, d) => sum + (d.amount || 0), 0)
    const netAmount = totalDonations - totalExpenses
    
    // Expenses by category
    const expensesByCategory = filteredExpenses.reduce((acc, e) => {
      const cat = e.category || 'Інше'
      acc[cat] = (acc[cat] || 0) + (e.amount || 0)
      return acc
    }, {})
    
    // Admin expenses percentage
    const adminExpenses = filteredExpenses
      .filter(e => e.category === 'Адміністрація')
      .reduce((sum, e) => sum + (e.amount || 0), 0)
    const adminPercentage = totalDonations > 0 
      ? (adminExpenses / totalDonations) * 100 
      : 0
    
    res.json({
      period: { startDate, endDate },
      totals: {
        donations: totalDonations,
        expenses: totalExpenses,
        net: netAmount,
      },
      expensesByCategory,
      adminPercentage: adminPercentage.toFixed(2),
      expenses: filteredExpenses,
      donations: filteredDonations,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router

