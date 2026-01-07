import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HiStar, HiCollection, HiHeart } from 'react-icons/hi'
import Card from '../components/Card'
import Button from '../components/Button'
import { api } from '../services/api'

const DonorDashboard = () => {
  const [stats, setStats] = useState(null)
  const [donations, setDonations] = useState([])
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
    
    // Оновлюємо дані кожні 30 секунд
    const interval = setInterval(() => {
      loadData()
    }, 30000)
    
    return () => clearInterval(interval)
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [statsData, donationsData, achievementsData] = await Promise.all([
        api.getDonorStats(),
        api.getMyDonations(),
        api.getMyAchievements(),
      ])
      setStats(statsData)
      setDonations(donationsData)
      setAchievements(achievementsData)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">Завантаження...</div>
      </div>
    )
  }

  const level = stats?.level || { level: 1, name: 'Початківець', color: 'gray' }
  const levelColors = {
    gray: 'bg-gray-500',
    orange: 'bg-orange-500',
    yellow: 'bg-yellow-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-8">
        Особистий кабінет
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="text-center">
          <div className={`w-16 h-16 ${levelColors[level.color] || 'bg-gray-500'} rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold`}>
            {level.level}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Рівень</div>
          <div className="text-xl font-bold text-gray-800 dark:text-gray-200">{level.name}</div>
        </Card>

        <Card className="text-center">
          <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
            {stats?.totalAmount?.toLocaleString('uk-UA') || 0} ₴
          </div>
          <div className="text-gray-600 dark:text-gray-400">Всього пожертвовано</div>
        </Card>

        <Card className="text-center">
          <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
            {stats?.donationCount || 0}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Кількість донатів</div>
        </Card>

        <Card className="text-center">
          <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
            {stats?.campaignsSupported || 0}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Підтримано кампаній</div>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Досягнення ({achievements.length})
        </h2>
        {achievements.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            Продовжуйте робити донати, щоб отримати досягнення!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800 rounded-lg border-2 border-yellow-300 dark:border-yellow-600"
              >
                <div className="flex justify-center mb-2">
                  <HiStar className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="font-bold text-gray-800 dark:text-gray-200 mb-1">
                  {achievement.title}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {achievement.description}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  {new Date(achievement.unlockedAt).toLocaleDateString('uk-UA')}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Donation History */}
      <Card>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Історія донатів
        </h2>
        {donations.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Ви ще не зробили жодного донату
            </p>
            <Link to="/campaigns">
              <Button>Переглянути кампанії</Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">Кампанія</th>
                  <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">Сума</th>
                  <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">Дата</th>
                  <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">Дія</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation) => (
                  <tr
                    key={donation.id}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="py-3 px-4">
                      <Link
                        to={`/campaigns/${donation.campaignId}`}
                        className="text-primary-600 dark:text-primary-400 hover:underline"
                      >
                        {donation.campaignTitle}
                      </Link>
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-800 dark:text-gray-200">
                      {donation.amount?.toLocaleString('uk-UA')} ₴
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      {new Date(donation.createdAt).toLocaleDateString('uk-UA')}
                    </td>
                    <td className="py-3 px-4">
                      <Link to={`/campaigns/${donation.campaignId}`}>
                        <Button variant="secondary" className="text-sm">
                          Детальніше
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}

export default DonorDashboard

