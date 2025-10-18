# 🛠️ FlowMind AI - Complete Setup Guide

This guide will walk you through setting up the FlowMind AI dashboard from scratch.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
- **Python 3.9 or higher** - [Download](https://www.python.org/downloads/)
- **Node.js 18 or higher** - [Download](https://nodejs.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/downloads)

### API Keys Required
You'll need to obtain API keys from these services:

1. **Gemini API** - [Get Key](https://makersuite.google.com/app/apikey)
2. **YouTube Data API** - [Get Key](https://console.developers.google.com/)
3. **Twitter API** (Optional) - [Get Key](https://developer.twitter.com/)
4. **Instagram Basic Display API** (Optional) - [Get Key](https://developers.facebook.com/)

---

## 🚀 Step-by-Step Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-team/flowmind-ai.git
cd flowmind-ai
```

---

### Step 2: Backend Setup

#### 1. Navigate to backend directory

```bash
cd backend
```

#### 2. Create a virtual environment

**On Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**On macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

#### 3. Install Python dependencies

```bash
pip install -r requirements.txt
```

This will install:
- Flask (web framework)
- Flask-CORS (CORS support)
- pymongo (MongoDB driver)
- scikit-learn, pandas, numpy (ML libraries)
- prophet (time series forecasting)
- google-generativeai (Gemini API)
- And other dependencies

#### 4. Configure environment variables

```bash
# Copy the example env file
cp .env.example .env

# Open .env in your favorite editor
# Windows: notepad .env
# macOS: open .env
# Linux: nano .env
```

Fill in your API keys:

```env
FLASK_ENV=development
SECRET_KEY=your-super-secret-key-change-this
PORT=5000

MONGODB_URI=mongodb://localhost:27017/flowmind

# AI APIs
GEMINI_API_KEY=your-gemini-api-key-here
OPENAI_API_KEY=your-openai-key-optional

# Social Media APIs
YOUTUBE_API_KEY=your-youtube-api-key
TWITTER_BEARER_TOKEN=your-twitter-token-optional
INSTAGRAM_ACCESS_TOKEN=your-instagram-token-optional

# Google Services
GOOGLE_SEARCH_CONSOLE_CREDENTIALS=path/to/credentials.json
GOOGLE_ANALYTICS_TRACKING_ID=your-ga-id-optional

# Redis (for background tasks)
REDIS_URL=redis://localhost:6379/0

CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

#### 5. Start MongoDB

**Option A: Local MongoDB**
```bash
# Windows: MongoDB should start automatically as a service

# macOS (with Homebrew):
brew services start mongodb-community

# Linux:
sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**
- Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a free cluster
- Get your connection string
- Use it in your `.env` file

#### 6. Run the backend

```bash
python app.py
```

You should see:
```
 * Running on http://0.0.0.0:5000
 * Debug mode: on
```

Test the backend:
```bash
# In a new terminal
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2025-10-12T...",
  "service": "FlowMind AI Backend"
}
```

---

### Step 3: Frontend Setup

#### 1. Open a new terminal and navigate to frontend

```bash
cd frontend
```

#### 2. Install Node.js dependencies

```bash
npm install
```

This will install:
- React & React DOM
- Vite (build tool)
- TailwindCSS (styling)
- Recharts (charts)
- Axios (HTTP client)
- React Router (routing)
- And other dependencies

#### 3. Configure frontend environment

```bash
# Copy the example env file
cp .env.example .env
```

Edit `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

#### 4. Run the frontend

```bash
npm run dev
```

You should see:
```
VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

#### 5. Open in browser

Navigate to: `http://localhost:5173`

You should see the FlowMind AI dashboard! 🎉

---

## ✅ Verification Checklist

Test these to ensure everything is working:

### Backend Tests
- [ ] `http://localhost:5000/api/health` returns healthy status
- [ ] `http://localhost:5000/api/analytics/overview` returns sample data
- [ ] `http://localhost:5000/api/ai/insights` returns AI insights

### Frontend Tests
- [ ] Dashboard loads without errors
- [ ] Sidebar navigation works
- [ ] Metrics cards display data
- [ ] Charts render properly
- [ ] AI Insights page shows insights
- [ ] Automation page displays triggers

---

## 🔧 Common Issues & Solutions

### Issue 1: Port Already in Use

**Error:** `Address already in use`

**Solution:**
```bash
# Find and kill the process
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:5000 | xargs kill -9
```

Or change the port in `.env`:
```env
PORT=5001
```

### Issue 2: MongoDB Connection Failed

**Error:** `MongoServerError: connect ECONNREFUSED`

**Solution:**
- Ensure MongoDB is running
- Check your connection string in `.env`
- For Atlas, whitelist your IP address

### Issue 3: Module Not Found

**Error:** `ModuleNotFoundError: No module named 'flask'`

**Solution:**
```bash
# Make sure virtual environment is activated
# Look for (venv) in your terminal prompt

# Reinstall dependencies
pip install -r requirements.txt
```

### Issue 4: CORS Errors in Browser

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
- Check `CORS_ORIGINS` in backend `.env`
- Restart backend server
- Clear browser cache

### Issue 5: API Key Issues

**Error:** `Invalid API key` or `API key not found`

**Solution:**
- Double-check API key in `.env`
- Ensure no extra spaces or quotes
- Restart backend after changing `.env`

---

## 🎯 Optional: Production Setup

### Using Gunicorn (Backend)

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Build Frontend for Production

```bash
cd frontend
npm run build
```

This creates an optimized build in `frontend/dist/`

### Deploy Options

1. **Vercel** (Frontend) - [Guide](https://vercel.com/docs)
2. **Render** (Backend) - [Guide](https://render.com/docs)
3. **Heroku** (Full Stack) - [Guide](https://devcenter.heroku.com/)
4. **AWS/Azure/GCP** (Advanced)

---

## 🧪 Testing

### Backend Tests

```bash
cd backend
pytest
```

### Frontend Tests

```bash
cd frontend
npm run test
```

---

## 📦 Database Seeding (Optional)

To populate the database with sample data:

```bash
cd backend
python seed_data.py  # Create this script to add sample data
```

---

## 🔐 Security Best Practices

1. **Never commit `.env` files** - Already in `.gitignore`
2. **Use strong SECRET_KEY** - Generate with:
   ```python
   import secrets
   print(secrets.token_hex(32))
   ```
3. **Enable HTTPS** in production
4. **Use environment-specific configs** - Different keys for dev/prod
5. **Regularly rotate API keys**

---

## 📚 Next Steps

Once setup is complete:

1. Read [API.md](API.md) for API documentation
2. Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment guides
3. Explore the codebase structure
4. Start building features!

---

## 💬 Need Help?

- **GitHub Issues**: [Report a bug](https://github.com/your-team/flowmind-ai/issues)
- **Email**: team@flowmind.ai
- **Docs**: Check other files in `/docs`

---

## 🎉 You're All Set!

Your FlowMind AI dashboard should now be running successfully. Time to build something amazing! 🚀

**Happy Hacking!** 🧠✨

