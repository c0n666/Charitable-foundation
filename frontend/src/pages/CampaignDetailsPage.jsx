import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import QuickDonate from '../components/QuickDonate'
import SocialShare from '../components/SocialShare'
import RecurringDonationForm from '../components/RecurringDonationForm'
import { api } from '../services/api'

const CampaignDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [campaign, setCampaign] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCampaign()
  }, [id])

  const loadCampaign = async () => {
    try {
      setLoading(true)
      const data = await api.getCampaign(id)
      setCampaign(data)
    } catch (error) {
      console.error('Error loading campaign:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDonate = () => {
    navigate(`/donate/${id}`)
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">Завантаження...</div>
      </div>
    )
  }

  if (!campaign) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">Кампанія не знайдена</div>
      </div>
    )
  }

  const currentAmount = typeof campaign.currentAmount === 'number' ? campaign.currentAmount : parseFloat(campaign.currentAmount) || 0
  const targetAmount = typeof campaign.targetAmount === 'number' ? campaign.targetAmount : parseFloat(campaign.targetAmount) || 1
  const progress = (currentAmount / targetAmount) * 100
  const progressPercentage = Math.min(progress, 100)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/campaigns" className="text-primary-600 dark:text-primary-400 hover:underline mb-4 inline-block">
        ← Назад до кампаній
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {campaign.image && (
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-full h-96 object-cover rounded-lg mb-6"
            />
          )}
          <Card>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              {campaign.title}
            </h1>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed whitespace-pre-line">
                {campaign.description}
              </p>
            </div>
          </Card>
        </div>

        <div>
          <Card className="sticky top-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Статус кампанії
            </h2>
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600 dark:text-gray-400">Зібрано:</span>
                <span className="font-semibold text-primary-600 dark:text-primary-400">
                  {currentAmount.toLocaleString('uk-UA')} ₴
                </span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600 dark:text-gray-400">Цільова сума:</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {targetAmount.toLocaleString('uk-UA')} ₴
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4">
                <div
                  className="bg-primary-500 h-4 rounded-full transition-all"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                {progressPercentage.toFixed(1)}% виконано
              </div>
            </div>
            <Button onClick={handleDonate} className="w-full mb-4">
              Пожертвувати
            </Button>
            <div className="mb-4 space-y-3">
              <QuickDonate campaignId={id} campaignTitle={campaign.title} />
            </div>
            <div className="mb-4">
              <RecurringDonationForm campaignId={id} campaignTitle={campaign.title} />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              <p>Дата створення: {new Date(campaign.createdAt).toLocaleDateString('uk-UA')}</p>
              {campaign.deadline && (
                <p>Термін: {new Date(campaign.deadline).toLocaleDateString('uk-UA')}</p>
              )}
            </div>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <SocialShare
                url={`${window.location.origin}/campaigns/${id}`}
                title={campaign.title}
                description={campaign.description?.substring(0, 100)}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CampaignDetailsPage

