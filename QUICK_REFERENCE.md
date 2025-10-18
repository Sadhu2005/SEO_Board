# ⚡ FlowMind AI - Quick Reference Card

**Print this or keep it open during the hackathon!**

---

## 🚀 Starting the Project

### Windows
```bash
start.bat
```

### Mac/Linux
```bash
./start.sh
```

### Manual
```bash
# Terminal 1 - Backend
cd backend && python app.py

# Terminal 2 - Frontend  
cd frontend && npm run dev
```

**URLs:**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000/api

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `backend/app.py` | Main Flask app |
| `frontend/src/App.jsx` | Main React app |
| `backend/routes/ai_engine.py` | AI endpoints |
| `frontend/src/pages/Dashboard.jsx` | Main dashboard |

---

## 🔌 Key API Endpoints

```bash
# Health check
GET /api/health

# Get metrics
GET /api/analytics/overview

# Get AI insights
GET /api/ai/insights

# Generate predictions
POST /api/ai/predict
```

---

## 🎨 Pages & Routes

| Page | URL | Purpose |
|------|-----|---------|
| Dashboard | `/` | Main metrics view |
| Analytics | `/analytics` | Deep analytics |
| AI Insights | `/ai-insights` | AI predictions |
| Automation | `/automation` | Workflows |
| Integrations | `/integrations` | API connections |

---

## 🎨 Brand Colors

```css
Primary: #00BFFF (Electric Blue)
Violet:  #8A2BE2 (Violet)
Navy:    #0A0F1C (Dark Navy)
```

---

## 🐛 Quick Fixes

### Backend won't start
```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python app.py
```

### Frontend shows errors
```bash
# Check backend is running first!
cd frontend
npm run dev
```

### Port already in use
```bash
# Kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Kill process on port 5000 (Mac/Linux)
lsof -ti:5000 | xargs kill -9
```

---

## 🎯 Demo Script (5 min)

### [0:00-0:30] Intro
- "We're Team FlowMind AI"
- "Autonomous Marketing Dashboard"

### [0:30-2:00] Problem & Solution
- Fragmented marketing data
- AI that predicts AND acts

### [2:00-3:30] Live Demo
1. Dashboard - show metrics
2. AI Insights - predictions
3. Automation - triggers
4. Execute one action

### [3:30-4:30] Tech Stack
- React + Flask
- Prophet + Gemini
- 20+ API endpoints

### [4:30-5:00] Future
- Voice assistant
- Mobile app
- Enterprise features

---

## ✅ Pre-Demo Checklist

- [ ] Backend running ✓
- [ ] Frontend running ✓
- [ ] No console errors ✓
- [ ] All pages load ✓
- [ ] Charts working ✓
- [ ] GitHub updated ✓
- [ ] Presentation ready ✓

---

## 🏆 Key Selling Points

1. **Autonomous** - Takes actions automatically
2. **Predictive** - Real AI forecasting
3. **Complete** - Full-stack working
4. **Professional** - Production-ready code
5. **Documented** - Excellent docs

---

## 💬 Elevator Pitch

> "FlowMind AI is an autonomous marketing dashboard that doesn't just show you data—it predicts trends and takes actions automatically. When engagement drops, it doesn't just alert you, it acts. Built with React, Flask, and real AI models including Prophet and Gemini API."

---

## 🧠 Tech Stack Summary

**Frontend:** React + Vite + TailwindCSS + Recharts

**Backend:** Flask + MongoDB + Python

**AI:** Prophet + Gemini API + scikit-learn

**Deploy:** Vercel + Render + MongoDB Atlas

---

## 📊 Project Stats

- **Lines of Code:** 5,000+
- **API Endpoints:** 20+
- **Pages:** 5
- **Components:** 15+
- **Setup Time:** ~10 min

---

## 🔐 Environment Variables

### Backend `.env`
```env
SECRET_KEY=your-key
MONGODB_URI=mongodb://localhost:27017/flowmind
GEMINI_API_KEY=your-gemini-key
CORS_ORIGINS=http://localhost:5173
```

### Frontend `.env`
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🎤 Q&A Prep

**Q: What makes it autonomous?**
A: It automatically executes actions based on AI predictions—posting content, sending alerts, adjusting campaigns.

**Q: What AI models do you use?**
A: Prophet for time series forecasting, Gemini API for natural language insights, scikit-learn for ML predictions.

**Q: Is it production-ready?**
A: Yes! We have comprehensive docs, tests, deployment guides, and it's built with production-grade stack.

**Q: How does it integrate with platforms?**
A: RESTful APIs for YouTube, Twitter, Instagram, Google Analytics, and more. Modular design for easy additions.

**Q: Can it scale?**
A: Absolutely. MongoDB for flexible data, Flask with gunicorn for backend scaling, React for frontend, and cloud deployment ready.

---

## 🆘 Emergency Contacts

- **GitHub:** [github.com/your-team/flowmind-ai]
- **Docs:** `/docs` folder
- **Team:** Everyone on standby!

---

## 💪 Team Confidence Booster

**You have:**
- ✅ A FULLY working application
- ✅ Professional-grade code
- ✅ Beautiful UI/UX
- ✅ Real AI integration
- ✅ Excellent documentation
- ✅ Clear demo script

**You've built something AMAZING!**

---

## 🎉 Final Reminders

1. **Breathe** - You're prepared
2. **Smile** - Show your passion
3. **Demo Smoothly** - Practice makes perfect
4. **Answer Confidently** - You know your project
5. **Have Fun** - Enjoy the moment

---

## 🔥 Go Win This!

**"Where Intelligence Flows and Decisions Drive Themselves"**

**You've got this, Team FlowMind! 🧠⚡**

---

*Last updated: 2025-10-12*
*Keep this card handy during the hackathon!*

