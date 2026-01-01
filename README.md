# Milliy Sertifikat - Mock Test Platform

Complete mock test platform built with React, Node.js, and MongoDB.

## Features

- ✅ No login required
- ✅ Multiple choice questions (A, B, C, D)
- ✅ 20-50 questions per test
- ✅ Timer with auto-finish
- ✅ Split-screen layout (50/50)
- ✅ Async answer save with status
- ✅ Public/Private tests with 5-digit codes
- ✅ User ID generation (letters only)
- ✅ Multi-language support (Uzbek, Russian, English, Qoraqalpoq)
- ✅ Score calculation (no negative marking)
- ✅ Search functionality

## Local Setup

### Prerequisites
- Node.js 16+
- MongoDB running locally or Atlas connection string

### Backend

```bash
cd backend
npm install
npm run seed
npm run dev
```

Server runs on `http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs on `http://localhost:5173`

## Vercel Deployment

### Backend Deployment

1. Push code to GitHub
2. Go to https://vercel.com/new
3. Import `backend` directory
4. Set environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `FRONTEND_URL`: Your frontend Vercel URL
5. Deploy

### Frontend Deployment

1. Go to https://vercel.com/new
2. Import `frontend` directory
3. Set environment variables:
   - `VITE_API_URL`: Your backend Vercel URL (e.g., `https://backend.vercel.app/api`)
4. Deploy

### Environment Variables

**Backend (.env):**
