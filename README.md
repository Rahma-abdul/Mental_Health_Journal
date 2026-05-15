# 🧠 Mental Health Journal

A full-stack web application that helps users track their emotional well-being through journaling, mood tracking, and AI-powered song recommendations using Google Gemini.

The system combines self-reflection tools + productivity tracking + AI personalization to create a structured mental wellness experience.

## ✨ Features
📝 Daily journal entries with mood tagging
📊 Mood tracking with visual history and patterns
✅ Todo list linked to daily emotional states
🎯 Monthly mood insights and tracking
🎵 AI-powered Spotify song recommendations (Gemini API)
🔐 Secure authentication (JWT-based)
📱 Responsive UI for desktop and mobile
🧱 Tech Stack

## Frontend
- React
- JavaScript (ES6+)
- CSS3

## Backend
- FastAPI (Python)
- SQLAlchemy ORM
- JWT Authentication

## Database
- PostgreSQL

## 🤖 AI Feature

The system uses Google Gemini API to:
- Analyze journal entries
- Detect emotional context
- Recommend personalized songs based on mood + text content

## 🏗️ System Architecture

The system follows a layered architecture:
- Frontend (React) → User interface and state management
- Backend (FastAPI) → Business logic and API layer
- Database (PostgreSQL) → Persistent storage
- External AI Service (Gemini API) → Mood-based recommendation engine

## 🔄 Data Flow

User → React UI → FastAPI → Service Layer → Database / Gemini API → Response → UI


## 📸 Screenshots

- Login/Signup Page
<img width="1920" height="1013" alt="Screenshot (79) (1)" src="https://github.com/user-attachments/assets/26010d07-5fad-487f-babe-db22b5c3c759" />

- Daily Journal Entry Page
<img width="1920" height="1017" alt="Screenshot (75) (1)" src="https://github.com/user-attachments/assets/c0fcc1d2-9b39-4819-bc6d-4a6abd2bc755" />

- Mood Tracker Dashboard
<img width="1920" height="1021" alt="Screenshot (77) (1)" src="https://github.com/user-attachments/assets/3500da07-867a-4812-b7df-74b44356dbd6" />

- Todo List View
<img width="1920" height="1021" alt="Screenshot (76) (1)" src="https://github.com/user-attachments/assets/3a1c9e6f-3350-4cfd-b038-2bdb983c5710" />

- History of Entries 
<img width="1920" height="1080" alt="Screenshot (624)" src="https://github.com/user-attachments/assets/5ee9c7ef-a265-401d-9aed-9917462fc977" />
