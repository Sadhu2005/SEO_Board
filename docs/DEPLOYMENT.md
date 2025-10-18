# 🚀 FlowMind AI - Deployment Guide

Guide for deploying FlowMind AI to production environments.

---

## 📦 Deployment Options

| Option | Frontend | Backend | Difficulty | Cost |
|--------|----------|---------|------------|------|
| **Vercel + Render** | Vercel | Render | Easy | Free tier |
| **Netlify + Heroku** | Netlify | Heroku | Easy | Free tier |
| **AWS** | S3 + CloudFront | EC2/ECS | Medium | Pay-as-you-go |
| **DigitalOcean** | App Platform | App Platform | Easy | $5+/month |
| **Self-hosted** | Nginx | Custom | Hard | Variable |

---

## 🎯 Recommended: Vercel + Render (Free)

This setup is perfect for hackathons and MVPs.

### Part 1: Deploy Backend to Render

#### 1. Prepare Backend for Production

Create `backend/Procfile`:
```
web: gunicorn app:app
```

Update `backend/requirements.txt` to include:
```txt
gunicorn==21.2.0
```

#### 2. Create Render Account

- Go to [render.com](https://render.com)
- Sign up with GitHub

#### 3. Deploy Backend

1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: flowmind-backend
   - **Root Directory**: backend
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Plan**: Free

4. Add Environment Variables:
   ```
   FLASK_ENV=production
   SECRET_KEY=<generate-secure-key>
   MONGODB_URI=<your-mongodb-atlas-uri>
   GEMINI_API_KEY=<your-key>
   YOUTUBE_API_KEY=<your-key>
   CORS_ORIGINS=https://your-frontend-domain.vercel.app
   ```

5. Click "Create Web Service"

#### 4. Get Backend URL

After deployment, you'll get a URL like:
```
https://flowmind-backend.onrender.com
```

---

### Part 2: Deploy Frontend to Vercel

#### 1. Prepare Frontend

Update `frontend/.env.production`:
```env
VITE_API_URL=https://flowmind-backend.onrender.com/api
```

#### 2. Create Vercel Account

- Go to [vercel.com](https://vercel.com)
- Sign up with GitHub

#### 3. Deploy Frontend

1. Click "New Project"
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: dist

4. Add Environment Variable:
   ```
   VITE_API_URL=https://flowmind-backend.onrender.com/api
   ```

5. Click "Deploy"

#### 4. Get Frontend URL

You'll get a URL like:
```
https://flowmind-ai.vercel.app
```

#### 5. Update Backend CORS

Go back to Render dashboard and update `CORS_ORIGINS`:
```
CORS_ORIGINS=https://flowmind-ai.vercel.app
```

---

## 🗄️ Database Setup (MongoDB Atlas)

### 1. Create MongoDB Atlas Account

- Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Sign up for free

### 2. Create Cluster

1. Click "Build a Database"
2. Choose "Free" tier (M0)
3. Select a cloud provider and region
4. Name your cluster: "flowmind-cluster"

### 3. Create Database User

1. Go to "Database Access"
2. Click "Add New Database User"
3. Create username and password (save these!)
4. Grant "Read and write to any database"

### 4. Whitelist IP Addresses

1. Go to "Network Access"
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0)
   - For production, whitelist specific IPs

### 5. Get Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string:
   ```
   mongodb+srv://username:<password>@cluster.xxx.mongodb.net/flowmind?retryWrites=true&w=majority
   ```
4. Replace `<password>` with your actual password

### 6. Update Backend Environment

Add to Render environment variables:
```
MONGODB_URI=mongodb+srv://username:password@cluster.xxx.mongodb.net/flowmind?retryWrites=true&w=majority
```

---

## 🔧 Alternative Deployment: AWS

### Frontend (S3 + CloudFront)

#### 1. Build Frontend

```bash
cd frontend
npm run build
```

#### 2. Create S3 Bucket

```bash
aws s3 mb s3://flowmind-frontend
aws s3 sync dist/ s3://flowmind-frontend
aws s3 website s3://flowmind-frontend \
  --index-document index.html \
  --error-document index.html
```

#### 3. Set up CloudFront

- Create CloudFront distribution
- Point to S3 bucket
- Enable HTTPS

### Backend (EC2 or ECS)

#### Option A: EC2

1. Launch Ubuntu EC2 instance
2. SSH into instance
3. Install Python, MongoDB
4. Clone repository
5. Set up Nginx reverse proxy
6. Configure systemd service

#### Option B: ECS (Docker)

Create `backend/Dockerfile`:
```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
```

Deploy to ECS:
```bash
docker build -t flowmind-backend .
docker tag flowmind-backend:latest <ecr-url>/flowmind-backend:latest
docker push <ecr-url>/flowmind-backend:latest
```

---

## 🔐 Production Security Checklist

### Environment Variables
- [ ] Use strong, unique `SECRET_KEY`
- [ ] Store all API keys in environment variables
- [ ] Never commit `.env` files

### CORS Configuration
- [ ] Set specific origins (not `*`)
- [ ] Update as domains change

### HTTPS
- [ ] Enable HTTPS on all endpoints
- [ ] Use Let's Encrypt for free SSL
- [ ] Force redirect HTTP → HTTPS

### Database
- [ ] Use strong passwords
- [ ] Whitelist only necessary IPs
- [ ] Enable authentication
- [ ] Regular backups

### API Keys
- [ ] Rotate keys regularly
- [ ] Use different keys for dev/prod
- [ ] Monitor usage

### Rate Limiting
- [ ] Implement rate limiting
- [ ] Set reasonable limits
- [ ] Log suspicious activity

---

## 📊 Monitoring & Analytics

### Backend Monitoring (Sentry)

1. Sign up at [sentry.io](https://sentry.io)
2. Get DSN
3. Add to `requirements.txt`:
   ```txt
   sentry-sdk[flask]==1.39.1
   ```
4. Initialize in `app.py`:
   ```python
   import sentry_sdk
   from sentry_sdk.integrations.flask import FlaskIntegration
   
   sentry_sdk.init(
       dsn=os.getenv('SENTRY_DSN'),
       integrations=[FlaskIntegration()],
   )
   ```

### Frontend Monitoring (Vercel Analytics)

Vercel provides built-in analytics:
- Go to project settings
- Enable "Analytics"
- Free tier includes basic metrics

### Uptime Monitoring (UptimeRobot)

1. Sign up at [uptimerobot.com](https://uptimerobot.com)
2. Add monitor for your backend URL
3. Set up email/SMS alerts

---

## 🔄 CI/CD Setup

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy FlowMind AI

on:
  push:
    branches: [ main ]

jobs:
  test-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Python
        uses: actions/setup-python@v2
        with:
          python-version: 3.9
      - name: Install dependencies
        run: |
          cd backend
          pip install -r requirements.txt
      - name: Run tests
        run: |
          cd backend
          pytest

  test-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Node
        uses: actions/setup-node@v2
        with:
          node-version: 18
      - name: Install dependencies
        run: |
          cd frontend
          npm install
      - name: Build
        run: |
          cd frontend
          npm run build
```

---

## 🚦 Pre-Deployment Checklist

### Code
- [ ] All tests passing
- [ ] No console errors
- [ ] Code is minified/optimized
- [ ] Remove debug statements

### Configuration
- [ ] Environment variables set
- [ ] CORS configured correctly
- [ ] Database connected
- [ ] API keys valid

### Performance
- [ ] Images optimized
- [ ] Enable compression
- [ ] CDN configured
- [ ] Caching enabled

### SEO (if needed)
- [ ] Meta tags set
- [ ] Sitemap generated
- [ ] robots.txt configured
- [ ] Social media previews

---

## 📈 Post-Deployment

### Test Everything
```bash
# Test backend
curl https://your-backend-url.com/api/health

# Test frontend
open https://your-frontend-url.com
```

### Monitor Logs
- Check Render logs for backend errors
- Check Vercel logs for frontend errors
- Monitor Sentry for exceptions

### Performance Testing
- Use Lighthouse for frontend
- Use Apache Bench for backend:
  ```bash
  ab -n 1000 -c 10 https://your-backend-url.com/api/health
  ```

---

## 🆘 Troubleshooting

### Backend not responding
- Check Render logs
- Verify environment variables
- Test MongoDB connection
- Check CORS settings

### Frontend shows errors
- Check browser console
- Verify API URL in environment
- Check CORS from backend
- Clear browser cache

### Database connection failed
- Verify MongoDB Atlas IP whitelist
- Check connection string
- Test credentials
- Check network access

---

## 🎉 You're Live!

Your FlowMind AI dashboard is now deployed and accessible to the world!

### Share Your Project
- Update README with live URLs
- Create demo video
- Share on social media
- Submit to hackathon

---

**Need help? Check other docs or contact the team!**

