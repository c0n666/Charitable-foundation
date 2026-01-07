import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { HiChartBar, HiSparkles, HiUserGroup, HiHand, HiExclamationCircle } from 'react-icons/hi'
import Card from '../components/Card'
import Button from '../components/Button'
import CampaignItem from '../components/CampaignItem'
import { api } from '../services/api'

const HomePage = () => {
  const [campaigns, setCampaigns] = useState([])
  const [stats, setStats] = useState({ totalDonations: 0, totalCampaigns: 0, totalDonors: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadData()
    
    // Оновлюємо статистику кожні 30 секунд
    const interval = setInterval(() => {
      loadStats()
    }, 30000)
    
    return () => clearInterval(interval)
  }, [])

  const loadStats = async () => {
    try {
      const statsData = await api.getStats()
      setStats(statsData)
    } catch (error) {
      console.error('Error loading stats:', error)
      // Не показуємо помилку для автоматичного оновлення, щоб не заважати користувачу
    }
  }

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      const campaignsData = await api.getCampaigns({ limit: 3 })
      setCampaigns(campaignsData)
      await loadStats()
    } catch (error) {
      console.error('Error loading data:', error)
      if (error.code === 'ERR_NETWORK' || error.message?.includes('CONNECTION_REFUSED')) {
        setError('Backend сервер не запущений. Запустіть: npm run dev')
      } else {
        setError('Помилка завантаження даних. Спробуйте пізніше.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Фонд «Сила Добра»</h1>
          <p className="text-xl mb-8">Об&apos;єднуємо людей, щоб допомогти тим, хто найбільше потребує підтримки</p>
          <Link to="/campaigns">
            <Button variant="secondary" className="text-primary-600 bg-white hover:bg-gray-100">
              Переглянути кампанії
            </Button>
          </Link>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-12 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {typeof stats.totalDonations === 'number' 
                  ? stats.totalDonations.toLocaleString('uk-UA') 
                  : (parseFloat(stats.totalDonations) || 0).toLocaleString('uk-UA')} ₴
              </div>
              <div className="text-gray-600 dark:text-gray-400">Всього зібрано коштів</div>
            </Card>
            <Card className="text-center">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {stats.totalCampaigns || 0}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Активних кампаній</div>
            </Card>
            <Card className="text-center">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {stats.totalDonors || 0}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Активних донорів</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">Наша місія</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              Ми прагнемо об'єднати людей для надання допомоги тим, хто її потребує. 
              Наша мета - створити прозору та ефективну платформу для благодійності, 
              де кожна пожертва має значення та досягає своєї мети.
            </p>
          </Card>
        </div>
      </section>

      {/* Quick Links removed at user's request */}

      {/* Active Campaigns */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8">Активні кампанії</h2>
          {error && (
            <Card className="mb-6 bg-yellow-50 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-700">
              <div className="text-yellow-800 dark:text-yellow-200 flex items-start space-x-2">
                <HiExclamationCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>{error}</strong>
                <p className="mt-2 text-sm">Відкрийте термінал у корені проекту та виконайте: <code className="bg-yellow-100 dark:bg-yellow-800 px-2 py-1 rounded">npm run dev</code></p>
                </div>
              </div>
            </Card>
          )}
          {loading && !error && (
            <div className="text-center py-8 text-gray-600 dark:text-gray-400">Завантаження...</div>
          )}
          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map((campaign) => (
                  <CampaignItem key={campaign.id} campaign={campaign} />
                ))}
              </div>
              <div className="text-center mt-8">
                <Link to="/campaigns">
                  <Button>Переглянути всі кампанії</Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default HomePage

