# 🧠 FlowMind AI - Autonomous Marketing Dashboard

> **"Where Intelligence Flows and Decisions Drive Themselves"**

<div align="center">

![FlowMind AI](https://img.shields.io/badge/FlowMind-AI%20Powered-00BFFF?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Hackathon%20Ready-8A2BE2?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Team FlowMind AI** | **HackAbhigna 2025** | **Agentic Flow Platform Track**

</div>

---

## 🌟 Project Overview

FlowMind AI is an **autonomous marketing dashboard** that integrates SEO, AEO, and Social Media metrics, uses predictive AI to identify trends, and autonomously triggers marketing actions. It's not just a dashboard—it's a **marketing brain that thinks and acts on its own**.

### 🎯 Key Features

| Feature | Description |
|---------|-------------|
| **🔗 Data Aggregation** | Unified metrics from YouTube, Twitter, Instagram, Google Analytics, and more |
| **📊 Advanced Analytics** | Real-time dashboards with interactive charts and KPIs |
| **🤖 Predictive AI Engine** | Forecast engagement, predict trends, suggest optimal posting times |
| **⚡ Agentic Automation** | Autonomous actions: auto-post, alerts, campaign optimization |
| **💡 AI Insights** | Natural language insights powered by Gemini API |
| **🎨 Modern UI/UX** | Sleek, animated interface with FlowMind branding |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│         Frontend (React + Vite)         │
│   Dashboard | Analytics | AI Insights   │
│   Automation | Integrations             │
└──────────────────┬──────────────────────┘
                   │ REST API
┌──────────────────▼──────────────────────┐
│           Backend (Flask)               │
│   Routes: Analytics | AI | Automation   │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│           AI Engine (Python)            │
│   Prophet | Gemini | Scikit-learn      │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│         Database (MongoDB)              │
│   Metrics | Predictions | Logs          │
└─────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

- **Python 3.9+**
- **Node.js 18+**
- **MongoDB** (local or cloud)
- API Keys (Gemini, YouTube, Twitter, etc.)

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-team/flowmind-ai.git
cd flowmind-ai
```

### 2️⃣ Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your API keys

# Run backend
python app.py
```

Backend will run on `http://localhost:5000`

### 3️⃣ Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Run development server
npm run dev
```

Frontend will run on `http://localhost:5173`

---

## 🛠️ Tech Stack

### Frontend
- **React.js 18** - UI framework
- **Vite** - Build tool (fast HMR)
- **TailwindCSS** - Styling
- **Recharts** - Data visualization
- **Axios** - API client
- **Framer Motion** - Animations

### Backend
- **Flask** - Python web framework
- **Flask-CORS** - Cross-origin support
- **Python-dotenv** - Environment management

### AI & ML
- **Gemini API** - Natural language insights
- **Prophet** - Time series forecasting
- **Scikit-learn** - Machine learning
- **Pandas & NumPy** - Data processing

### Database
- **MongoDB** - NoSQL database for flexible data storage

---

## 📁 Project Structure

```
flowmind-ai/
├── backend/
│   ├── app.py                 # Main Flask application
│   ├── config.py              # Configuration management
│   ├── requirements.txt       # Python dependencies
│   ├── .env.example          # Environment template
│   ├── routes/               # API endpoints
│   │   ├── analytics.py      # Analytics routes
│   │   ├── ai_engine.py      # AI prediction routes
│   │   ├── automation.py     # Automation routes
│   │   └── integrations.py   # Integration routes
│   └── ai/                   # AI modules
│       ├── predictor.py      # Prediction models
│       ├── insights.py       # AI insights generator
│       └── recommendations.py # Recommendation engine
│
├── frontend/
│   ├── index.html            # HTML entry point
│   ├── package.json          # Node dependencies
│   ├── vite.config.js        # Vite configuration
│   ├── tailwind.config.js    # Tailwind configuration
│   ├── src/
│   │   ├── main.jsx          # React entry point
│   │   ├── App.jsx           # Main app component
│   │   ├── index.css         # Global styles
│   │   ├── components/       # Reusable components
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── MetricCard.jsx
│   │   │   ├── ChartCard.jsx
│   │   │   └── InsightsPanel.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Analytics.jsx
│   │   │   ├── AIInsights.jsx
│   │   │   ├── Automation.jsx
│   │   │   └── Integrations.jsx
│   │   └── services/         # API services
│   │       └── api.js
│   └── .env.example          # Frontend environment template
│
├── docs/                     # Documentation
│   ├── SETUP.md             # Setup guide
│   ├── API.md               # API documentation
│   └── DEPLOYMENT.md        # Deployment guide
│
├── .gitignore               # Git ignore file
└── README.md                # This file
```

---

## 🎨 Design System

### Color Palette

```css
/* Primary Colors */
Electric Blue: #00BFFF
Violet: #8A2BE2
Dark Navy: #0A0F1C
Navy Light: #1A1F2C
```

### Typography

- **Headings**: Orbitron (bold, futuristic)
- **Body**: Poppins (clean, modern)

---

## 📊 API Endpoints

### Analytics
- `GET /api/analytics/overview` - Overall metrics
- `GET /api/analytics/timeseries` - Time series data
- `GET /api/analytics/social-metrics` - Social media stats
- `GET /api/analytics/seo-health` - SEO health check

### AI Engine
- `POST /api/ai/predict` - Generate predictions
- `GET /api/ai/insights` - Get AI insights
- `GET /api/ai/recommendations` - Get recommendations
- `GET /api/ai/best-time-to-post` - Optimal posting times

### Automation
- `GET /api/automation/triggers` - List automation triggers
- `POST /api/automation/execute` - Execute action
- `GET /api/automation/logs` - Automation logs

### Integrations
- `GET /api/integrations/status` - Integration status
- `POST /api/integrations/sync` - Sync data
- `POST /api/integrations/connect` - Connect platform

Full API documentation: [docs/API.md](docs/API.md)

---

## 🤖 AI Models

### 1. Predictive Analytics (Prophet)
- Forecasts engagement trends
- Predicts traffic patterns
- Identifies anomalies

### 2. NLP Insights (Gemini API)
- Generates natural language insights
- Analyzes sentiment
- Extracts trending keywords

### 3. Recommendation Engine
- Suggests optimal actions
- Prioritizes tasks by ROI
- Provides actionable steps

---

## 🎯 Hackathon Strategy

### Judging Criteria Alignment

| Criteria | Our Approach | Score Potential |
|----------|-------------|-----------------|
| **AI & Predictive Intelligence (20%)** | Gemini API + Prophet + scikit-learn | ⭐⭐⭐⭐⭐ |
| **Technical Complexity (20%)** | Full-stack + 3 APIs + AI models | ⭐⭐⭐⭐⭐ |
| **Fullstack Functionality (15%)** | Complete end-to-end working system | ⭐⭐⭐⭐⭐ |
| **Creativity & UX (10%)** | Modern UI with animations | ⭐⭐⭐⭐⭐ |
| **Documentation (5%)** | Comprehensive README + guides | ⭐⭐⭐⭐⭐ |

---

## 🚧 Roadmap

### Pre-Hackathon ✅
- [x] Project setup
- [x] Basic dashboard layout
- [x] API integration framework
- [x] AI prediction models
- [x] Automation workflows

### Hackathon Day 1
- [ ] Pitch presentation
- [ ] Live demo prototype
- [ ] Real API connections
- [ ] Enhanced UI polish

### Hackathon Day 2
- [ ] Final testing
- [ ] Performance optimization
- [ ] Demo video
- [ ] Final submission

### Post-Hackathon
- [ ] Deploy to production
- [ ] Add voice assistant
- [ ] Mobile app version
- [ ] RAG implementation

---

## 🤝 Team FlowMind AI

- **Frontend Developer** - React UI, animations, UX
- **Backend Developer** - Flask API, database, integrations
- **AI Engineer** - ML models, predictions, insights
- **Full-stack Developer** - Automation, deployment, testing

---

## 📝 License

MIT License - see [LICENSE](LICENSE) for details

---

## 🙏 Acknowledgments

- **HackAbhigna 2025** for the opportunity
- **Gemini API** for AI insights
- **Open source community** for amazing tools

---

## 📞 Contact

- **GitHub**: [github.com/your-team/flowmind-ai](https://github.com/your-team/flowmind-ai)
- **Email**: team@flowmind.ai
- **Demo**: [flowmind.ai](https://flowmind.ai)

---

<div align="center">

### ⚡ Built with passion for HackAbhigna 2025 ⚡

**Made with 🧠 by Team FlowMind AI**

</div>

