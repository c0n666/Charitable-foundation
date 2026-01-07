import db from '../database/index.js'

export class Campaign {
  static async findAll(params = {}) {
    return await db.getAllCampaigns(params)
  }

  static async findById(id) {
    return await db.getCampaign(id)
  }

  static async create(campaignData) {
    const {
      title,
      description,
      targetAmount,
      image = '',
      deadline = null,
    } = campaignData

    const campaign = await db.addCampaign({
      title,
      description,
      targetAmount: parseFloat(targetAmount),
      currentAmount: 0,
      image,
      deadline: deadline || null,
    })

    return campaign
  }

  static async update(id, campaignData) {
    const updates = {
      ...campaignData,
    }

    if (campaignData.targetAmount) {
      updates.targetAmount = parseFloat(campaignData.targetAmount)
    }

    return await db.updateCampaign(id, updates)
  }

  static async delete(id) {
    return await db.deleteCampaign(id)
  }

  static async addDonation(id, amount) {
    const campaign = await this.findById(id)
    if (!campaign) {
      throw new Error('Campaign not found')
    }

    // currentAmount should already be a number after conversion
    const currentAmount = campaign.currentAmount || 0

    const updated = await db.updateCampaign(id, {
      currentAmount: currentAmount + parseFloat(amount),
    })

    return updated
  }
}

