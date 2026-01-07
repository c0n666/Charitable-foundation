import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import authRoutes from './routes/auth.js'
import campaignRoutes from './routes/campaigns.js'
import donationRoutes from './routes/donations.js'
import donorRoutes from './routes/donors.js'
import reportRoutes from './routes/reports.js'
import achievementRoutes from './routes/achievements.js'
import successStoryRoutes from './routes/successStories.js'
import subscriptionRoutes from './routes/subscriptions.js'
import articleRoutes from './routes/articles.js'
import { initDatabase } from './database/index.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000
const isProduction = process.env.NODE_ENV === 'production'

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Initialize database (async)
let dbInitialized = false
initDatabase()
  .then(() => {
    dbInitialized = true
    console.log('Database initialization complete')
  })
  .catch((error) => {
    console.error('Database initialization failed:', error)
  })

// API Routes (must be before static files in production)
app.use('/api/auth', authRoutes)
app.use('/api/campaigns', campaignRoutes)
app.use('/api', donationRoutes)
app.use('/api/donors', donorRoutes)
app.use('/api/reports', reportRoutes)
app.use('/api/achievements', achievementRoutes)
app.use('/api/success-stories', successStoryRoutes)
app.use('/api/subscriptions', subscriptionRoutes)
app.use('/api/articles', articleRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' })
})

// Serve static files from React app in production
if (isProduction) {
  const frontendBuildPath = path.join(__dirname, '../frontend/dist')
  
  // Check if frontend is built
  if (fs.existsSync(frontendBuildPath)) {
    app.use(express.static(frontendBuildPath))
    
    // All other routes should serve the React app
    app.get('*', (req, res) => {
      res.sendFile(path.join(frontendBuildPath, 'index.html'))
    })
  } else {
    // Frontend not built - show instructions
    app.get('*', (req, res) => {
      res.send(`
        <!DOCTYPE html>
        <html lang="uk">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Благодійний фонд - Інструкції</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              max-width: 800px;
              margin: 50px auto;
              padding: 20px;
              background: #f5f5f5;
            }
            .container {
              background: white;
              padding: 30px;
              border-radius: 10px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            h1 { color: #2563eb; }
            code {
              background: #f4f4f4;
              padding: 2px 6px;
              border-radius: 3px;
              font-family: monospace;
            }
            .command {
              background: #1f2937;
              color: #10b981;
              padding: 15px;
              border-radius: 5px;
              margin: 10px 0;
              font-family: monospace;
            }
            .link {
              color: #2563eb;
              text-decoration: none;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🚀 Благодійний фонд - Backend API</h1>
            <p><strong>Frontend не зібрано.</strong> Щоб побачити повноцінний сайт, виконайте одну з команд:</p>
            
            <h2>Варіант 1: Режим розробки (рекомендовано)</h2>
            <div class="command">npm run dev</div>
            <p>Потім відкрийте: <a href="http://localhost:3000" class="link">http://localhost:3000</a></p>
            
            <h2>Варіант 2: Production режим</h2>
            <div class="command">npm run build:start</div>
            <p>Потім відкрийте: <a href="http://localhost:5000" class="link">http://localhost:5000</a></p>
            
            <hr>
            <h3>API Endpoints:</h3>
            <ul>
              <li><code>/api/health</code> - Статус API</li>
              <li><code>/api/campaigns</code> - Кампанії</li>
              <li><code>/api/auth</code> - Авторизація</li>
              <li><code>/api/donate</code> - Донати</li>
            </ul>
          </div>
        </body>
        </html>
      `)
    })
  }
} else {
  // Development: Show HTML page with instructions
  app.get('/', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html lang="uk">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Благодійний фонд - Backend API</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background: #f5f5f5;
          }
          .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          h1 { color: #2563eb; }
          code {
            background: #f4f4f4;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: monospace;
          }
          .command {
            background: #1f2937;
            color: #10b981;
            padding: 15px;
            border-radius: 5px;
            margin: 10px 0;
            font-family: monospace;
          }
          .link {
            color: #2563eb;
            text-decoration: none;
            font-weight: bold;
            font-size: 18px;
          }
          .warning {
            background: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 15px;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🚀 Благодійний фонд - Backend API</h1>
          <div class="warning">
            <strong>⚠️ Ви зараз на Backend API сервері (порт 5000)</strong><br>
            Щоб побачити повноцінний сайт, потрібно запустити frontend!
          </div>
          
          <h2>📋 Швидкий старт:</h2>
          <p><strong>1. Запустіть обидва сервери:</strong></p>
          <div class="command">npm run dev</div>
          
          <p><strong>2. Відкрийте frontend в браузері:</strong></p>
          <p><a href="http://localhost:3000" class="link" target="_blank">👉 http://localhost:3000 👈</a></p>
          
          <hr>
          <h3>🔌 API Endpoints:</h3>
          <ul>
            <li><a href="/api/health"><code>/api/health</code></a> - Статус API</li>
            <li><a href="/api/campaigns"><code>/api/campaigns</code></a> - Список кампаній</li>
            <li><code>/api/auth/login</code> - Вхід</li>
            <li><code>/api/auth/register</code> - Реєстрація</li>
            <li><code>/api/donate</code> - Створити донат</li>
            <li><code>/api/donations/stats</code> - Статистика</li>
          </ul>
        </div>
      </body>
      </html>
    `)
  })
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

