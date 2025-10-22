# Deploy Airport Issue Portal to Render

This guide will help you deploy your Airport Issue Portal to Render.com.

## Prerequisites

1. **MongoDB Atlas Account**: You'll need a MongoDB Atlas cluster
2. **Render Account**: Sign up at [render.com](https://render.com)
3. **GitHub Repository**: Your code should be pushed to GitHub

## Step 1: Set up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Get your connection string
5. Note down your connection string for later use

## Step 2: Deploy Backend to Render

### Option A: Using render.yaml (Recommended)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Blueprint"
3. Connect your GitHub repository
4. Select your repository
5. Render will automatically detect the `render.yaml` file
6. Click "Apply" to deploy both services

### Option B: Manual Deployment

#### Deploy Backend:

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the backend service:
   - **Name**: `airport-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install && npm run build`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free

#### Environment Variables for Backend:
- `NODE_ENV`: `production`
- `PORT`: `10000` (Render will override this)
- `MONGO_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: A secure random string (e.g., use a password generator)

## Step 3: Deploy Frontend to Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Static Site"
3. Connect your GitHub repository
4. Configure the frontend service:
   - **Name**: `airport-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist/frontend`
   - **Plan**: Free

#### Environment Variables for Frontend:
- `API_URL`: `https://your-backend-url.onrender.com` (update after backend deploys)

## Step 4: Update Frontend API URL

After your backend deploys:

1. Copy your backend URL from Render dashboard
2. Go to your frontend service settings
3. Update the `API_URL` environment variable
4. Redeploy the frontend

## Step 5: Test Your Deployment

1. Visit your frontend URL
2. Try logging in with test credentials
3. Test issue reporting functionality

## Troubleshooting

### Common Issues:

1. **Build Failures**: Check the build logs in Render dashboard
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

- **Backend**: Sleeps after 15 minutes of inactivity
- **Frontend**: Unlimited static hosting
- **Database**: MongoDB Atlas free tier (512MB)

## Production Considerations

For production deployment, consider:
- Using a paid Render plan for always-on backend
- Setting up custom domains
- Implementing proper error monitoring
- Adding SSL certificates
- Setting up automated backups
