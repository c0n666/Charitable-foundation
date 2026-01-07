import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import { api } from '../services/api'

const SuccessStoriesPage = () => {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStories()
  }, [])

  const loadStories = async () => {
    try {
      setLoading(true)
      const data = await api.getSuccessStories()
      setStories(data)
    } catch (error) {
      console.error('Error loading stories:', error)
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-8">
        Історії успіху
      </h1>

      {stories.length === 0 ? (
        <Card>
          <div className="text-center py-12 text-gray-600 dark:text-gray-400">
            Поки що немає опублікованих історій успіху
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <Card key={story.id} className="hover:shadow-lg transition-shadow">
              {story.photos && story.photos.length > 0 && (
                <img
                  src={story.photos[0]}
                  alt={story.title}
                  className="w-full h-48 object-cover rounded-t-lg mb-4"
                />
              )}
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                {story.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {story.description}
              </p>
              {story.beneficiary && (
                <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                  <strong>Отримав допомогу:</strong> {story.beneficiary}
                </p>
              )}
              <Link to={`/success-stories/${story.id}`}>
                <button className="text-primary-600 dark:text-primary-400 hover:underline">
                  Читати далі →
                </button>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default SuccessStoriesPage

