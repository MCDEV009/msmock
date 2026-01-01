# Deployment Guide

## Step-by-Step Vercel Deployment

### 1. Prepare Your Repository

```bash
# Make sure you have git initialized
git init
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy Backend

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Connect your GitHub account
4. Select your repository
5. Select "backend" folder as root directory
6. Click "Environment Variables" and add:
   - Key: `MONGODB_URI`
   - Value: Your MongoDB Atlas connection string
   - Key: `FRONTEND_URL`
   - Value: (You'll get this after deploying frontend)
7. Click "Deploy"

Wait for deployment. Copy your backend URL (e.g., `https://backend-xyz.vercel.app`)

### 3. Deploy Frontend

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your repository again
4. Select "frontend" folder as root directory
5. Click "Environment Variables" and add:
   - Key: `VITE_API_URL`
   - Value: `https://backend-xyz.vercel.app/api` (your backend URL from step 2)
6. Click "Deploy"

Wait for deployment. Copy your frontend URL (e.g., `https://frontend-xyz.vercel.app`)

### 4. Update Backend Environment Variable

1. Go back to Vercel Backend project
2. Go to Settings > Environment Variables
3. Update `FRONTEND_URL` with your frontend URL from step 3
4. Redeploy backend (click "Redeploy")

### 5. Database Setup

If you don't have MongoDB Atlas:

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create free account
3. Create new cluster (free tier)
4. Get connection string: Cluster > Connect > Connect your application
5. Copy connection string and use as `MONGODB_URI`

### Troubleshooting

**CORS Issues:**
- Make sure `FRONTEND_URL` is set correctly in backend
- Check frontend `VITE_API_URL` points to correct backend

**MongoDB Connection:**
- Verify IP whitelist in MongoDB Atlas (allow all IPs: 0.0.0.0/0)
- Check connection string format

**Seed Data:**
- Run seed locally before deploying:
  ```bash
  npm run seed
  ```

## Rolling Back

If deployment fails:

1. Go to Vercel project
2. Go to "Deployments"
3. Click on previous successful deployment
4. Click "Redeploy"
