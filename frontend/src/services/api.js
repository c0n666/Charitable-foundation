import axios from 'axios'

// Determine API URL based on environment
const getApiUrl = () => {
  // If environment variable is set, use it (highest priority)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }
  
  // In development mode (npm run dev), use localhost
  if (import.meta.env.DEV || import.meta.env.MODE === 'development') {
    return 'http://localhost:5000/api'
  }
  
  // In production on Render (same domain), use relative path
  return '/api'
}

const API_URL = getApiUrl()

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const api = {
  // Auth
  async register(userData) {
    const response = await apiClient.post('/auth/register', userData)
    return response.data
  },

  async login(email, password) {
    const response = await apiClient.post('/auth/login', { email, password })
    return response.data
  },

  // Campaigns
  async getCampaigns(params = {}) {
    const response = await apiClient.get('/campaigns', { params })
    return response.data
  },

  async getCampaign(id) {
    const response = await apiClient.get(`/campaigns/${id}`)
    return response.data
  },

  async createCampaign(campaignData) {
    const response = await apiClient.post('/campaigns', campaignData)
    return response.data
  },

  async updateCampaign(id, campaignData) {
    const response = await apiClient.put(`/campaigns/${id}`, campaignData)
    return response.data
  },

  async deleteCampaign(id) {
    const response = await apiClient.delete(`/campaigns/${id}`)
    return response.data
  },

  // Donations
  async createDonation(donationData) {
    const response = await apiClient.post('/donate', donationData)
    return response.data
  },

  async getDonations() {
    const response = await apiClient.get('/donations')
    return response.data
  },

  // Stats
  async getStats() {
    const response = await apiClient.get('/donations/stats')
    return response.data
  },

  // Donors
  async getDonorStats() {
    const response = await apiClient.get('/donors/me/stats')
    return response.data
  },

  async getMyDonations() {
    const response = await apiClient.get('/donors/me/donations')
    return response.data
  },

  async getPublicDonors(params = {}) {
    const response = await apiClient.get('/donors/public', { params })
    return response.data
  },

  // Reports
  async getFinancialReport(params = {}) {
    const response = await apiClient.get('/reports/financial', { params })
    return response.data
  },

  // Achievements
  async getMyAchievements() {
    const response = await apiClient.get('/achievements/me')
    return response.data
  },

  async checkAchievements() {
    const response = await apiClient.post('/achievements/check')
    return response.data
  },

  // Success Stories
  async getSuccessStories(params = {}) {
    const response = await apiClient.get('/success-stories', { params })
    return response.data
  },

  async getSuccessStory(id) {
    const response = await apiClient.get(`/success-stories/${id}`)
    return response.data
  },

  // Subscriptions
  async createSubscription(subscriptionData) {
    const response = await apiClient.post('/subscriptions', subscriptionData)
    return response.data
  },

  async getMySubscriptions() {
    const response = await apiClient.get('/subscriptions/me')
    return response.data
  },

  async cancelSubscription(id) {
    const response = await apiClient.post(`/subscriptions/${id}/cancel`)
    return response.data
  },

  // Articles/Blog
  async getArticles(params = {}) {
    const response = await apiClient.get('/articles', { params })
    return response.data
  },

  async getArticle(id) {
    const response = await apiClient.get(`/articles/${id}`)
    return response.data
  },
}