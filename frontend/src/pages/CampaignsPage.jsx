import { useState, useEffect } from 'react'
import CampaignItem from '../components/CampaignItem'
import Input from '../components/Input'
import Button from '../components/Button'
import { api } from '../services/api'

const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([])
  const [filteredCampaigns, setFilteredCampaigns] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const itemsPerPage = 6

  useEffect(() => {
    loadCampaigns()
  }, [])

  useEffect(() => {
    filterCampaigns()
  }, [searchTerm, campaigns])

  const loadCampaigns = async () => {
    try {
      setLoading(true)
      const data = await api.getCampaigns()
      setCampaigns(data)
      setFilteredCampaigns(data)
    } catch (error) {
      console.error('Error loading campaigns:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterCampaigns = () => {
    if (!searchTerm) {
      setFilteredCampaigns(campaigns)
      return
    }
    const filtered = campaigns.filter(
      (campaign) =>
        campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredCampaigns(filtered)
    setCurrentPage(1)
  }

  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCampaigns = filteredCampaigns.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-8">Кампанії</h1>

      {/* Search */}
      <div className="mb-8">
        <Input
          type="text"
          placeholder="Пошук кампаній..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* Campaigns Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="text-gray-600 dark:text-gray-400">Завантаження...</div>
        </div>
      ) : paginatedCampaigns.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-600 dark:text-gray-400">Кампанії не знайдено</div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginatedCampaigns.map((campaign) => (
              <CampaignItem key={campaign.id} campaign={campaign} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              <Button
                variant="secondary"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Попередня
              </Button>
              <span className="text-gray-700 dark:text-gray-300">
                Сторінка {currentPage} з {totalPages}
              </span>
              <Button
                variant="secondary"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Наступна
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default CampaignsPage

