import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import CampaignsPage from './pages/CampaignsPage'
import CampaignDetailsPage from './pages/CampaignDetailsPage'
import DonatePage from './pages/DonatePage'
import AboutPage from './pages/AboutPage'
import AdminPanel from './pages/AdminPanel'
import Login from './pages/Login'
import Register from './pages/Register'
import DonorDashboard from './pages/DonorDashboard'
import SuccessStoriesPage from './pages/SuccessStoriesPage'
import SuccessStoryDetailsPage from './pages/SuccessStoryDetailsPage'
import DonorRegistryPage from './pages/DonorRegistryPage'
import FAQPage from './pages/FAQPage'
import PaymentPage from './pages/PaymentPage'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/campaigns" element={<CampaignsPage />} />
            <Route path="/campaigns/:id" element={<CampaignDetailsPage />} />
            <Route path="/donate/:campaignId" element={<DonatePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<DonorDashboard />} />
            <Route path="/success-stories" element={<SuccessStoriesPage />} />
            <Route path="/success-stories/:id" element={<SuccessStoryDetailsPage />} />
            <Route path="/donors" element={<DonorRegistryPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App

