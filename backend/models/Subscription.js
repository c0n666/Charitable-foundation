import db from '../database/index.js'

export class Subscription {
  static async create(subscriptionData) {
    const { userId, campaignId, amount, frequency, startDate } = subscriptionData
    
    const nextPaymentDate = this.calculateNextPaymentDate(startDate, frequency)
    
    const subscription = await db.addSubscription({
      userId,
      campaignId,
      amount: parseFloat(amount),
      frequency, // 'monthly', 'quarterly', 'yearly'
      startDate: startDate || new Date().toISOString(),
      nextPaymentDate,
      active: true,
    })
    
    return subscription
  }

  static calculateNextPaymentDate(startDate, frequency) {
    const date = new Date(startDate)
    switch (frequency) {
      case 'monthly':
        date.setMonth(date.getMonth() + 1)
        break
      case 'quarterly':
        date.setMonth(date.getMonth() + 3)
        break
      case 'yearly':
        date.setFullYear(date.getFullYear() + 1)
        break
    }
    return date.toISOString()
  }

  static async findByUser(userId) {
    return await db.getUserSubscriptions(userId)
  }

  static async findByCampaign(campaignId) {
    return await db.getCampaignSubscriptions(campaignId)
  }

  static async updateNextPayment(id) {
    const subscription = await db.getSubscription(id)
    if (!subscription) return null
    
    const nextPaymentDate = this.calculateNextPaymentDate(
      subscription.nextPaymentDate || subscription.startDate,
      subscription.frequency
    )
    
    return await db.updateSubscription(id, { nextPaymentDate })
  }

  static async cancel(id) {
    return await db.updateSubscription(id, { active: false })
  }

  static async getDueSubscriptions() {
    const now = new Date().toISOString()
    return await db.getDueSubscriptions(now)
  }
}

