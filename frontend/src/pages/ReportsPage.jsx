import { useState, useEffect } from 'react'
import Card from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'
import { api } from '../services/api'

const ReportsPage = () => {
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(false)
  const [campaigns, setCampaigns] = useState([])
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    campaignId: '',
  })

  const loadReport = async () => {
    try {
      setLoading(true)
      const data = await api.getFinancialReport(filters)
      setReport(data)
    } catch (error) {
      console.error('Error loading report:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const init = async () => {
      try {
        const campaignsData = await api.getCampaigns()
        setCampaigns(campaignsData)
      } catch (error) {
        console.error('Error loading campaigns for reports:', error)
      }
      loadReport()
    }

    init()
  }, [])

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    })
  }

  const handleApplyFilters = () => {
    loadReport()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-8">
        Фінансова звітність
      </h1>

      {/* Filters */}
      <Card className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Фільтри</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            type="date"
            label="Дата початку"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
          />
          <Input
            type="date"
            label="Дата кінця"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
          />
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Кампанія
            </label>
            <select
              name="campaignId"
              value={filters.campaignId}
              onChange={handleFilterChange}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Всі кампанії</option>
              {campaigns.map((campaign) => (
                <option key={campaign.id} value={campaign.id}>
                  {campaign.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <Button onClick={handleApplyFilters} className="w-full">
              Застосувати фільтри
            </Button>
          </div>
        </div>
      </Card>

      {loading ? (
        <div className="text-center py-12">Завантаження...</div>
      ) : report ? (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {report.totals?.donations?.toLocaleString('uk-UA') || 0} ₴
              </div>
              <div className="text-gray-600 dark:text-gray-400">Всього зібрано</div>
            </Card>

            <Card className="text-center">
              <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
                {report.totals?.expenses?.toLocaleString('uk-UA') || 0} ₴
              </div>
              <div className="text-gray-600 dark:text-gray-400">Всього витрачено</div>
            </Card>

            <Card className="text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {report.totals?.net?.toLocaleString('uk-UA') || 0} ₴
              </div>
              <div className="text-gray-600 dark:text-gray-400">Чистий залишок</div>
            </Card>
          </div>

          {/* Admin Expenses */}
          <Card className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Адміністративні витрати
            </h2>
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              {report.adminPercentage || 0}%
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Від загальної суми зібраних коштів
            </p>
          </Card>

          {/* Expenses by Category */}
          {report.expensesByCategory && Object.keys(report.expensesByCategory).length > 0 && (
            <Card className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                Витрати по категоріях
              </h2>
              <div className="space-y-3">
                {Object.entries(report.expensesByCategory).map(([category, amount]) => (
                  <div key={category} className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">{category}</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      {amount.toLocaleString('uk-UA')} ₴
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Expenses List */}
          {report.expenses && report.expenses.length > 0 && (
            <Card>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                Детальний список витрат
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">
                        Категорія
                      </th>
                      <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">
                        Опис
                      </th>
                      <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">
                        Сума
                      </th>
                      <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">
                        Дата
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.expenses.map((expense) => (
                      <tr
                        key={expense.id}
                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                          {expense.category || 'Інше'}
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                          {expense.description || '-'}
                        </td>
                        <td className="py-3 px-4 font-semibold text-gray-800 dark:text-gray-200">
                          {expense.amount?.toLocaleString('uk-UA')} ₴
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                          {new Date(expense.date).toLocaleDateString('uk-UA')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </>
      ) : (
        <Card>
          <div className="text-center py-8 text-gray-600 dark:text-gray-400">
            Немає даних для відображення
          </div>
        </Card>
      )}
    </div>
  )
}

export default ReportsPage

