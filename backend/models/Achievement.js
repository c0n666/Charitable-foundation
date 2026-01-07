import db from '../database/index.js'

export class Achievement {
  static async create(achievementData) {
    const { userId, type, title, description } = achievementData
    
    const achievement = await db.addAchievement({
      userId,
      type,
      title,
      description,
      unlockedAt: new Date().toISOString(),
    })
    
    return achievement
  }

  static async findByUser(userId) {
    return await db.getUserAchievements(userId)
  }

  static async checkAndUnlock(userId, donationStats) {
    const achievements = []
    const { totalAmount, donationCount, campaignsSupported } = donationStats

    // Перший донат
    if (donationCount >= 1) {
      const exists = await db.checkAchievementExists(userId, 'first_donation')
      if (!exists) {
        achievements.push(await this.create({
          userId,
          type: 'first_donation',
          title: 'Перший крок',
          description: 'Ви зробили свій перший донат!',
        }))
      }
    }

    // 10 донатів
    if (donationCount >= 10) {
      const exists = await db.checkAchievementExists(userId, 'ten_donations')
      if (!exists) {
        achievements.push(await this.create({
          userId,
          type: 'ten_donations',
          title: 'Відданий донор',
          description: 'Ви зробили 10 донатів!',
        }))
      }
    }

    // 1000₴
    if (totalAmount >= 1000) {
      const exists = await db.checkAchievementExists(userId, 'thousand_donor')
      if (!exists) {
        achievements.push(await this.create({
          userId,
          type: 'thousand_donor',
          title: 'Тисячник',
          description: 'Ви пожертвували понад 1000₴!',
        }))
      }
    }

    // 10000₴
    if (totalAmount >= 10000) {
      const exists = await db.checkAchievementExists(userId, 'ten_thousand_donor')
      if (!exists) {
        achievements.push(await this.create({
          userId,
          type: 'ten_thousand_donor',
          title: 'Великий серцем',
          description: 'Ви пожертвували понад 10000₴!',
        }))
      }
    }

    // 5 кампаній
    if (campaignsSupported >= 5) {
      const exists = await db.checkAchievementExists(userId, 'five_campaigns')
      if (!exists) {
        achievements.push(await this.create({
          userId,
          type: 'five_campaigns',
          title: 'Різноманітність',
          description: 'Ви підтримали 5 різних кампаній!',
        }))
      }
    }

    return achievements
  }

  static getLevel(totalAmount) {
    if (totalAmount < 500) return { level: 1, name: 'Початківець', color: 'gray' }
    if (totalAmount < 2000) return { level: 2, name: 'Бронзовий', color: 'orange' }
    if (totalAmount < 5000) return { level: 3, name: 'Срібний', color: 'gray' }
    if (totalAmount < 10000) return { level: 4, name: 'Золотий', color: 'yellow' }
    if (totalAmount < 50000) return { level: 5, name: 'Платиновий', color: 'blue' }
    return { level: 6, name: 'Діамантовий', color: 'purple' }
  }
}

