// Script to add more campaigns to the database
import { initDatabase } from '../database/index.js'
import db from '../database/index.js'

const additionalCampaigns = [
  {
    title: 'Допомога дітям з онкологічними захворюваннями',
    description: 'Збір коштів на лікування та реабілітацію дітей з онкологічними захворюваннями. Кожна гривня допомагає надати необхідну медичну допомогу та підтримку сім\'ям у складний період.',
    targetAmount: 500000,
    currentAmount: 187500,
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800',
    deadline: null,
  },
  {
    title: 'Підтримка лікарень - закупівля обладнання',
    description: 'Збір коштів для закупівлі сучасного медичного обладнання для обласних лікарень. Це дозволить покращити якість обслуговування пацієнтів та врятувати більше життів.',
    targetAmount: 1000000,
    currentAmount: 325000,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800',
    deadline: null,
  },
  {
    title: 'Освітні програми для дітей з сільської місцевості',
    description: 'Організація освітніх програм та закупівля навчальних матеріалів для дітей з сільської місцевості. Мета - забезпечити рівний доступ до якісної освіти.',
    targetAmount: 300000,
    currentAmount: 95000,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
    deadline: null,
  },
  {
    title: 'Допомога багатодітним сім\'ям',
    description: 'Підтримка багатодітних сімей, які опинилися в складній життєвій ситуації. Надаємо продовольчу допомогу, одяг, шкільні приналежності та іншу необхідну підтримку.',
    targetAmount: 250000,
    currentAmount: 125000,
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800',
    deadline: null,
  },
  {
    title: 'Підтримка ветеранів АТО/ООС',
    description: 'Допомога ветеранам бойових дій у реабілітації, отриманні медичної допомоги та соціальної адаптації. Підтримуємо тих, хто захищав нашу країну.',
    targetAmount: 400000,
    currentAmount: 210000,
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800',
    deadline: null,
  },
  {
    title: 'Допомога безпритульним тваринам',
    description: 'Збір коштів на утримання притулку для безпритульних тварин, ветеринарну допомогу, стерилізацію та пошук нових господарів для наших чотирилапих друзів.',
    targetAmount: 150000,
    currentAmount: 67500,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800',
    deadline: null,
  },
  {
    title: 'Підтримка культурних ініціатив',
    description: 'Фінансування культурних проєктів, фестивалів та мистецьких виставок. Зберігаємо та розвиваємо українську культуру та традиції.',
    targetAmount: 200000,
    currentAmount: 85000,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    deadline: null,
  },
  {
    title: 'Екологічні ініціативи - озеленення міст',
    description: 'Посадка дерев, створення парків та зелених зон у містах України. Покращуємо екологію та створюємо комфортні умови для життя.',
    targetAmount: 180000,
    currentAmount: 72000,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
    deadline: null,
  },
  {
    title: 'Підтримка дитячого спорту',
    description: 'Закупівля спортивного інвентарю та організація тренувань для дітей з малозабезпечених сімей. Спорт формує характер та здоров\'я.',
    targetAmount: 220000,
    currentAmount: 110000,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
    deadline: null,
  },
  {
    title: 'Допомога людям похилого віку',
    description: 'Підтримка одиноких людей похилого віку: медична допомога, продовольчі набори, соціальна підтримка. Поважаємо та піклуємося про наших старших.',
    targetAmount: 280000,
    currentAmount: 140000,
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800',
    deadline: null,
  },
  {
    title: 'Підтримка внутрішньо переміщених осіб',
    description: 'Допомога людям, які були змушені покинути свої домівки. Надаємо житло, продовольчу допомогу, допомогу з працевлаштуванням та соціальну підтримку.',
    targetAmount: 350000,
    currentAmount: 175000,
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800',
    deadline: null,
  },
  {
    title: 'Молодіжні освітні програми',
    description: 'Організація навчальних програм, майстер-класів та тренінгів для молоді. Розвиваємо навички та надаємо можливості для саморозвитку.',
    targetAmount: 240000,
    currentAmount: 96000,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
    deadline: null,
  },
]

async function addCampaigns() {
  try {
    await initDatabase()
    
    // Check existing campaigns
    const existing = await db.getAllCampaigns()
    console.log(`Current campaigns: ${existing.length}`)
    
    // Add additional campaigns
    for (const campaign of additionalCampaigns) {
      // Check if campaign with same title already exists
      const exists = existing.some(c => c.title === campaign.title)
      if (!exists) {
        await db.addCampaign(campaign)
        console.log(`Added: ${campaign.title}`)
      } else {
        console.log(`Skipped (already exists): ${campaign.title}`)
      }
    }
    
    console.log('Done!')
    process.exit(0)
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

addCampaigns()

