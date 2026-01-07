// Firebase Firestore database
import { db } from '../config/firebase.js'
import { Timestamp } from 'firebase-admin/firestore'
import { convertFirestoreDoc, convertFirestoreDocs } from '../utils/firestore.js'

class FirestoreDB {
  // Users collection
  async addUser(userData) {
    const userRef = await db.collection('users').add({
      ...userData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
    const userDoc = await userRef.get()
    return convertFirestoreDoc(userDoc)
  }

  async getUser(id) {
    const userDoc = await db.collection('users').doc(id).get()
    if (!userDoc.exists) {
      return null
    }
    return convertFirestoreDoc(userDoc)
  }

  async getUserByEmail(email) {
    const querySnapshot = await db.collection('users')
      .where('email', '==', email)
      .limit(1)
      .get()
    
    if (querySnapshot.empty) {
      return null
    }
    return convertFirestoreDoc(querySnapshot.docs[0])
  }

  async getAllUsers() {
    const querySnapshot = await db.collection('users').get()
    return convertFirestoreDocs(querySnapshot.docs)
  }

  // Campaigns collection
  async addCampaign(campaignData) {
    const campaignRef = await db.collection('campaigns').add({
      ...campaignData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
    const campaignDoc = await campaignRef.get()
    return convertFirestoreDoc(campaignDoc)
  }

  async getCampaign(id) {
    const campaignDoc = await db.collection('campaigns').doc(id).get()
    if (!campaignDoc.exists) {
      return null
    }
    return convertFirestoreDoc(campaignDoc)
  }

  async getAllCampaigns(params = {}) {
    let query = db.collection('campaigns').orderBy('createdAt', 'desc')
    
    if (params.limit) {
      query = query.limit(parseInt(params.limit))
    }
    
    const querySnapshot = await query.get()
    return convertFirestoreDocs(querySnapshot.docs)
  }

  async updateCampaign(id, updates) {
    const campaignRef = db.collection('campaigns').doc(id)
    await campaignRef.update({
      ...updates,
      updatedAt: Timestamp.now(),
    })
    const updatedDoc = await campaignRef.get()
    return convertFirestoreDoc(updatedDoc)
  }

  async deleteCampaign(id) {
    await db.collection('campaigns').doc(id).delete()
    return true
  }

  // Donations collection
  async addDonation(donationData) {
    const donationRef = await db.collection('donations').add({
      ...donationData,
      createdAt: Timestamp.now(),
    })
    const donationDoc = await donationRef.get()
    return convertFirestoreDoc(donationDoc)
  }

  async getDonation(id) {
    const donationDoc = await db.collection('donations').doc(id).get()
    if (!donationDoc.exists) {
      return null
    }
    return convertFirestoreDoc(donationDoc)
  }

  async getAllDonations() {
    const querySnapshot = await db.collection('donations')
      .orderBy('createdAt', 'desc')
      .get()
    return convertFirestoreDocs(querySnapshot.docs)
  }

  // Reports collection
  async addReport(reportData) {
    const reportRef = await db.collection('reports').add({
      ...reportData,
      createdAt: Timestamp.now(),
    })
    const reportDoc = await reportRef.get()
    return convertFirestoreDoc(reportDoc)
  }

  async getReport(id) {
    const reportDoc = await db.collection('reports').doc(id).get()
    if (!reportDoc.exists) {
      return null
    }
    return convertFirestoreDoc(reportDoc)
  }

  async getAllReports() {
    const querySnapshot = await db.collection('reports').get()
    return convertFirestoreDocs(querySnapshot.docs)
  }

  // Achievements collection
  async addAchievement(achievementData) {
    const achievementRef = await db.collection('achievements').add({
      ...achievementData,
      createdAt: Timestamp.now(),
    })
    const achievementDoc = await achievementRef.get()
    return convertFirestoreDoc(achievementDoc)
  }

  async getUserAchievements(userId) {
    const querySnapshot = await db.collection('achievements')
      .where('userId', '==', userId)
      .orderBy('unlockedAt', 'desc')
      .get()
    return convertFirestoreDocs(querySnapshot.docs)
  }

  async checkAchievementExists(userId, type) {
    const querySnapshot = await db.collection('achievements')
      .where('userId', '==', userId)
      .where('type', '==', type)
      .limit(1)
      .get()
    return !querySnapshot.empty
  }

  // Expenses collection
  async addExpense(expenseData) {
    const expenseRef = await db.collection('expenses').add({
      ...expenseData,
      createdAt: Timestamp.now(),
    })
    const expenseDoc = await expenseRef.get()
    return convertFirestoreDoc(expenseDoc)
  }

  async getCampaignExpenses(campaignId) {
    const querySnapshot = await db.collection('expenses')
      .where('campaignId', '==', campaignId)
      .orderBy('date', 'desc')
      .get()
    return convertFirestoreDocs(querySnapshot.docs)
  }

  async getAllExpenses(params = {}) {
    let query = db.collection('expenses').orderBy('date', 'desc')
    
    if (params.startDate) {
      query = query.where('date', '>=', params.startDate)
    }
    if (params.endDate) {
      query = query.where('date', '<=', params.endDate)
    }
    
    const querySnapshot = await query.get()
    return convertFirestoreDocs(querySnapshot.docs)
  }

  // Success Stories collection
  async addSuccessStory(storyData) {
    const storyRef = await db.collection('successStories').add({
      ...storyData,
      createdAt: Timestamp.now(),
    })
    const storyDoc = await storyRef.get()
    return convertFirestoreDoc(storyDoc)
  }

  async getSuccessStory(id) {
    const storyDoc = await db.collection('successStories').doc(id).get()
    if (!storyDoc.exists) return null
    return convertFirestoreDoc(storyDoc)
  }

  async getAllSuccessStories(params = {}) {
    let query = db.collection('successStories')
      .where('published', '==', true)
      .orderBy('publishedAt', 'desc')
    
    if (params.campaignId) {
      query = query.where('campaignId', '==', params.campaignId)
    }
    
    const querySnapshot = await query.get()
    return convertFirestoreDocs(querySnapshot.docs)
  }

  async getCampaignSuccessStories(campaignId) {
    const querySnapshot = await db.collection('successStories')
      .where('campaignId', '==', campaignId)
      .where('published', '==', true)
      .orderBy('publishedAt', 'desc')
      .get()
    return convertFirestoreDocs(querySnapshot.docs)
  }

  async updateSuccessStory(id, updates) {
    const storyRef = db.collection('successStories').doc(id)
    await storyRef.update({
      ...updates,
      updatedAt: Timestamp.now(),
    })
    const updatedDoc = await storyRef.get()
    return convertFirestoreDoc(updatedDoc)
  }

  // Subscriptions collection
  async addSubscription(subscriptionData) {
    const subscriptionRef = await db.collection('subscriptions').add({
      ...subscriptionData,
      createdAt: Timestamp.now(),
    })
    const subscriptionDoc = await subscriptionRef.get()
    return convertFirestoreDoc(subscriptionDoc)
  }

  async getSubscription(id) {
    const subscriptionDoc = await db.collection('subscriptions').doc(id).get()
    if (!subscriptionDoc.exists) return null
    return convertFirestoreDoc(subscriptionDoc)
  }

  async getUserSubscriptions(userId) {
    const querySnapshot = await db.collection('subscriptions')
      .where('userId', '==', userId)
      .where('active', '==', true)
      .orderBy('nextPaymentDate', 'asc')
      .get()
    return convertFirestoreDocs(querySnapshot.docs)
  }

  async getCampaignSubscriptions(campaignId) {
    const querySnapshot = await db.collection('subscriptions')
      .where('campaignId', '==', campaignId)
      .where('active', '==', true)
      .get()
    return convertFirestoreDocs(querySnapshot.docs)
  }

  async updateSubscription(id, updates) {
    const subscriptionRef = db.collection('subscriptions').doc(id)
    await subscriptionRef.update({
      ...updates,
      updatedAt: Timestamp.now(),
    })
    const updatedDoc = await subscriptionRef.get()
    return convertFirestoreDoc(updatedDoc)
  }

  async getDueSubscriptions(date) {
    const querySnapshot = await db.collection('subscriptions')
      .where('active', '==', true)
      .where('nextPaymentDate', '<=', date)
      .get()
    return convertFirestoreDocs(querySnapshot.docs)
  }

  // Partners collection
  async addPartner(partnerData) {
    const partnerRef = await db.collection('partners').add({
      ...partnerData,
      createdAt: Timestamp.now(),
    })
    const partnerDoc = await partnerRef.get()
    return convertFirestoreDoc(partnerDoc)
  }

  async getAllPartners() {
    const querySnapshot = await db.collection('partners')
      .orderBy('createdAt', 'desc')
      .get()
    return convertFirestoreDocs(querySnapshot.docs)
  }

  // Articles/Blog collection
  async addArticle(articleData) {
    const articleRef = await db.collection('articles').add({
      ...articleData,
      createdAt: Timestamp.now(),
    })
    const articleDoc = await articleRef.get()
    return convertFirestoreDoc(articleDoc)
  }

  async getArticle(id) {
    const articleDoc = await db.collection('articles').doc(id).get()
    if (!articleDoc.exists) return null
    return convertFirestoreDoc(articleDoc)
  }

  async getAllArticles(params = {}) {
    let query = db.collection('articles')
      .where('published', '==', true)
      .orderBy('publishedAt', 'desc')
    
    if (params.category) {
      query = query.where('category', '==', params.category)
    }
    if (params.limit) {
      query = query.limit(parseInt(params.limit))
    }
    
    const querySnapshot = await query.get()
    return convertFirestoreDocs(querySnapshot.docs)
  }
}

const firestoreDB = new FirestoreDB()

export const initDatabase = async () => {
  console.log('Firebase Firestore database initialized')
  
  try {
    // Check if we have any campaigns, if not, add sample data
    const campaigns = await firestoreDB.getAllCampaigns()
    if (campaigns.length === 0) {
      console.log('Adding sample campaigns...')
      
      // Допомога дітям
      await firestoreDB.addCampaign({
        title: 'Допомога дітям з онкологічними захворюваннями',
        description: 'Збір коштів на лікування та реабілітацію дітей з онкологічними захворюваннями. Кожна гривня допомагає надати необхідну медичну допомогу та підтримку сім\'ям у складний період.',
        targetAmount: 500000,
        currentAmount: 187500,
        image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800',
        deadline: null,
      })
      
      // Медицина
      await firestoreDB.addCampaign({
        title: 'Підтримка лікарень - закупівля обладнання',
        description: 'Збір коштів для закупівлі сучасного медичного обладнання для обласних лікарень. Це дозволить покращити якість обслуговування пацієнтів та врятувати більше життів.',
        targetAmount: 1000000,
        currentAmount: 325000,
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800',
        deadline: null,
      })
      
      // Освіта
      await firestoreDB.addCampaign({
        title: 'Освітні програми для дітей з сільської місцевості',
        description: 'Організація освітніх програм та закупівля навчальних матеріалів для дітей з сільської місцевості. Мета - забезпечити рівний доступ до якісної освіти.',
        targetAmount: 300000,
        currentAmount: 95000,
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
        deadline: null,
      })
      
      // Допомога сім'ям
      await firestoreDB.addCampaign({
        title: 'Допомога багатодітним сім\'ям',
        description: 'Підтримка багатодітних сімей, які опинилися в складній життєвій ситуації. Надаємо продовольчу допомогу, одяг, шкільні приналежності та іншу необхідну підтримку.',
        targetAmount: 250000,
        currentAmount: 125000,
        image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800',
        deadline: null,
      })
      
      // Ветеранська допомога
      await firestoreDB.addCampaign({
        title: 'Підтримка ветеранів АТО/ООС',
        description: 'Допомога ветеранам бойових дій у реабілітації, отриманні медичної допомоги та соціальної адаптації. Підтримуємо тих, хто захищав нашу країну.',
        targetAmount: 400000,
        currentAmount: 210000,
        image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800',
        deadline: null,
      })
      
      // Допомога тваринам
      await firestoreDB.addCampaign({
        title: 'Допомога безпритульним тваринам',
        description: 'Збір коштів на утримання притулку для безпритульних тварин, ветеринарну допомогу, стерилізацію та пошук нових господарів для наших чотирилапих друзів.',
        targetAmount: 150000,
        currentAmount: 67500,
        image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800',
        deadline: null,
      })
      
      // Культура
      await firestoreDB.addCampaign({
        title: 'Підтримка культурних ініціатив',
        description: 'Фінансування культурних проєктів, фестивалів та мистецьких виставок. Зберігаємо та розвиваємо українську культуру та традиції.',
        targetAmount: 200000,
        currentAmount: 85000,
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
        deadline: null,
      })
      
      // Екологія
      await firestoreDB.addCampaign({
        title: 'Екологічні ініціативи - озеленення міст',
        description: 'Посадка дерев, створення парків та зелених зон у містах України. Покращуємо екологію та створюємо комфортні умови для життя.',
        targetAmount: 180000,
        currentAmount: 72000,
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
        deadline: null,
      })
      
      // Спорт
      await firestoreDB.addCampaign({
        title: 'Підтримка дитячого спорту',
        description: 'Закупівля спортивного інвентарю та організація тренувань для дітей з малозабезпечених сімей. Спорт формує характер та здоров\'я.',
        targetAmount: 220000,
        currentAmount: 110000,
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
        deadline: null,
      })
      
      // Допомога літнім людям
      await firestoreDB.addCampaign({
        title: 'Допомога людям похилого віку',
        description: 'Підтримка одиноких людей похилого віку: медична допомога, продовольчі набори, соціальна підтримка. Поважаємо та піклуємося про наших старших.',
        targetAmount: 280000,
        currentAmount: 140000,
        image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800',
        deadline: null,
      })
      
      // Допомога переселенцям
      await firestoreDB.addCampaign({
        title: 'Підтримка внутрішньо переміщених осіб',
        description: 'Допомога людям, які були змушені покинути свої домівки. Надаємо житло, продовольчу допомогу, допомогу з працевлаштуванням та соціальну підтримку.',
        targetAmount: 350000,
        currentAmount: 175000,
        image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800',
        deadline: null,
      })
      
      // Молодіжні програми
      await firestoreDB.addCampaign({
        title: 'Молодіжні освітні програми',
        description: 'Організація навчальних програм, майстер-класів та тренінгів для молоді. Розвиваємо навички та надаємо можливості для саморозвитку.',
        targetAmount: 240000,
        currentAmount: 96000,
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
        deadline: null,
      })
      
      console.log('Sample campaigns added (12 campaigns)')
    }

    // Check if we have any partners, if not, add sample data
    const partners = await firestoreDB.getAllPartners()
    if (partners.length === 0) {
      console.log('Adding sample partners...')

      await firestoreDB.addPartner({
        name: 'Фонд розвитку освіти',
        type: 'Благодійна організація',
        description:
          'Партнер у реалізації освітніх програм для дітей та молоді. Допомагає з грантами, стипендіями та навчальними матеріалами.',
        logo: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400',
        website: 'https://example-education-foundation.org',
      })

      await firestoreDB.addPartner({
        name: 'HealthCare UA',
        type: 'Корпоративний партнер',
        description:
          'Медична компанія, що підтримує закупівлю обладнання та витратних матеріалів для лікарень по всій Україні.',
        logo: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400',
        website: 'https://example-healthcare.ua',
      })

      await firestoreDB.addPartner({
        name: 'IT Volunteers',
        type: 'Волонтерська ініціатива',
        description:
          'Спільнота ІТ-фахівців, які допомагають з розробкою програмних рішень, автоматизацією процесів та кібербезпекою.',
        logo: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=400',
        website: 'https://example-it-volunteers.org',
      })

      console.log('Sample partners added')
    }

    // Check if we have any success stories, if not, add sample data
    const successStories = await firestoreDB.getAllSuccessStories()
    if (successStories.length === 0) {
      console.log('Adding sample success stories...')

      await firestoreDB.addSuccessStory({
        campaignId: null,
        title: 'Лікування для Марка: історія маленької перемоги',
        description:
          'Марко народився з вродженою вадою серця і довгий час потребував складної операції за кордоном. ' +
          'Його батьки звернулися до нашого фонду, коли можливості сім’ї були вичерпані, а час спливав. ' +
          'Ми запустили окрему кампанію, до якої долучилися тисячі людей з усієї України та діаспори. ' +
          'За три місяці нам вдалося зібрати повну суму не лише на операцію, а й на курс реабілітації. ' +
          'Сьогодні Марко повернувся до школи, активно займається спортом та мріє стати лікарем, щоб допомагати іншим дітям.',
        photos: ['https://images.unsplash.com/photo-1503457574462-bd27054394c1?w=800'],
        videos: [],
        beneficiary: 'Марко, 7 років',
        published: true,
        publishedAt: new Date().toISOString(),
      })

      await firestoreDB.addSuccessStory({
        campaignId: null,
        title: 'Обладнання для обласної лікарні',
        description:
          'Обласна лікарня щодня приймає сотні пацієнтів, але тривалий час не мала сучасного реанімаційного обладнання. ' +
          'Разом з партнерами ми розпочали збір коштів на апарат ШВЛ, монітори пацієнта, інфузомати та витратні матеріали. ' +
          'За декілька тижнів кампанії донори перерахували понад 350 000 ₴. ' +
          'Усе придбане обладнання було встановлено в реанімаційному відділенні, а лікарі пройшли додаткове навчання. ' +
          'Зараз завідувач відділення ділиться, що завдяки цій підтримці вдалося врятувати десятки пацієнтів, у тому числі дітей.',
        photos: ['https://images.unsplash.com/photo-1584466977773-e625c37cdd50?w=800'],
        videos: [],
        beneficiary: 'Обласна клінічна лікарня',
        published: true,
        publishedAt: new Date().toISOString(),
      })

      await firestoreDB.addSuccessStory({
        campaignId: null,
        title: 'Новий дім для родини переселенців',
        description:
          'Коли війна змусила родину Олени покинути рідне місто, вони виїхали лише з кількома валізами та документами. ' +
          'У новому місті сім’я з двома дітьми довгий час жила в гуртожитку без необхідних умов. ' +
          'Наш фонд запустив збір коштів на оренду житла, базові меблі, одяг та шкільне приладдя для дітей. ' +
          'За два тижні ми зібрали необхідну суму, орендували невелику, але затишну квартиру та повністю облаштували її. ' +
          'Сьогодні діти ходять до школи й секцій, а Олена разом із чоловіком розвивають власну невелику кав’ярню.',
        photos: ['https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800'],
        videos: [],
        beneficiary: 'Родина переселенців з Луганщини',
        published: true,
        publishedAt: new Date().toISOString(),
      })

      await firestoreDB.addSuccessStory({
        campaignId: null,
        title: 'Відновлення шкільної бібліотеки',
        description:
          'У невеликому містечку на сході України школа втратила частину приміщень через обстріли, а разом із ними — бібліотеку. ' +
          'Вчителі звернулися до нас із проханням допомогти відновити книжковий фонд, щоб діти мали доступ до сучасної літератури. ' +
          'Ми оголосили збір на закупівлю підручників, художніх книжок та інтерактивних матеріалів. ' +
          'За місяць кампанії вдалося придбати понад 2 000 книг, зокрема українську та світову класику, науково-популярні видання й дитячі енциклопедії. ' +
          'Тепер бібліотека знову працює, а школярі проводять там гуртки читання та літературні вечори.',
        photos: ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800'],
        videos: [],
        beneficiary: 'Учні та вчителі міської школи',
        published: true,
        publishedAt: new Date().toISOString(),
      })

      await firestoreDB.addSuccessStory({
        campaignId: null,
        title: 'Програма підтримки літніх людей',
        description:
          'У рамках програми підтримки людей похилого віку ми створили мережу волонтерів, які регулярно відвідують самотніх дідусів і бабусь. ' +
          'Завдяки пожертвам донорів нам вдалося організувати щомісячну доставку продуктових наборів, ліків та засобів гігієни. ' +
          'Крім матеріальної допомоги, волонтери проводять із підопічними час: допомагають по господарству, спілкуються, читають книжки. ' +
          'За перший рік програми постійну підтримку отримали понад 300 людей похилого віку у п’яти областях України. ' +
          'Багато хто з них уперше за довгий час відчув, що про них пам’ятають і піклуються.',
        photos: ['https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800'],
        videos: [],
        beneficiary: 'Одинокі люди похилого віку',
        published: true,
        publishedAt: new Date().toISOString(),
      })

      console.log('Sample success stories added')
    }

    // Check if we have any blog articles, if not, add sample data
    const articles = await firestoreDB.getAllArticles()
    if (articles.length === 0) {
      console.log('Adding sample blog articles...')

      await firestoreDB.addArticle({
        title: 'Як працює наш благодійний фонд: простими словами',
        content:
          'Ми щодня отримуємо десятки запитів на допомогу і сотні пожертв від людей по всій Україні та світу. ' +
          'У цій статті ми детально пояснюємо, як проходить шлях кожної гривні: від моменту донату до реальної допомоги людям. ' +
          'Розповідаємо про перевірку запитів, роботу команди та механізми контролю використання коштів.',
        category: 'Новини',
        image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800',
        published: true,
        publishedAt: new Date().toISOString(),
      })

      await firestoreDB.addArticle({
        title: '5 історій людей, яким ви вже допомогли',
        content:
          'За минулий рік завдяки нашим донорам ми реалізували десятки проєктів. ' +
          'У статті ділимося п’ятьма реальними історіями: від оплати курсу реабілітації до забезпечення житлом родини переселенців. ' +
          'Це історії про зміни, які стали можливими завдяки вашій небайдужості.',
        category: 'Історії',
        image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800',
        published: true,
        publishedAt: new Date().toISOString(),
      })

      await firestoreDB.addArticle({
        title: 'Прозорість та звітність: як ми звітуємо перед донорами',
        content:
          'Ми переконані, що довіра базується на прозорості. ' +
          'Тому регулярно публікуємо фінансові звіти, детально описуємо витрати та результати кожного проєкту. ' +
          'У статті розповідаємо, де знайти звіти, як їх читати та які додаткові інструменти контролю ми використовуємо.',
        category: 'Звіти',
        image: 'https://images.unsplash.com/photo-1542744173-05336fcc7ad4?w=800',
        published: true,
        publishedAt: new Date().toISOString(),
      })

      await firestoreDB.addArticle({
        title: 'Як стати волонтером: поради новачкам',
        content:
          'Волонтерство — це можливість змінювати світ навколо себе. ' +
          'Ми зібрали практичні поради для тих, хто хоче долучитися: як обрати напрям, з чого почати, ' +
          'як поєднувати волонтерство з роботою та не вигорати емоційно.',
        category: 'Події',
        image: 'https://images.unsplash.com/photo-1509099863731-ef4bff19e808?w=800',
        published: true,
        publishedAt: new Date().toISOString(),
      })

      console.log('Sample blog articles added')
    }
  } catch (error) {
    console.error('Error initializing database:', error)
  }

  return firestoreDB
}

export default firestoreDB
