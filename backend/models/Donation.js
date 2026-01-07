import db from '../database/index.js'
import { Campaign } from './Campaign.js'

export class Donation {
  static async create(donationData) {
    const { campaignId, amount, donorName, email, message = '' } = donationData

    // Get campaign to include title
    const campaign = await Campaign.findById(campaignId)
    if (!campaign) {
      throw new Error('Campaign not found')
    }

    // Create donation
    const donation = await db.addDonation({
      campaignId: campaignId,
      amount: parseFloat(amount),
      donorName,
      email,
      message,
      campaignTitle: campaign.title,
    })

    // Update campaign amount
    await Campaign.addDonation(campaignId, amount)

    return donation
  }

  static async findById(id) {
    return await db.getDonation(id)
  }

  static async findAll() {
    // Already sorted by createdAt desc in getAllDonations
    return await db.getAllDonations()
  }

  static async getStats() {
    const donations = await db.getAllDonations()
    const campaigns = await db.getAllCampaigns()

    // Calculate total amount from all campaigns' currentAmount
    // This includes initial amounts set when creating campaigns + all donations
    const totalDonations = campaigns.reduce((sum, campaign) => {
      return sum + (parseFloat(campaign.currentAmount) || 0)
    }, 0)
    
    // Count only active campaigns (those that haven't reached their target amount)
    // A campaign is active if currentAmount < targetAmount
    const activeCampaigns = campaigns.filter(campaign => {
      const currentAmount = parseFloat(campaign.currentAmount) || 0
      const targetAmount = parseFloat(campaign.targetAmount) || 0
      return currentAmount < targetAmount
    })
    
    const totalCampaigns = activeCampaigns.length
    
    // Count unique donors (by email)
    const totalDonors = new Set(donations.map(d => d.email).filter(email => email)).size

    return {
      totalDonations,
      totalCampaigns,
      totalDonors,
    }
  }
}

