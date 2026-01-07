import db from '../database/index.js'

export class Expense {
  static async create(expenseData) {
    const { campaignId, amount, category, description, receipt, date } = expenseData
    
    const expense = await db.addExpense({
      campaignId,
      amount: parseFloat(amount),
      category,
      description,
      receipt: receipt || '',
      date: date || new Date().toISOString(),
    })
    
    return expense
  }

  static async findByCampaign(campaignId) {
    return await db.getCampaignExpenses(campaignId)
  }

  static async findAll(params = {}) {
    return await db.getAllExpenses(params)
  }

  static async getStats(startDate, endDate) {
    const expenses = await db.getAllExpenses({ startDate, endDate })
    
    const total = expenses.reduce((sum, e) => sum + (e.amount || 0), 0)
    const byCategory = expenses.reduce((acc, e) => {
      const cat = e.category || 'Інше'
      acc[cat] = (acc[cat] || 0) + (e.amount || 0)
      return acc
    }, {})
    
    return {
      total,
      byCategory,
      count: expenses.length,
    }
  }
}

