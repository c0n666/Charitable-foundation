import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'
import { api } from '../services/api'

const SuccessStoryDetailsPage = () => {
  const { id } = useParams()
  const [story, setStory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadStory = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await api.getSuccessStory(id)
        setStory(data)
      } catch (err) {
        console.error('Error loading success story:', err)
        setError('Не вдалося завантажити історію успіху. Спробуйте пізніше.')
      } finally {
        setLoading(false)
      }
    }

    loadStory()
  }, [id])

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-gray-600 dark:text-gray-400">Завантаження...</div>
      </div>
    )
  }

  if (error || !story) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <div className="py-8 text-center text-gray-600 dark:text-gray-400">
            <p className="mb-4">{error || 'Історію не знайдено.'}</p>
            <Link to="/success-stories">
              <Button>Повернутися до всіх історій</Button>
            </Link>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-4">
        <Link to="/success-stories" className="text-primary-600 dark:text-primary-400 hover:underline text-sm">
          ← Повернутися до всіх історій
        </Link>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        {story.title}
      </h1>

      {story.photos && story.photos.length > 0 && (
        <div className="mb-6">
          <img
            src={story.photos[0]}
            alt={story.title}
            className="w-full max-h-[420px] object-cover rounded-lg shadow"
          />
        </div>
      )}

      <Card className="mb-6">
        <div className="prose max-w-none prose-lg dark:prose-invert">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {story.description}
          </p>
        </div>
      </Card>

      {(story.beneficiary || story.campaignTitle) && (
        <Card>
          <div className="space-y-2 text-gray-700 dark:text-gray-300">
            {story.beneficiary && (
              <p>
                <strong>Отримав допомогу:</strong> {story.beneficiary}
              </p>
            )}
            {story.campaignTitle && (
              <p>
                <strong>Кампанія:</strong>{' '}
                <span className="text-primary-600 dark:text-primary-400">{story.campaignTitle}</span>
              </p>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}

export default SuccessStoryDetailsPage


