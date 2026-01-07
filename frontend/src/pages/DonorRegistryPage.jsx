import { useState, useEffect } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import { api } from '../services/api'

const DonorRegistryPage = () => {
  const [donors, setDonors] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('amount')

  useEffect(() => {
    loadDonors()
  }, [sortBy])

  const loadDonors = async () => {
    try {
      setLoading(true)
      const data = await api.getPublicDonors({ sortBy })
      setDonors(data)
    } catch (error) {
      console.error('Error loading donors:', error)
    } finally {
      setLoading(false)
    }
  }

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
        Реєстр донорів
      </h1>

      {/* Sort Controls */}
      <Card className="mb-8">
        <div className="flex items-center space-x-4">
          <span className="text-gray-700 dark:text-gray-300">Сортувати по:</span>
          <Button
            variant={sortBy === 'amount' ? 'primary' : 'secondary'}
            onClick={() => setSortBy('amount')}
          >
            Сума
          </Button>
          <Button
            variant={sortBy === 'count' ? 'primary' : 'secondary'}
            onClick={() => setSortBy('count')}
          >
            Кількість
          </Button>
        </div>
      </Card>

      {loading ? (
        <div className="text-center py-12">Завантаження...</div>
      ) : donors.length === 0 ? (
        <Card>
          <div className="text-center py-12 text-gray-600 dark:text-gray-400">
            Поки що немає донорів
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donors.map((donor, index) => (
            <Card key={index} className="text-center">
              <div className="mb-4">
                <div
                  className={`w-16 h-16 ${
                    levelColors[donor.level?.color] || 'bg-gray-500'
                  } rounded-full mx-auto flex items-center justify-center text-white text-xl font-bold`}
                >
                  {donor.level?.level || 1}
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                {donor.name}
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Рівень: {donor.level?.name || 'Початківець'}
              </div>
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                {donor.totalAmount?.toLocaleString('uk-UA')} ₴
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {donor.donationCount} {donor.donationCount === 1 ? 'донат' : 'донатів'}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default DonorRegistryPage

