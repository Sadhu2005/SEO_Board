import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Analytics API
export const getOverview = async () => {
  const response = await api.get('/analytics/overview')
  return response.data.data
}

export const getTimeseries = async (days = 7, metric = 'traffic') => {
  const response = await api.get(`/analytics/timeseries?days=${days}&metric=${metric}`)
  return response.data
}

export const getSocialMetrics = async () => {
  const response = await api.get('/analytics/social-metrics')
  return response.data.data
}

export const getSEOHealth = async () => {
  const response = await api.get('/analytics/seo-health')
  return response.data.data
}

// AI API
export const getInsights = async () => {
  const response = await api.get('/ai/insights')
  return response.data
}

export const getPredictions = async (metricType, timeHorizon = 7) => {
  const response = await api.post('/ai/predict', {
    metric_type: metricType,
    time_horizon: timeHorizon,
  })
  return response.data
}

export const getRecommendations = async (category = 'all') => {
  const response = await api.get(`/ai/recommendations?category=${category}`)
  return response.data
}

export const getBestTimeToPost = async (platform = 'all') => {
  const response = await api.get(`/ai/best-time-to-post?platform=${platform}`)
  return response.data
}

// Automation API
export const getTriggers = async () => {
  const response = await api.get('/automation/triggers')
  return response.data
}

export const executeAction = async (actionType, params) => {
  const response = await api.post('/automation/execute', {
    action_type: actionType,
    params,
  })
  return response.data
}

export const getAutomationLogs = async () => {
  const response = await api.get('/automation/logs')
  return response.data
}

// Integrations API
export const getIntegrationStatus = async () => {
  const response = await api.get('/integrations/status')
  return response.data
}

export const syncIntegration = async (platform) => {
  const response = await api.post('/integrations/sync', { platform })
  return response.data
}

export default api

