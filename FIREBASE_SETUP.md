# Firebase Setup Instructions

## 1. Enable Firestore Database
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: `green-habit-tracker-4fc24`
3. Click "Firestore Database" in the left sidebar
4. Click "Create database"
5. Choose "Start in test mode" for now
6. Select a location (choose closest to your users)

## 2. Enable Authentication
1. In Firebase Console, click "Authentication"
2. Go to "Sign-in method" tab
3. Enable "Email/Password" provider
4. Save changes

## 3. Security Rules (Optional - for production)
```javascript
// Firestore Security Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /habits/{habitId} {
      allow read, write: if request.auth != null && resource.data.userId == request.auth.uid;
    }
    match /challenges/{document=**} {
      allow read: if request.auth != null;
    }
  }
}
```

## 4. Install Dependencies
```bash
npm install
```

## 5. Start Development Server
```bash
npm run dev
```

Your Firebase backend is now ready to use!