import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Card from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'
import { api } from '../services/api'

const PaymentPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const mode = searchParams.get('mode') || 'single'
  const campaignId = searchParams.get('campaignId') || ''
  const donorName = searchParams.get('donorName') || ''
  const email = searchParams.get('email') || ''
  const message = searchParams.get('message') || ''
  const anonymous = searchParams.get('anonymous') === 'true'
  const initialAmount = searchParams.get('amount') || ''
  const frequency = searchParams.get('frequency') || 'monthly'
  const startDate = searchParams.get('startDate') || ''

  const [formData, setFormData] = useState({
    amount: initialAmount,
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    // Просте форматування номера картки та дати
    if (name === 'cardNumber') {
      const digits = value.replace(/\D/g, '').slice(0, 16)
      const parts = digits.match(/.{1,4}/g) || []
      setFormData((prev) => ({ ...prev, cardNumber: parts.join(' ') }))
      return
    }

    if (name === 'expiry') {
      const digits = value.replace(/\D/g, '').slice(0, 4)
      let formatted = digits
      if (digits.length > 2) {
        formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`
      }
      setFormData((prev) => ({ ...prev, expiry: formatted }))
      return
    }

    if (name === 'cvv') {
      const digits = value.replace(/\D/g, '').slice(0, 3)
      setFormData((prev) => ({ ...prev, cvv: digits }))
      return
    }

    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Мінімальна валідація (БЕЗ реальної оплати)
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError('Введіть коректну суму оплати')
      return
    }

    if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
      setError('Введіть коректний номер картки (16 цифр)')
      return
    }

    if (!formData.cardHolder.trim()) {
      setError('Введіть ім\'я власника картки')
      return
    }

    if (formData.expiry.length !== 5) {
      setError('Введіть коректний термін дії (MM/YY)')
      return
    }

    if (formData.cvv.length !== 3) {
      setError('Введіть коректний CVV (3 цифри)')
      return
    }

    setLoading(true)

    try {
      const amountNumber = parseFloat(formData.amount)

      if (mode === 'subscription') {
        await api.createSubscription({
          campaignId,
          amount: amountNumber,
          frequency,
          startDate,
        })
      } else {
        await api.createDonation({
          campaignId,
          amount: amountNumber,
          donorName: anonymous ? 'Анонімний донор' : donorName,
          email,
          message,
        })

        try {
          await api.checkAchievements()
        } catch (err) {
          console.error('Error checking achievements after payment:', err)
        }
      }

      setSuccess(true)

      setTimeout(() => {
        if (campaignId) {
          navigate(`/campaigns/${campaignId}`)
        } else {
          navigate('/')
        }
      }, 1500)
    } catch (err) {
      console.error('Error creating donation from payment page:', err)
      setError(err.message || 'Сталася помилка під час обробки платежу')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Card className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Оплату успішно виконано
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Дякуємо за вашу пожертву. Ви скоро будете перенаправлені назад до кампанії.
          </p>
          <Button onClick={() => (campaignId ? navigate(`/campaigns/${campaignId}`) : navigate('/'))}>
            Повернутися до кампанії
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Оплата карткою
      </h1>

      <Card>
        <form onSubmit={handleSubmit}>
          <Input
            label="Сума оплати (₴)"
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
            label="Номер картки"
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="0000 0000 0000 0000"
            required
          />

          <Input
            label="Ім'я та прізвище власника"
            type="text"
            name="cardHolder"
            value={formData.cardHolder}
            onChange={handleChange}
            placeholder="Як вказано на картці"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Термін дії"
              type="text"
              name="expiry"
              value={formData.expiry}
              onChange={handleChange}
              placeholder="MM/YY"
              required
            />
            <Input
              label="CVV"
              type="password"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="***"
              required
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-md">
              {error}
            </div>
          )}

          <div className="flex space-x-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Обробка...' : 'Сплатити'}
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
      </Card>
    </div>
  )
}

export default PaymentPage


