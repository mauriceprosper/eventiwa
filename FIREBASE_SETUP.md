# Firebase Setup for Eventiwa

## Project Details
- **Project ID**: eventiwa
- **Project Name**: eventiwa
- **Project Number**: 191301819852

## What's connected

### Admin Dashboard (admin/index.html)
- Reads and writes to Firestore collections: `brands`, `jobs`, `halls`
- Auth gate checks for email: `mauriceprosper1@gmail.com`
- All operations are real-time (changes show immediately)

### Public Portals (jobs/, halls/, shop/)
- Read data from Firestore: `brands`, `jobs`, `halls` collections
- Display live data with working filters

## Firestore Collections

### `brands`
```javascript
{
  name: "Royal Dainties",
  tagline: "Luxury event decoration in Lagos",
  type: "Decorators",
  state: "Lagos",
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### `jobs`
```javascript
{
  title: "Senior Event Planner",
  vendor: "Royal Dainties",
  type: "Full-time",
  brandType: "Event planners",
  state: "Lagos",
  postedAt: "7/4/2026",
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### `halls`
```javascript
{
  name: "Grand Monarch Hall",
  state: "Lagos",
  capacity: 500,
  priceFrom: 450000,  // null if price omitted
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### `users` (for vendor signups; optional)
```javascript
{
  email: "vendor@example.com",
  vendorName: "Royal Dainties",
  type: "Decorators",
  state: "Lagos",
  status: "pending", // or "approved", "rejected"
  createdAt: timestamp
}
```

## Firestore Security Rules

Paste these into Firestore Console > Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public collections: everyone can read, only admin can write
    match /brands/{document=**} {
      allow read: if true;
      allow write: if request.auth.token.email == "mauriceprosper1@gmail.com";
    }
    match /halls/{document=**} {
      allow read: if true;
      allow write: if request.auth.token.email == "mauriceprosper1@gmail.com";
    }
    match /jobs/{document=**} {
      allow read: if true;
      allow write: if request.auth.token.email == "mauriceprosper1@gmail.com";
    }
    
    // User signups: authenticated users can create their own, admin can read all
    match /users/{userId} {
      allow create: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth.token.email == "mauriceprosper1@gmail.com";
      allow update: if request.auth.token.email == "mauriceprosper1@gmail.com";
    }
    
    // Default: deny all
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## Setup Steps

1. **Firebase Console** — Go to https://console.firebase.google.com/project/eventiwa
2. **Firestore Database** — Create collections manually or through the admin dashboard
3. **Security Rules** — Copy the rules above into the Rules tab
4. **Enable Email/Password Auth** (optional) — If you want real Firebase Auth instead of email prompt:
   - Go to Authentication > Sign-in method
   - Enable Email/Password
   - Create a user for mauriceprosper1@gmail.com
5. **Custom Claims** (production) — Use Firebase Admin SDK to set `admin: true` claim on mauriceprosper1@gmail.com account

## How to Seed Data

1. Open `/admin/` and answer the email prompt with `mauriceprosper1@gmail.com`
2. Click "Event brands" → "Add brand" to add vendors
3. Click "Halls" → "Add hall" to add event spaces
4. Click "Jobs" → "Post a job" to post job listings
5. All data immediately appears in the public portals (jobs/, halls/, shop/)

## Next Steps

- Update the public portals (jobs/index.html, halls/index.html, shop/index.html) to read live Firestore data instead of static arrays
- Implement real Firebase Auth for the admin gate
- Add vendor signup flow that writes to the `users` collection for approval
- Set up Cloud Functions for email notifications when events happen (new booking request, job posted, etc.)
