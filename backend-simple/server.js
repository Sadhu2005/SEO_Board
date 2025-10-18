const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'FlowMind AI Backend (Node.js)'
  });
});

// Analytics endpoints
app.get('/api/analytics/overview', (req, res) => {
  res.json({
    success: true,
    data: {
      seo: {
        organic_traffic: 15420,
        keywords_ranking: 245,
        backlinks: 89
      },
      social: {
        total_followers: 12850,
        engagement_rate: 4.2,
        reach: 45600
      },
      content: {
        conversions: 234,
        bounce_rate: 32.1,
        avg_session_duration: 145
      }
    },
    timestamp: new Date().toISOString()
  });
});

app.get('/api/analytics/timeseries', (req, res) => {
  const days = parseInt(req.query.days) || 7;
  const data = [];
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      traffic: Math.floor(Math.random() * 5000) + 10000,
      engagement: Math.floor(Math.random() * 2000) + 5000,
      conversions: Math.floor(Math.random() * 50) + 100
    });
  }
  
  res.json({
    success: true,
    data: data,
    timestamp: new Date().toISOString()
  });
});

// AI endpoints
app.get('/api/ai/insights', (req, res) => {
  res.json({
    success: true,
    insights: [
      {
        id: 1,
        type: 'opportunity',
        priority: 'high',
        title: 'Optimal Posting Window Detected',
        description: 'Your audience engagement peaks between 1-3 PM today. Consider posting your prepared content during this window for maximum reach.',
        impact: '+35% expected engagement',
        action: 'Schedule post for 2:00 PM',
        category: 'social_media',
        timestamp: new Date().toISOString()
      },
      {
        id: 2,
        type: 'alert',
        priority: 'medium',
        title: 'SEO Ranking Decline Detected',
        description: 'Your keyword "AI marketing tools" dropped 5 positions in the last 48 hours. Competitors have published fresh content.',
        impact: '-12% organic traffic',
        action: 'Update content or publish new article',
        category: 'seo',
        timestamp: new Date().toISOString()
      }
    ],
    timestamp: new Date().toISOString()
  });
});

app.post('/api/ai/predict', (req, res) => {
  const { metric_type = 'engagement', time_horizon = 7 } = req.body;
  
  const predictions = [];
  for (let i = 0; i < time_horizon; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    predictions.push({
      date: date.toISOString().split('T')[0],
      predicted_value: Math.floor(Math.random() * 5000) + 2000,
      confidence: 0.85 + Math.random() * 0.1
    });
  }
  
  res.json({
    success: true,
    prediction: {
      metric_type,
      predictions,
      model_accuracy: 0.87,
      trend: 'increasing'
    },
    timestamp: new Date().toISOString()
  });
});

// Automation endpoints
app.get('/api/automation/triggers', (req, res) => {
  res.json({
    success: true,
    triggers: [
      {
        id: 1,
        name: 'Low Engagement Alert',
        status: 'active',
        condition: 'engagement_rate < 3%',
        action: 'Send notification',
        last_triggered: '2 hours ago'
      },
      {
        id: 2,
        name: 'Auto-Post Scheduler',
        status: 'active',
        condition: 'Best time reached',
        action: 'Post to social media',
        last_triggered: '5 hours ago'
      }
    ],
    timestamp: new Date().toISOString()
  });
});

// Integrations endpoints
app.get('/api/integrations/status', (req, res) => {
  res.json({
    success: true,
    integrations: {
      youtube: { status: 'connected', last_sync: '10 minutes ago' },
      twitter: { status: 'connected', last_sync: '5 minutes ago' },
      instagram: { status: 'connected', last_sync: '15 minutes ago' },
      google_analytics: { status: 'connected', last_sync: '30 minutes ago' }
    },
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'FlowMind AI - Autonomous Marketing Dashboard API (Node.js)',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      analytics: '/api/analytics',
      ai: '/api/ai',
      automation: '/api/automation',
      integrations: '/api/integrations'
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 FlowMind AI Backend running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🧠 AI Insights: http://localhost:${PORT}/api/ai/insights`);
});
