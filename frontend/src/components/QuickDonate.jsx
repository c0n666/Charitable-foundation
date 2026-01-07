import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from './Modal'
import Button from './Button'
import Input from './Input'

const QuickDonate = ({ campaignId, campaignTitle }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const quickAmounts = [50, 100, 200, 500, 1000]

  const handleQuickAmount = (value) => {
    setAmount(value.toString())
  }

  const handleDonate = () => {
    if (!amount || parseFloat(amount) <= 0) return
    navigate(`/donate/${campaignId}?amount=${amount}`)
    setIsOpen(false)
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="w-full">
        Швидкий донат
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Швидкий донат">
        <div className="space-y-4">
          {campaignTitle && (
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Кампанія: <strong>{campaignTitle}</strong>
            </p>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Швидкий вибір суми
            </label>
            <div className="grid grid-cols-5 gap-2 mb-4">
              {quickAmounts.map((value) => (
                <button
                  key={value}
                  onClick={() => handleQuickAmount(value)}
                  className={`px-4 py-2 rounded-md border ${
                    amount === value.toString()
                      ? 'bg-primary-500 text-white border-primary-500'
                      : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                  } hover:bg-primary-50 dark:hover:bg-gray-600 transition-colors`}
                >
                  {value}₴
                </button>
              ))}
            </div>
          </div>

          <Input
            label="Або введіть суму"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Сума в гривнях"
            min="1"
            step="0.01"
          />

          <div className="flex space-x-4">
            <Button onClick={handleDonate} disabled={!amount || parseFloat(amount) <= 0} className="flex-1">
              Пожертвувати
            </Button>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Скасувати
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default QuickDonate

