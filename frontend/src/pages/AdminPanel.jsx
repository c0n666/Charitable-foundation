import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'
import Input from '../components/Input'
import Modal from '../components/Modal'
import { api } from '../services/api'

const AdminPanel = () => {
  const navigate = useNavigate()
  const [campaigns, setCampaigns] = useState([])
  const [donations, setDonations] = useState([])
  const [stats, setStats] = useState({})
  const [showCampaignModal, setShowCampaignModal] = useState(false)
  const [editingCampaign, setEditingCampaign] = useState(null)
  const [campaignForm, setCampaignForm] = useState({
    title: '',
    description: '',
    targetAmount: '',
    image: '',
    deadline: '',
  })

  useEffect(() => {
    checkAuth()
    loadData()
  }, [])

  const checkAuth = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user.role !== 'admin') {
      navigate('/login')
    }
  }

  const loadData = async () => {
    try {
      const [campaignsData, donationsData, statsData] = await Promise.all([
        api.getCampaigns(),
        api.getDonations(),
        api.getStats(),
      ])
      setCampaigns(campaignsData)
      setDonations(donationsData)
      setStats(statsData)
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  const handleCampaignSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingCampaign) {
        await api.updateCampaign(editingCampaign.id, campaignForm)
      } else {
        await api.createCampaign(campaignForm)
      }
      setShowCampaignModal(false)
      setEditingCampaign(null)
      setCampaignForm({
        title: '',
        description: '',
        targetAmount: '',
        image: '',
        deadline: '',
      })
      loadData()
    } catch (error) {
      console.error('Error saving campaign:', error)
    }
  }

  const handleEdit = (campaign) => {
    setEditingCampaign(campaign)
    setCampaignForm({
      title: campaign.title,
      description: campaign.description,
      targetAmount: campaign.targetAmount,
      image: campaign.image || '',
      deadline: campaign.deadline || '',
    })
    setShowCampaignModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Ви впевнені, що хочете видалити цю кампанію?')) {
      try {
        await api.deleteCampaign(id)
        loadData()
      } catch (error) {
        console.error('Error deleting campaign:', error)
      }
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">Адмін панель</h1>
        <Button onClick={() => setShowCampaignModal(true)}>Створити кампанію</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2">
            {stats.totalDonations?.toLocaleString() || 0} ₴
          </div>
          <div className="text-gray-600 dark:text-gray-400">Всього зібрано</div>
        </Card>
        <Card>
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2">
            {campaigns.length}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Кампаній</div>
        </Card>
        <Card>
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2">
            {donations.length}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Пожертв</div>
        </Card>
      </div>

      {/* Campaigns */}
      <Card className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Кампанії</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="text-left p-2">Назва</th>
                <th className="text-left p-2">Ціль</th>
                <th className="text-left p-2">Зібрано</th>
                <th className="text-left p-2">Дії</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="border-b dark:border-gray-700">
                  <td className="p-2">{campaign.title}</td>
                  <td className="p-2">{campaign.targetAmount.toLocaleString()} ₴</td>
                  <td className="p-2">{campaign.currentAmount.toLocaleString()} ₴</td>
                  <td className="p-2">
                    <Button
                      variant="secondary"
                      onClick={() => handleEdit(campaign)}
                      className="mr-2"
                    >
                      Редагувати
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(campaign.id)}>
                      Видалити
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Donations */}
      <Card>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Останні пожертви</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="text-left p-2">Донор</th>
                <th className="text-left p-2">Сума</th>
                <th className="text-left p-2">Кампанія</th>
                <th className="text-left p-2">Дата</th>
              </tr>
            </thead>
            <tbody>
              {donations.slice(0, 10).map((donation) => (
                <tr key={donation.id} className="border-b dark:border-gray-700">
                  <td className="p-2">{donation.donorName}</td>
                  <td className="p-2">{donation.amount.toLocaleString()} ₴</td>
                  <td className="p-2">{donation.campaignTitle}</td>
                  <td className="p-2">
                    {new Date(donation.createdAt).toLocaleDateString('uk-UA')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Campaign Modal */}
      <Modal
        isOpen={showCampaignModal}
        onClose={() => {
          setShowCampaignModal(false)
          setEditingCampaign(null)
          setCampaignForm({
            title: '',
            description: '',
            targetAmount: '',
            image: '',
            deadline: '',
          })
        }}
        title={editingCampaign ? 'Редагувати кампанію' : 'Створити кампанію'}
      >
        <form onSubmit={handleCampaignSubmit}>
          <Input
            label="Назва"
            name="title"
            type="text"
            value={campaignForm.title}
            onChange={(e) => setCampaignForm({ ...campaignForm, title: e.target.value })}
            required
          />
          <div className="mb-4">
            <label 
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Опис <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={campaignForm.description}
              onChange={(e) => setCampaignForm({ ...campaignForm, description: e.target.value })}
              rows="4"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <Input
            label="Цільова сума (₴)"
            type="number"
            name="targetAmount"
            value={campaignForm.targetAmount}
            onChange={(e) => setCampaignForm({ ...campaignForm, targetAmount: e.target.value })}
            required
            min="1"
            step="0.01"
          />
          <Input
            label="URL зображення"
            type="url"
            name="image"
            value={campaignForm.image}
            onChange={(e) => setCampaignForm({ ...campaignForm, image: e.target.value })}
            placeholder="https://example.com/image.jpg"
          />
          <Input
            label="Термін (дата)"
            type="date"
            name="deadline"
            value={campaignForm.deadline}
            onChange={(e) => setCampaignForm({ ...campaignForm, deadline: e.target.value })}
          />
          <div className="flex space-x-4 mt-6">
            <Button type="submit" className="flex-1">
              {editingCampaign ? 'Зберегти' : 'Створити'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setShowCampaignModal(false)
                setEditingCampaign(null)
              }}
            >
              Скасувати
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AdminPanel

