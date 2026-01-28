# 📝 Momentum

Momentum is a modern, offline-capable note-taking app where each user can securely manage their own notes.

---

## 🚀 Features

- **Google login (OAuth 2.0)**  
- **User-specific notes only**  
- **Create, update, delete notes**  
- **Tags & note expiration** (24h, 3d, 7d, never)  
- **Offline support with cached data**  
- **Responsive design** for desktop & mobile  

---

## 🔐 Authentication

- Users must log in via Google  
- Sessions validated with `/api/me`  
- **Online:** shows Google login modal if not authenticated  
- **Offline:** requires internet to log in  

---

## 🌐 Tech Stack

**Frontend:** React, TypeScript, Vite, Tailwind, PWA  
**Backend:** Node.js, Express, MongoDB, Passport.js (Google OAuth), Express Session  

---

## 🎯 Purpose

Practice secure, user-specific data handling, offline-first logic, and real-world frontend–backend integration.
