import { Link } from 'react-router-dom'
import Card from './Card'
import Button from './Button'

const CampaignItem = ({ campaign }) => {
  const currentAmount = typeof campaign.currentAmount === 'number' ? campaign.currentAmount : parseFloat(campaign.currentAmount) || 0
  const targetAmount = typeof campaign.targetAmount === 'number' ? campaign.targetAmount : parseFloat(campaign.targetAmount) || 1
  const progress = (currentAmount / targetAmount) * 100
  const progressPercentage = Math.min(progress, 100)

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="flex flex-col h-full">
        {campaign.image && (
          <img
            src={campaign.image}
            alt={campaign.title}
            className="w-full h-48 object-cover rounded-t-lg mb-4"
          />
        )}
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          {campaign.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow line-clamp-3">
          {campaign.description}
        </p>
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-400">Зібрано:</span>
            <span className="font-semibold text-primary-600 dark:text-primary-400">
              {currentAmount.toLocaleString('uk-UA')} ₴ / {targetAmount.toLocaleString('uk-UA')} ₴
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-primary-500 h-2 rounded-full transition-all"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
        <Link to={`/campaigns/${campaign.id}`}>
          <Button className="w-full">Детальніше</Button>
        </Link>
      </div>
    </Card>
  )
}

export default CampaignItem

