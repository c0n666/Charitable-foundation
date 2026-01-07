import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiCheckCircle } from 'react-icons/hi'
import Card from './Card'
import Input from './Input'
import Button from './Button'
import { api } from '../services/api'

const RecurringDonationForm = ({ campaignId, campaignTitle }) => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    amount: '',
    frequency: 'monthly',
    startDate: new Date().toISOString().split('T')[0],
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError('Введіть коректну суму')
      return
    }

    setLoading(true)

    try {
      const params = new URLSearchParams({
        mode: 'subscription',
        campaignId,
        amount: String(parseFloat(formData.amount)),
        frequency: formData.frequency,
        startDate: formData.startDate,
      })

      navigate(`/payment?${params.toString()}`)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Card className="text-center">
        <div className="flex justify-center mb-4">
          <HiCheckCircle className="w-16 h-16 text-green-500 dark:text-green-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          Підписка створена!
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Ви будете отримувати нагадування про регулярні донати.
        </p>
      </Card>
    )
  }

  return (
    <Card>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        Регулярний донат
      </h3>
      {campaignTitle && (
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Кампанія: <strong>{campaignTitle}</strong>
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Періодичність
          </label>
          <select
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="monthly">Щомісяця</option>
            <option value="quarterly">Щокварталу</option>
            <option value="yearly">Щороку</option>
          </select>
        </div>

        <Input
          label="Дата першого донату"
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />

        {error && (
          <div className="p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-md">
            {error}
          </div>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Створення...' : 'Створити підписку'}
        </Button>
      </form>
    </Card>
  )
}

export default RecurringDonationForm

