# TinyLink Deployment Guide

Complete step-by-step guide to deploy TinyLink on Render (Backend) and Vercel (Frontend).

## 📋 Prerequisites

1. **GitHub Account** - For hosting your code
2. **MongoDB Atlas Account** - Free tier works perfectly
3. **Render Account** - For backend hosting (free tier available)
4. **Vercel Account** - For frontend hosting (free tier available)

## 🗄️ Step 1: Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Create a new cluster (free tier M0 is sufficient)
4. Wait for cluster to be created (2-3 minutes)
5. Click "Connect" on your cluster
6. Choose "Connect your application"
7. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
8. Replace `<password>` with your database user password
9. Add database name: `mongodb+srv://...@cluster.mongodb.net/tinylink?retryWrites=true&w=majority`
10. Go to "Network Access" → "Add IP Address"
11. For Render deployment, add `0.0.0.0/0` (allows all IPs) or add Render's IP ranges
12. Create a database user if you haven't already:
    - Go to "Database Access"
    - Click "Add New Database User"
    - Choose "Password" authentication
    - Set username and password (save these!)
    - Grant "Atlas Admin" role

## 🚀 Step 2: Deploy Backend on Render

### 2.1 Push Code to GitHub

1. Initialize git repository (if not already):
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial commit - TinyLink backend"
   ```

2. Create a new repository on GitHub
3. Push your code:
   ```bash
   git remote add origin https://github.com/yourusername/tinylink-backend.git
   git branch -M main
   git push -u origin main
   ```

### 2.2 Deploy on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Sign up or log in (you can use GitHub to sign in)
3. Click "New" → "Web Service"
4. Connect your GitHub account if not already connected
5. Select your repository: `tinylink-backend`
6. Configure the service:
   - **Name:** `tinylink-backend` (or your preferred name)
   - **Region:** Choose closest to you
   - **Branch:** `main`
   - **Root Directory:** Leave blank (or `backend` if monorepo)
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free (or paid if you prefer)

7. Click "Advanced" and add Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tinylink?retryWrites=true&w=majority
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend.vercel.app
   PORT=10000
   ```
   (Note: Render sets PORT automatically, but you can specify it)

8. Click "Create Web Service"
9. Render will start building and deploying
10. Wait for deployment to complete (2-5 minutes)
11. Your backend URL will be: `https://tinylink-backend.onrender.com`
   (Note: Free tier services spin down after 15 minutes of inactivity)

### 2.3 Test Backend

1. Test health check:
   ```bash
   curl https://tinylink-backend.onrender.com/healthz
   ```
   Should return: `{"ok":true,"version":"1.0"}`

2. Test API (create a link):
   ```bash
   curl -X POST https://tinylink-backend.onrender.com/api/links \
     -H "Content-Type: application/json" \
     -d '{"target": "https://example.com"}'
   ```

## 🎨 Step 3: Deploy Frontend on Vercel

### 3.1 Push Code to GitHub

1. If frontend is in a separate repo:
   ```bash
   cd frontend
   git init
   git add .
   git commit -m "Initial commit - TinyLink frontend"
   git remote add origin https://github.com/yourusername/tinylink-frontend.git
   git branch -M main
   git push -u origin main
   ```

   Or if using a monorepo, push the entire project.

### 3.2 Deploy on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Sign up or log in (you can use GitHub to sign in)
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure the project:
   - **Framework Preset:** Vite (auto-detected)
   - **Root Directory:** `frontend` (if monorepo) or leave blank
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `dist` (auto-detected)
   - **Install Command:** `npm install` (auto-detected)

6. Add Environment Variables:
   ```
   VITE_API_BASE_URL=https://tinylink-backend.onrender.com
   ```
   (Use your actual Render backend URL)

7. Click "Deploy"
8. Vercel will build and deploy automatically
9. Wait for deployment (1-2 minutes)
10. Your frontend URL will be: `https://tinylink-frontend.vercel.app`

### 3.3 Update Backend CORS

1. Go back to Render dashboard
2. Edit your backend service
3. Update the `FRONTEND_URL` environment variable:
   ```
   FRONTEND_URL=https://tinylink-frontend.vercel.app
   ```
4. Save and redeploy (or it will auto-redeploy)

## ✅ Step 4: Verify Deployment

1. **Test Frontend:**
   - Visit your Vercel URL
   - Try creating a link
   - Check if it appears in the dashboard

2. **Test Backend API:**
   - Use browser dev tools Network tab
   - Check API calls are going to Render URL

3. **Test Redirect:**
   - Create a short link
   - Copy the short URL
   - Open in new tab/incognito
   - Should redirect to original URL

4. **Test Stats:**
   - Click "View Stats" on a link
   - Should show detailed statistics

## 🔧 Troubleshooting

### Backend Issues

**Problem: Database connection fails**
- Check MongoDB Atlas network access (IP whitelist)
- Verify connection string is correct
- Check database user credentials

**Problem: CORS errors**
- Verify `FRONTEND_URL` in Render matches your Vercel URL exactly
- Check for trailing slashes

**Problem: Service keeps spinning down (free tier)**
- This is normal for Render free tier
- First request after 15 min will be slow (~30 seconds)
- Consider upgrading to paid plan for always-on service

### Frontend Issues

**Problem: API calls fail**
- Check `VITE_API_BASE_URL` in Vercel environment variables
- Verify backend is running (check Render dashboard)
- Check browser console for errors

**Problem: Build fails**
- Check Vercel build logs
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

## 📝 Environment Variables Summary

### Backend (Render)
```
MONGODB_URI=mongodb+srv://...
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app
PORT=10000 (optional, Render sets this)
```

### Frontend (Vercel)
```
VITE_API_BASE_URL=https://your-backend.onrender.com
```

## 🔄 Updating Deployments

### Backend Updates
1. Push changes to GitHub
2. Render auto-deploys on push to main branch
3. Check deployment logs in Render dashboard

### Frontend Updates
1. Push changes to GitHub
2. Vercel auto-deploys on push
3. Check deployment logs in Vercel dashboard

## 🎯 Production Checklist

- [ ] MongoDB Atlas cluster created and configured
- [ ] Database user created with proper permissions
- [ ] Network access configured (IP whitelist)
- [ ] Backend deployed on Render
- [ ] Backend environment variables set
- [ ] Backend health check working
- [ ] Frontend deployed on Vercel
- [ ] Frontend environment variables set
- [ ] CORS configured correctly
- [ ] All features tested:
  - [ ] Create link
  - [ ] View dashboard
  - [ ] View stats
  - [ ] Delete link
  - [ ] Redirect works
  - [ ] 404 page works

## 📞 Support

If you encounter issues:
1. Check deployment logs in Render/Vercel dashboards
2. Check browser console for frontend errors
3. Test API endpoints directly with curl/Postman
4. Verify all environment variables are set correctly

## 🎉 Success!

Once everything is deployed and working:
- Share your Vercel frontend URL
- Share your GitHub repository URL
- Record a demo video showing all features

