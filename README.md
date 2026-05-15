# Vibe Music App 🎵

**Vibe** is an AI-driven diagnostic engine that translates your current mood, activity, and tempo into mathematically optimized playlists. By combining a custom machine-learning database with the Last.fm global API, it delivers hyper-personalized, real-time track recommendations.

---

## 🧠 Hybrid Ensemble Model (Dual-Brain Architecture)

This application uses a sophisticated **hybrid pipeline** that balances offline machine learning with real-time global music discovery.

### 🧩 Brain 1: Internal AI Engine (`pgvector`)
A foundational dataset of over **53,000 songs** was pre-processed using:

- NLP lyric sentiment analysis
- Audio feature scaling
- Vector embedding generation

The system converts every track into a **6-dimensional vector embedding** for mathematical similarity matching.

When a user requests a vibe, the PostgreSQL backend uses:

- `pgvector`
- HNSW indexing
- Cosine similarity search

to retrieve highly accurate matches within milliseconds.

---

### 🌍 Brain 2: Global Discovery Engine (Last.fm API)

To provide fresh and trending recommendations, the best internal match is used as a **seed track** for the Last.fm API.

The application then combines:

- Internal AI-generated matches
- External Last.fm recommendations

to create a balanced **3 + 3 hybrid recommendation dashboard**.

---

# ✨ Key Features

## 🎯 6D Vector Matching
Transforms subjective emotions into a mathematical vector array:

```txt
[popularity, tempo, energy, valence, danceability, sentiment]
```

This allows highly precise recommendation querying.

---

## ⚡ Real-Time Diagnostic Engine

Interactive recommendation engine capable of generating tracks based on:

- User mood
- Tempo
- Genres
- Activities
- Emotional sentiment

---

## 🔐 Secure Data Management

Includes full CRUD functionality with:

- JWT Authentication
- Row Level Security (RLS)
- Personalized user profiles
- Saved music libraries

---

## 🎨 Dynamic Theming

Built-in dark/light mode support using:

- Tailwind CSS
- React Context API

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- Context API

## Backend
- Supabase
- PostgreSQL
- JWT Authentication
- Supabase Auth Services

## AI & Database
- `pgvector`
- HNSW Indexing
- Custom RPC Functions

## Machine Learning (Offline Processing)
- Python
- Google Colab
- Scikit-learn
- NLP Sentiment Analysis

## External APIs
- Last.fm API (Music Recommendations)
- YouTube API (Playback Redirects)

## Deployment
- Vercel

---

# 🚀 Setup & Installation

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/vibe-music-app.git
cd vibe-music-app
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_LASTFM_API_KEY=your_lastfm_api_key
```

> **Note:**  
> This application uses the Last.fm API to ensure free developer access without premium paywalls.

---

## 4️⃣ Run the Development Server

```bash
npm run dev
```

---

# 🏗️ System Architecture & Constraints

## 🎵 Discovery-Only Platform
Vibe functions strictly as a **music discovery and recommendation engine**.

The platform does **not** host or stream audio files directly.  
Instead, users are redirected to external platforms such as YouTube for playback.

---

## 🧮 Pre-Computed Embeddings

The machine learning model is **not trained continuously in real time**.

All embeddings are:

- Pre-computed offline
- Stored in the database
- Queried using mathematical similarity search

This design significantly improves performance and scalability.

---

# 👥 Authors

- Joebert Zarate
- Venz Arthur N. Torregosa
