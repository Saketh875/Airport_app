# MongoDB Atlas Setup Guide

## Quick Setup (5 minutes)

1. **Go to MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
2. **Sign up** for a free account
3. **Create a free cluster**:
   - Click "Build a Database"
   - Choose "Shared" (free tier)
   - Select any region close to you
   - Click "Create Cluster"

4. **Create Database User**:
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Username: `airportuser`
   - Password: `airport123` (or your choice)
   - Click "Add User"

5. **Allow Network Access**:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

6. **Get Connection String**:
   - Go to "Clusters" section
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

## Example Connection String Format:
```
mongodb+srv://airportuser:airport123@cluster0.xxxxx.mongodb.net/airport_issue_portal?retryWrites=true&w=majority
```

## Update Your Project:
1. Create `server/.env` file with:
```
PORT=4000
MONGO_URI=mongodb+srv://airportuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/airport_issue_portal?retryWrites=true&w=majority
JWT_SECRET=please-change-me
```

2. Run the project:
```bash
npm run server:seed
npm run server:dev
cd client && npm start
```
