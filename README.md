# Gilgit Language Bridge (گلگت لینگویج برج)

A production-grade, full-stack multilingual regional translation platform bridging **Urdu**, **English**, **Shina (شینا)**, **Balti (بلتی)**, and **Burushaski (بروشسکی)** for the communities, students, emergency workers, and travelers of Gilgit-Baltistan.

---

## Key Highlights & Philosophy

- **Verified Phrase Dictionary (Zero AI Hallucinations)**: Built upon verified regional phrases rather than ungrounded generative predictions. For low-resource languages, accuracy and dialect trust are paramount.
- **Smart Suggestion Engine**: When an exact phrase is not in the database, the system runs fuzzy similarity matching (powered by `Fuse.js`) to recommend the closest verified expressions.
- **Community Dialect Moderation**: Users can flag pronunciation nuances, vocabulary shifts across neighboring valleys (e.g. Gilgit Shina vs. Chilas Shina, Skardu Balti vs. Khaplu Balti), and submit missing phrases for admin review.
- **Phonetic Audio Pronunciations**: Synthesizes authentic pronunciation guidance for each language.
- **Offline-Friendly Favourites & CSV History**: Bookmark life-saving emergency and hospital phrases for mountain journeys with zero connectivity.

---

## Technology Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React, Motion
- **Backend**: Node.js, Express.js, RESTful API architecture
- **Database**: MongoDB with Mongoose (Dual architecture: connects to external MongoDB if `MONGODB_URI` is provided, with an automatic resilient in-memory/JSON fallback so it runs instantly without external database setup)
- **Authentication**: JSON Web Tokens (JWT) with bcrypt password hashing
- **NLP & Search**: Fuse.js fuzzy text matcher

---

## Supported Regional Languages

| Language | Native Script | Spoken Regions | Linguistic Branch |
| :--- | :--- | :--- | :--- |
| **Shina** | شینا | Gilgit, Diamer (Chilas), Astore, Ghizer | Dardic (Indo-Aryan) |
| **Balti** | بلتی | Skardu, Shigar, Kharmang, Ghanche (Khaplu) | Tibetic (Sino-Tibetan) |
| **Burushaski** | بروشسکی | Hunza (Karimabad), Nagar, Yasin Valley | Language Isolate |
| **Urdu** | اردو | Lingua Franca throughout Northern Pakistan | Indo-Aryan |
| **English** | English | International trekking, tourism, administration | Germanic |

---

## Database Models

1. **User**: Name, email, bcrypt password hash, city, role (`user` | `admin`), favourites array, createdAt.
2. **Phrase**: `sourceText`, `sourceLanguage`, `translations` (`urdu`, `english`, `shina`, `balti`, `burushaski`), `category`, `pronunciations`, `pronunciationText`, `verified`, `createdBy`, `createdAt`, `updatedAt`.
3. **TranslationHistory**: User, source phrase, translated phrase, source language, target language, timestamp.
4. **TranslationRequest**: Requested text, source/target languages, user info, status (`pending`, `approved`, `rejected`), admin notes.
5. **TranslationReport**: Phrase ID, original phrase, current translation, issue description, reporter, status (`pending`, `reviewed`, `resolved`).
6. **Feedback**: User name, email, rating (1–5 stars), message, createdAt.

---

## API Endpoints

- `POST /api/auth/register` — Create user account
- `POST /api/auth/login` — Sign in and obtain JWT
- `GET /api/auth/profile` — Fetch authenticated user details
- `PUT /api/auth/profile` — Update name, city, or password
- `POST /api/translate` — Translate phrase (exact or fuzzy suggestions)
- `GET /api/phrases` — Browse dictionary with category & text filter
- `GET /api/phrases/search` — Fuzzy search across all 5 languages
- `GET /api/phrases/:id` — Single phrase details
- `POST /api/phrases` — Add verified phrase (Admin)
- `PUT /api/phrases/:id` — Update phrase (Admin)
- `DELETE /api/phrases/:id` — Delete phrase (Admin)
- `GET /api/history` — Get translation activity
- `GET /api/history/export` — Export history as formatted CSV
- `DELETE /api/history` — Clear history
- `GET /api/favourites` — Retrieve bookmarked phrases
- `POST /api/favourites/:id` — Toggle favourite state
- `POST /api/translation-requests` — Submit phrase translation request
- `GET /api/translation-requests` — List user & pending requests
- `PUT /api/translation-requests/:id` — Update request status (Admin)
- `POST /api/reports` — Report incorrect translation
- `GET /api/reports` — List dialect correction reports (Admin)
- `PUT /api/reports/:id` — Resolve or review report (Admin)
- `GET /api/feedback` — Fetch community review testimonials
- `POST /api/feedback` — Submit community review
- `GET /api/admin/dashboard` — Platform overview metrics & activity
- `GET /api/admin/users` — User management (Admin)
- `PUT /api/admin/users/:id/role` — Promote/demote role (Admin)

---

## Demo Credentials (For Testing & Evaluation)

Use the fast login shortcuts on the login page or enter these directly:

### 1. Administrator Account
- **Email**: `admin@gilgitbridge.pk`
- **Password**: `AdminGilgit2026!`
- **Access**: Full administrative console, user role management, phrase editing, request approval, and report resolution.

### 2. Standard User Account
- **Email**: `user@gilgitbridge.pk`
- **Password**: `UserGilgit2026!`
- **Access**: User profile, saved favorites, translation history, and dialect requests.

---

## Local Development in VS Code

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- Optional: Local or cloud **MongoDB** instance (if not provided, an in-memory/JSON store runs automatically).

### Step-by-Step Run Instructions

1. **Clone or Open the Project Folder in VS Code**:
   ```bash
   cd gilgit-language-bridge
   ```

2. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   *(Optional)* If you have MongoDB running locally:
   ```env
   MONGODB_URI="mongodb://localhost:27017/gilgit_language_bridge"
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Start the Unified Full-Stack Application**:
   ```bash
   npm run dev
   ```
   This launches Express with integrated Vite dev middleware on `http://localhost:3000`.

5. **Production Build & Execution**:
   ```bash
   npm run build
   npm start
   ```

Open your browser at `http://localhost:3000` to interact with **Gilgit Language Bridge**.
