# Deploy Airport Issue Portal - FREE Options

This guide covers **FREE** deployment options for your Airport Issue Portal.

## 🚀 Recommended: Vercel (Free Tier Available)

Vercel offers excellent free hosting for both frontend and backend.

### Step 1: Deploy Backend to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click "New Project"
3. Import your repository: `https://github.com/Saketh875/Airport_app.git`
4. Configure backend deployment:
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Set Environment Variables**:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string
   - `NODE_ENV`: `production`

### Step 2: Deploy Frontend to Vercel

1. Create a new project in Vercel
2. Import the same repository
3. Configure frontend deployment:
   - **Framework Preset**: Angular
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/frontend`

4. **Set Environment Variables**:
   - `API_URL`: `https://your-backend-url.vercel.app`

## 🌐 Alternative: Netlify (Free Tier Available)

### Backend Deployment:
1. Go to [netlify.com](https://netlify.com)
2. Import your repository
3. Configure:
   - **Build Command**: `cd backend && npm install && npm run build`
   - **Publish Directory**: `backend/dist`

### Frontend Deployment:
1. Create a new site
2. Configure:
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist/frontend`

## 🚂 Alternative: Railway (Free Tier Available)

1. Go to [railway.app](https://railway.app)
2. Create a new project
3. Add two services:
   - **Backend**: Root directory `backend`
   - **Frontend**: Root directory `frontend`
4. Set environment variables for backend

## Prerequisites

1. **MongoDB Atlas Account**: Free tier available
2. **GitHub Repository**: ✅ Already done
3. **Environment Variables**: MongoDB URI and JWT secret

## Step 3: Set up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Get your connection string
5. Allow access from anywhere (for development)

## Step 4: Test Your Deployment

1. Visit your frontend URL
2. Try logging in with test credentials
3. Test issue reporting functionality

## Troubleshooting

### Common Issues:

1. **Build Failures**: Check the build logs in your platform's dashboard
2. **Database Connection**: Verify your MongoDB Atlas connection string
3. **CORS Issues**: The backend has CORS enabled for all origins
4. **Environment Variables**: Make sure all required variables are set

### Useful Commands:

```bash
# Test backend locally
cd backend
npm install
npm run build
npm start

# Test frontend locally
cd frontend
npm install
npm run build
npm start
```

## Free Tier Limitations

- **Vercel**: 100GB bandwidth/month, serverless functions
- **Netlify**: 100GB bandwidth/month, 300 build minutes/month
- **Railway**: $5 credit/month (usually enough for small apps)
- **Database**: MongoDB Atlas free tier (512MB)

## Production Considerations

For production deployment, consider:
- Setting up custom domains
- Implementing proper error monitoring
- Adding SSL certificates
- Setting up automated backups
- Monitoring usage to stay within free limits
