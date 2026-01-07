import db from '../database/index.js'

export class SuccessStory {
  static async create(storyData) {
    const { campaignId, title, description, photos, videos, beneficiary } = storyData
    
    const story = await db.addSuccessStory({
      campaignId,
      title,
      description,
      photos: photos || [],
      videos: videos || [],
      beneficiary: beneficiary || '',
      published: false,
    })
    
    return story
  }

  static async findAll(params = {}) {
    return await db.getAllSuccessStories(params)
  }

  static async findById(id) {
    return await db.getSuccessStory(id)
  }

  static async findByCampaign(campaignId) {
    return await db.getCampaignSuccessStories(campaignId)
  }

  static async update(id, updates) {
    return await db.updateSuccessStory(id, updates)
  }

  static async publish(id) {
    return await db.updateSuccessStory(id, { published: true, publishedAt: new Date().toISOString() })
  }
}

