# 📡 FlowMind AI - API Documentation

Complete API reference for the FlowMind AI backend.

**Base URL:** `http://localhost:5000/api`

---

## 🔐 Authentication

Currently, the API is open for development. In production, implement JWT-based authentication.

---

## 📊 Analytics Endpoints

### Get Overview

Get overall analytics overview with SEO, social, and content metrics.

**Endpoint:** `GET /api/analytics/overview`

**Response:**
```json
{
  "success": true,
  "data": {
    "seo": {
      "organic_traffic": 12500,
      "keyword_rankings": 145,
      "backlinks": 320,
      "domain_authority": 65,
      "trend": "up"
    },
    "social": {
      "total_followers": 35000,
      "engagement_rate": 6.8,
      "posts_today": 5,
      "reach": 125000
    },
    "content": {
      "articles_published": 12,
      "avg_read_time": 245,
      "bounce_rate": 42.5,
      "conversions": 180
    }
  },
  "timestamp": "2025-10-12T10:30:00Z"
}
```

---

### Get Time Series Data

Get historical time series data for charts.

**Endpoint:** `GET /api/analytics/timeseries`

**Query Parameters:**
- `days` (optional) - Number of days (default: 7)
- `metric` (optional) - Metric type (default: traffic)

**Example:** `GET /api/analytics/timeseries?days=7&metric=traffic`

**Response:**
```json
{
  "success": true,
  "metric": "traffic",
  "data": [
    {
      "date": "2025-10-06",
      "value": 3200
    },
    {
      "date": "2025-10-07",
      "value": 3500
    }
    // ... more days
  ]
}
```

---

### Get Social Media Metrics

Get detailed metrics for all social platforms.

**Endpoint:** `GET /api/analytics/social-metrics`

**Response:**
```json
{
  "success": true,
  "data": {
    "youtube": {
      "subscribers": 45230,
      "views": 1250000,
      "engagement": 6.8,
      "videos": 156
    },
    "twitter": {
      "followers": 28500,
      "impressions": 450000,
      "engagement": 4.2,
      "tweets": 850
    },
    "instagram": {
      "followers": 32000,
      "reach": 280000,
      "engagement": 7.5,
      "posts": 320
    }
  },
  "timestamp": "2025-10-12T10:30:00Z"
}
```

---

### Get SEO Health

Get SEO health score and issues.

**Endpoint:** `GET /api/analytics/seo-health`

**Response:**
```json
{
  "success": true,
  "data": {
    "overall_score": 85,
    "issues": {
      "critical": 1,
      "warnings": 5,
      "notices": 12
    },
    "top_keywords": [
      {
        "keyword": "AI marketing",
        "position": 5,
        "volume": 12000
      }
    ],
    "page_speed": 88,
    "mobile_friendly": true
  },
  "timestamp": "2025-10-12T10:30:00Z"
}
```

---

## 🤖 AI Engine Endpoints

### Generate Predictions

Generate predictive analytics for future metrics.

**Endpoint:** `POST /api/ai/predict`

**Request Body:**
```json
{
  "metric_type": "engagement",
  "time_horizon": 7
}
```

**Response:**
```json
{
  "success": true,
  "prediction": {
    "metric_type": "engagement",
    "predictions": [
      {
        "date": "2025-10-13",
        "predicted_value": 4500,
        "confidence": 0.87,
        "lower_bound": 3825,
        "upper_bound": 5175
      }
    ],
    "model_accuracy": 0.87,
    "trend": "increasing"
  },
  "timestamp": "2025-10-12T10:30:00Z"
}
```

---

### Get AI Insights

Get AI-generated insights from current data.

**Endpoint:** `GET /api/ai/insights`

**Response:**
```json
{
  "success": true,
  "insights": [
    {
      "id": 1,
      "type": "opportunity",
      "priority": "high",
      "title": "Optimal Posting Window Detected",
      "description": "Your audience engagement peaks between 1-3 PM...",
      "impact": "+35% expected engagement",
      "action": "Schedule post for 2:00 PM",
      "category": "social_media",
      "timestamp": "2025-10-12T10:30:00Z"
    }
  ],
  "timestamp": "2025-10-12T10:30:00Z"
}
```

---

### Get Recommendations

Get AI-powered recommendations by category.

**Endpoint:** `GET /api/ai/recommendations`

**Query Parameters:**
- `category` (optional) - Filter by category: all, seo, social, content (default: all)

**Example:** `GET /api/ai/recommendations?category=seo`

**Response:**
```json
{
  "success": true,
  "recommendations": [
    {
      "id": "seo_1",
      "title": "Update Title Tags",
      "description": "Optimize title tags for top 5 pages...",
      "priority": "high",
      "impact": "High",
      "effort": "Low",
      "estimated_improvement": "+15% CTR",
      "action_items": [
        "Review current title tags",
        "Research trending keywords",
        "Update and A/B test"
      ]
    }
  ],
  "timestamp": "2025-10-12T10:30:00Z"
}
```

---

### Get Best Time to Post

Predict optimal posting times for social media.

**Endpoint:** `GET /api/ai/best-time-to-post`

**Query Parameters:**
- `platform` (optional) - Platform name or 'all' (default: all)

