import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { HiLockClosed } from 'react-icons/hi'
import Card from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'
import QuickDonate from '../components/QuickDonate'
import SocialShare from '../components/SocialShare'
import { api } from '../services/api'

const DonatePage = () => {
  const { campaignId } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [campaign, setCampaign] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({
    amount: searchParams.get('amount') || '',
    donorName: '',
    email: '',
    message: '',
    anonymous: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    checkAuth()
    if (campaignId) {
      loadCampaign()
    }
  }, [campaignId])

  const checkAuth = () => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    setIsAuthenticated(!!token)
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      // Автоматично заповнити дані з профілю
      setFormData(prev => ({
        ...prev,
        donorName: parsedUser.name || '',
        email: parsedUser.email || '',
      }))
    }
  }

  const loadCampaign = async () => {
    try {
      const data = await api.getCampaign(campaignId)
      setCampaign(data)
    } catch (error) {
      console.error('Error loading campaign:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    // Client-side validation
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError('Введіть коректну суму пожертви')
      return
    }

    if (!formData.anonymous && !formData.donorName) {
      setError('Введіть ваше ім\'я або оберіть анонімну пожертву')
      return
    }

    if (!formData.email || !formData.email.includes('@')) {
      setError('Введіть коректний email')
      return
    }

    setLoading(true)

    try {
      const amount = parseFloat(formData.amount)

      const params = new URLSearchParams({
        campaignId,
        amount: String(amount),
        donorName: formData.donorName,
        email: formData.email,
        message: formData.message,
        anonymous: String(formData.anonymous),
      })

      navigate(`/payment?${params.toString()}`)
    } finally {
      setLoading(false)
    }
  }

  // Перевірка авторизації
  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="text-center">
          <div className="flex justify-center mb-4">
            <HiLockClosed className="w-16 h-16 text-primary-600 dark:text-primary-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Авторизація необхідна
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Для здійснення пожертви необхідно увійти в систему або зареєструватися.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/login">
              <Button>Увійти</Button>
            </Link>
            <Link to="/register">
              <Button variant="secondary">Зареєструватися</Button>
            </Link>
          </div>
        </Card>
      </div>
    )
  }

  // Calculate progress percentage
  const progressPercentage = campaign 
    ? Math.min(
        ((typeof campaign.currentAmount === 'number' ? campaign.currentAmount : 0) / 
         (typeof campaign.targetAmount === 'number' && campaign.targetAmount > 0 ? campaign.targetAmount : 1)) * 100,
        100
      )
    : 0

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8">Пожертвувати</h1>

      {campaign && (
        <>
          <Card className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              {campaign.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Зібрано: <strong>{typeof campaign.currentAmount === 'number' ? campaign.currentAmount.toLocaleString() : '0'} ₴</strong> з {typeof campaign.targetAmount === 'number' ? campaign.targetAmount.toLocaleString() : '0'} ₴
            </p>
            <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-primary-500 h-2 rounded-full transition-all"
                style={{ 
                  width: `${progressPercentage}%` 
                }}
              />
            </div>
          </Card>
          <div className="mb-6">
            <QuickDonate campaignId={campaignId} campaignTitle={campaign.title} />
          </div>
        </>
      )}

      <Card>
        <form onSubmit={handleSubmit}>
          <Input
            label="Сума пожертви (₴)"
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Введіть суму"
            required
            min="1"
            step="0.01"
          />

          <Input
            label="Ваше ім'я"
            type="text"
            name="donorName"
            value={formData.donorName}
            onChange={handleChange}
            placeholder="Введіть ваше ім'я"
            required={!formData.anonymous}
            disabled={formData.anonymous}
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
            disabled={!!user?.email}
          />
          {user?.email && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Використовується email з вашого профілю
            </p>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Повідомлення (необов'язково)
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Ваше повідомлення..."
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="anonymous"
                checked={formData.anonymous}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Пожертвувати анонімно
              </span>
            </label>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-md">
              {error}
            </div>
          )}

          <div className="flex space-x-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Перехід до оплати...' : 'Перейти до оплати'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate(-1)}
            >
              Скасувати
            </Button>
          </div>
        </form>
        
        {campaign && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <SocialShare
              url={`${window.location.origin}/campaigns/${campaignId}`}
              title={campaign.title}
              description={`Підтримайте кампанію: ${campaign.title}`}
            />
          </div>
        )}
      </Card>
    </div>
  )
}

export default DonatePage

