# Free Deployment Options for Airport Issue Portal

Since Render requires paid plans, here are **FREE** alternatives to deploy your Airport Issue Portal:

## 🚀 Option 1: Vercel (Recommended - Free Tier Available)

Vercel offers excellent free hosting for both frontend and backend.

### Deploy Backend to Vercel:

1. **Go to [vercel.com](https://vercel.com)** and sign up with GitHub
2. **Import your repository**: `https://github.com/Saketh875/Airport_app.git`
3. **Configure backend deployment**:
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Set Environment Variables**:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string
   - `NODE_ENV`: `production`

### Deploy Frontend to Vercel:

1. **Create a new project** in Vercel
2. **Import the same repository**
3. **Configure frontend deployment**:
   - **Framework Preset**: Angular
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/frontend`

4. **Set Environment Variables**:
   - `API_URL`: `https://your-backend-url.vercel.app`

## 🌐 Option 2: Netlify (Free Tier Available)

### Deploy Backend to Netlify Functions:

1. **Go to [netlify.com](https://netlify.com)** and sign up
2. **Import your repository**
3. **Configure backend**:
   - **Build Command**: `cd backend && npm install && npm run build`
   - **Publish Directory**: `backend/dist`

### Deploy Frontend to Netlify:

1. **Create a new site**
2. **Configure frontend**:
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist/frontend`

## 🚂 Option 3: Railway (Free Tier Available)

Railway offers generous free tier with automatic deployments.

### Deploy Both Services:

1. **Go to [railway.app](https://railway.app)** and sign up with GitHub
2. **Create a new project**
3. **Add two services**:
   - **Backend Service**: Connect GitHub repo, set root directory to `backend`
   - **Frontend Service**: Connect GitHub repo, set root directory to `frontend`

4. **Set Environment Variables** for backend:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string

## 🔧 Option 4: Heroku (Limited Free Tier)

### Deploy Backend to Heroku:

1. **Install Heroku CLI**
2. **Create Heroku app**:
   ```bash
   heroku create airport-backend-app
   ```

3. **Configure for Node.js**:
   ```bash
   cd backend
   heroku git:remote -a airport-backend-app
   git subtree push --prefix backend heroku main
   ```

4. **Set Environment Variables**:
   ```bash
   heroku config:set MONGO_URI=your_mongo_uri
   heroku config:set JWT_SECRET=your_jwt_secret
   ```

### Deploy Frontend to Heroku:

1. **Create another Heroku app**:
   ```bash
   heroku create airport-frontend-app
   ```

2. **Deploy frontend**:
   ```bash
   cd frontend
   heroku git:remote -a airport-frontend-app
   git subtree push --prefix frontend heroku main
   ```

## 📋 Prerequisites for All Options:

1. **MongoDB Atlas Account** (Free tier available)
2. **GitHub Repository** (Already done ✅)
3. **Environment Variables**:
   - `MONGO_URI`: MongoDB Atlas connection string
   - `JWT_SECRET`: Secure random string

## 🎯 Recommended Approach:

**Vercel** is the most user-friendly and reliable option with:
- ✅ Free tier available
- ✅ Automatic deployments from GitHub
- ✅ Great performance
- ✅ Easy environment variable management
- ✅ Built-in CI/CD

## 🔄 Quick Setup Steps:

1. **Set up MongoDB Atlas** (free)
2. **Deploy backend to Vercel**
3. **Deploy frontend to Vercel**
4. **Update frontend API URL** to point to your backend
5. **Test your deployed app**

Would you like me to help you set up deployment on any of these platforms?
