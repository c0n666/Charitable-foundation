import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Card from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'
import { api } from '../services/api'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    if (!formData.email || !formData.password) {
      setError('Будь ласка, заповніть всі обов\'язкові поля')
      return
    }

    if (!formData.email.includes('@')) {
      setError('Будь ласка, введіть коректний email')
      return
    }

    setLoading(true)

    try {
      const response = await api.login(formData.email, formData.password)
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      
      if (response.user.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/')
      }
    } catch (error) {
      let message = 'Помилка входу. Спробуйте ще раз.'

      if (error.response) {
        if (error.response.status === 401) {
          message = 'Невірний email або пароль. Перевірте дані та спробуйте ще раз.'
        } else if (error.response.data?.error) {
          message = error.response.data.error
        }
      } else if (error.request) {
        message = 'Сервер недоступний. Переконайтесь, що backend запущений (npm run dev у папці backend).'
      } else if (error.message) {
        message = error.message
      }

      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Card>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
          Вхід
        </h1>
        <form onSubmit={handleSubmit}>
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
            placeholder="Введіть пароль"
            required
          />
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-md">
              {error}
            </div>
          )}
          <Button type="submit" disabled={loading} className="w-full mb-4">
            {loading ? 'Вхід...' : 'Увійти'}
          </Button>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Немає акаунту?{' '}
            <Link to="/register" className="text-primary-600 dark:text-primary-400 hover:underline">
              Зареєструватися
            </Link>
          </p>
        </form>
      </Card>
    </div>
  )
}

export default Login

