import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Card from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'
import { api } from '../services/api'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'volunteer',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Client-side validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Будь ласка, заповніть всі обов\'язкові поля')
      return
    }

    if (!formData.email.includes('@')) {
      setError('Будь ласка, введіть коректний email')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Паролі не співпадають')
      return
    }

    if (formData.password.length < 6) {
      setError('Пароль повинен містити мінімум 6 символів')
      return
    }

    setLoading(true)

    try {
      await api.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      })
      navigate('/login')
    } catch (error) {
      setError(error.message || 'Помилка реєстрації')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Card>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
          Реєстрація
        </h1>
        <form onSubmit={handleSubmit}>
          <Input
            label="Ім'я"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Введіть ваше ім'я"
            required
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
          />
          <Input
            label="Пароль"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Мінімум 6 символів"
            required
          />
          <Input
            label="Підтвердження пароля"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Повторіть пароль"
            required
          />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Роль
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="volunteer">Волонтер</option>
              <option value="donor">Донор</option>
            </select>
          </div>
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-md">
              {error}
            </div>
          )}
          <Button type="submit" disabled={loading} className="w-full mb-4">
            {loading ? 'Реєстрація...' : 'Зареєструватися'}
          </Button>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Вже є акаунт?{' '}
            <Link to="/login" className="text-primary-600 dark:text-primary-400 hover:underline">
              Увійти
            </Link>
          </p>
        </form>
      </Card>
    </div>
  )
}

export default Register

