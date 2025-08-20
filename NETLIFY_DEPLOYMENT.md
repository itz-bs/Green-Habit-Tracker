# Netlify Deployment Guide

## 🚀 Quick Deploy Options

### Option 1: Drag & Drop (Fastest)
1. Run `npm run build` in your project directory
2. Go to [netlify.com](https://netlify.com) and sign up/login
3. Drag the `dist` folder to the deploy area
4. Your app will be live instantly!

### Option 2: Git Integration (Recommended)
1. Push your code to GitHub/GitLab
2. Go to [netlify.com](https://netlify.com) → "New site from Git"
3. Connect your repository
4. Build settings are auto-detected from `netlify.toml`
5. Deploy!

## ⚙️ Build Configuration

The following files have been created for Netlify:

- `netlify.toml` - Main configuration
- `_redirects` - SPA routing fallback

Build settings:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: Latest LTS

## 🔐 Environment Variables

Add these in Netlify dashboard → Site settings → Environment variables:

```
VITE_FIREBASE_API_KEY=AIzaSyDcLcOUKSSafk1q1vH_B27trDGltfyZ67o
VITE_FIREBASE_AUTH_DOMAIN=green-habit-tracker-4fc24.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=green-habit-tracker-4fc24
VITE_FIREBASE_STORAGE_BUCKET=green-habit-tracker-4fc24.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=487389779503
VITE_FIREBASE_APP_ID=1:487389779503:web:953bd02835e684bd8198da
VITE_FIREBASE_MEASUREMENT_ID=G-E93P5ET046
```

## ✅ Ready to Deploy!

Your app is now configured for Netlify deployment. Choose your preferred method above and deploy!