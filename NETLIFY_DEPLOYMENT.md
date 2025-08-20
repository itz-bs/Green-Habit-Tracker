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
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

**⚠️ Important**: Copy the actual values from your local `.env` file

## ✅ Ready to Deploy!

Your app is now configured for Netlify deployment. Choose your preferred method above and deploy!