**Response:**
```json
{
  "success": true,
  "data": {
    "today": [
      {
        "time": "09:00",
        "score": 0.92,
        "reason": "High engagement period"
      },
      {
        "time": "13:00",
        "score": 0.85,
        "reason": "Lunch break peak"
      }
    ],
    "weekly_pattern": {
      "Monday": 0.78,
      "Tuesday": 0.85,
      "Wednesday": 0.92,
      "Thursday": 0.88,
      "Friday": 0.75,
      "Saturday": 0.65,
      "Sunday": 0.70
    }
  },
  "platform": "all",
  "timestamp": "2025-10-12T10:30:00Z"
}
```

---

### Analyze Sentiment

Analyze sentiment of text content.

**Endpoint:** `POST /api/ai/sentiment`

**Request Body:**
```json
{
  "text": "Your content text here..."
}
```

**Response:**
```json
{
  "success": true,
  "sentiment": {
    "score": 0.85,
    "label": "positive",
    "keywords": ["AI", "marketing", "automation", "growth"]
  },
  "timestamp": "2025-10-12T10:30:00Z"
}
```

---

## ⚡ Automation Endpoints

### Get Automation Triggers

List all automation triggers.

**Endpoint:** `GET /api/automation/triggers`

**Response:**
```json
{
  "success": true,
  "triggers": [
    {
      "id": 1,
      "name": "Low Engagement Alert",
      "status": "active",
      "condition": "engagement_rate < 3%",
      "action": "Send notification",
      "last_triggered": "2 hours ago"
    }
  ],
  "timestamp": "2025-10-12T10:30:00Z"
}
```

---

### Execute Action

Execute an automation action.

**Endpoint:** `POST /api/automation/execute`

**Request Body:**
```json
{
  "action_type": "post_to_social",
  "params": {
    "platform": "twitter",
    "content": "Check out our latest blog post!",
    "schedule_time": "2025-10-12T14:00:00Z"
  }
}
```

**Response:**
```json
{
  "success": true,
  "result": {
    "action": "post_to_social",
    "status": "completed",
    "details": "Successfully executed post_to_social",
    "execution_time": "2025-10-12T10:30:00Z"
  }
}
```

---

### Create Workflow

Create a new automation workflow.

**Endpoint:** `POST /api/automation/workflow/create`

**Request Body:**
```json
{
  "name": "Auto-Post Best Content",
  "trigger": "high_engagement_detected",
  "actions": [
    "schedule_repost",
    "notify_team"
  ]
}
```

**Response:**
```json
{
  "success": true,
  "workflow": {
    "id": 1234,
    "name": "Auto-Post Best Content",
    "trigger": "high_engagement_detected",
    "actions": ["schedule_repost", "notify_team"],
    "status": "active",
    "created_at": "2025-10-12T10:30:00Z"
  }
}
```

---

### Get Automation Logs

Get recent automation execution logs.

**Endpoint:** `GET /api/automation/logs`

**Response:**
```json
{
  "success": true,
  "logs": [
    {
      "timestamp": "2025-10-12T08:30:00Z",
      "action": "Auto-post to Twitter",
      "status": "success",
      "details": "Posted trending content"
    }
  ],
  "timestamp": "2025-10-12T10:30:00Z"
}
```

---

## 🔗 Integration Endpoints

### Get Integration Status

Get status of all platform integrations.

**Endpoint:** `GET /api/integrations/status`

**Response:**
```json
{
  "success": true,
  "integrations": {
    "youtube": {
      "status": "connected",
      "last_sync": "10 minutes ago"
    },
    "twitter": {
      "status": "connected",
      "last_sync": "5 minutes ago"
    },
    "instagram": {
      "status": "connected",
      "last_sync": "15 minutes ago"
    }
  },
  "timestamp": "2025-10-12T10:30:00Z"
}
```

---

### Sync Integration Data

Trigger data sync from a platform.

**Endpoint:** `POST /api/integrations/sync`

**Request Body:**
```json
{
  "platform": "youtube"
}
```

**Response:**
```json
{
  "success": true,
  "result": {
    "platform": "youtube",
    "status": "syncing",
    "started_at": "2025-10-12T10:30:00Z"
  }
}
```

---

### Connect Integration

Connect a new platform integration.

**Endpoint:** `POST /api/integrations/connect`

**Request Body:**
```json
{
  "platform": "youtube",
  "credentials": {
    "api_key": "your-api-key"
  }
}
```

**Response:**
```json
{
  "success": true,
  "result": {
    "platform": "youtube",
    "status": "connected",
    "connected_at": "2025-10-12T10:30:00Z"
  }
}
```

---

## 🏥 Health Check

### Health Status

Check if the API is running.

**Endpoint:** `GET /api/health`

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-10-12T10:30:00Z",
  "service": "FlowMind AI Backend"
}
```

---

## ❌ Error Responses

All endpoints may return error responses in this format:

```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

---

## 🔄 Rate Limiting

Currently no rate limiting in development. In production:
- **100 requests/minute** per IP
- Returns `429 Too Many Requests` when exceeded

---

## 📝 Notes

- All timestamps are in ISO 8601 format (UTC)
- All responses include a `timestamp` field
- Sample data is returned when real integrations are not configured
- Replace with actual API implementations in production

---

## 🧪 Testing with cURL

```bash
# Health check
curl http://localhost:5000/api/health

# Get overview
curl http://localhost:5000/api/analytics/overview

# Get insights
curl http://localhost:5000/api/ai/insights

# Make prediction
curl -X POST http://localhost:5000/api/ai/predict \
  -H "Content-Type: application/json" \
  -d '{"metric_type": "engagement", "time_horizon": 7}'
```

---

**For more help, see [SETUP.md](SETUP.md) or contact the team.**

