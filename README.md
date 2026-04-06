<div align="center">

<!-- BANNER SVG -->
<img src="https://readme-typing-svg.demolab.com?font=DM+Mono&size=13&pause=1000&color=63B3ED&center=true&vCenter=true&width=435&lines=Intelligent+AI+Recruitment+Ecosystem;Powered+by+Google+Gemini+%C2%B7+MERN+Stack" alt="Typing SVG" />

# <img src="./logo.svg" width="46" height="46" valign="middle" /> &nbsp;HireFlow

**A professional-grade MERN application that revolutionizes the hiring process.**  
Resume analysis powered by Google Gemini AI · Automated workflows via SendGrid · Hybrid Cloud Architecture.

<br/>

[![Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=flat-square&logo=render&logoColor=white)](https://render.com/)
[![Gemini](https://img.shields.io/badge/AI-Google_Gemini-4285F4?style=flat-square&logo=googlegemini&logoColor=white)](https://deepmind.google/technologies/gemini/)
[![BetterStack](https://img.shields.io/badge/Logging-BetterStack-6ad1ff?style=flat-square&logo=loggy&logoColor=white)](https://betterstack.com/)

<br/>

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-hire--flow--alpha.vercel.app-63B3ED?style=for-the-badge)](https://hire-flow-alpha.vercel.app)

</div>

---

## 🧪 Test Credentials

> Try the platform instantly — no signup needed.

<div align="center">

| Role | Email | Password |
|------|-------|----------|
| 🔑 **Admin** | `admin@hireflow.demo` | `Admin123!` |
| 👤 **Candidate** | `candidate@hireflow.demo` | `Candidate123!` |

</div>

---

## ✨ Core Features

<table>
<tr>
<td width="50%">

### 🤖 AI Intelligence
**Google Gemini Pro**
- Automated resume scoring (0–100)
- Actionable candidate feedback
- Instant relevance analysis per job

</td>
<td width="50%">

### 📧 Automated Workflow
**SendGrid Integration**
- Status change email notifications
- Shortlist, Interview & Offer triggers
- Zero manual outreach needed

</td>
</tr>
<tr>
<td width="50%">

### 👩‍💼 Admin Infrastructure
**Pipeline Management**
- Visual hiring funnel
- Candidate status tracking
- Dynamic job listing manager

</td>
<td width="50%">

### 🔒 Security First
**Enterprise-grade Auth**
- JWT Access + Refresh Tokens
- HttpOnly Cookies
- Helmet, Rate Limiting, Bcryptjs

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<details open>
<summary><strong>Frontend</strong></summary>
<br/>

![React](https://img.shields.io/badge/React.js_(Vite)-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)
![Lottie](https://img.shields.io/badge/Lottie_Animations-00DDB3?style=flat-square)

</details>

<details open>
<summary><strong>Backend</strong></summary>
<br/>

![Node](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongodb&logoColor=white)
![Multer](https://img.shields.io/badge/Multer_(Memory_Storage)-FF6B35?style=flat-square)

</details>

<details open>
<summary><strong>Persistence & Services</strong></summary>
<br/>

![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white)
![BetterStack](https://img.shields.io/badge/BetterStack_Logs-6ad1ff?style=flat-square)
![SendGrid](https://img.shields.io/badge/SendGrid-1A82E2?style=flat-square&logo=twilio&logoColor=white)

</details>

---

## 🌎 Hybrid Cloud Architecture

```
┌─────────────────────────────────────────────────────┐
│                   HireFlow Ecosystem                 │
│                                                      │
│  ┌─────────────┐       ┌─────────────────────────┐  │
│  │   Vercel    │◄─────►│        Render           │  │
│  │  Frontend   │  API  │   Backend (Node.js)     │  │
│  │  React/Vite │       │   + Gemini AI Tasks     │  │
│  └─────────────┘       └────────────┬────────────┘  │
│                                     │               │
│              ┌──────────────────────┼────────┐      │
│              │                      │        │      │
│      ┌───────▼──────┐  ┌────────────▼──┐  ┌─▼────┐ │
│      │ MongoDB Atlas│  │  Cloudinary   │  │Sendg.│ │
│      │     Data     │  │  PDF Storage  │  │Email │ │
│      └──────────────┘  └───────────────┘  └──────┘ │
│                                                      │
└─────────────────────────────────────────────────────┘
```

| Layer | Platform | Purpose |
|-------|----------|---------|
| **Frontend** | Vercel | Edge delivery, global CDN |
| **Backend** | Render | Persistent service, long-running AI tasks |

---

## 🚀 Installation

```bash
# Backend
cd Server && npm install
node index.js

# Frontend (new terminal)
cd Frontend && npm install
npm run dev
```

---

## ⚙️ Environment Configuration

Create a `.env` file inside the `Server/` folder:

```env
# ── Server ──────────────────────────────────────
PORT=3001
NODE_ENV=production
MONGO_URI=your_mongodb_uri
FRONTEND_URL=https://your-app.vercel.app

# ── Security ─────────────────────────────────────
ACCESS_SECRET_KEY=your_access_secret
REFRESH_SECRET_KEY=your_refresh_secret

# ── AI & Email ───────────────────────────────────
GEMINI_API_KEY=your_gemini_key
SENDGRID_API_KEY=your_sendgrid_key
SENDGRID_FROM=verified@email.com

# ── Storage & Logs ───────────────────────────────
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
LOGTAIL_SOURCE_TOKEN=your_logtail_token
```

> **Tip:** Use `.env.example` as a template. It's already set up for you in the repo.

---

## 👤 Author

<div align="center">

<img src="https://github.com/ASHALAN777.png" width="80" style="border-radius:50%" />

**Alan**  
[![GitHub](https://img.shields.io/badge/GitHub-ASHALAN777-181717?style=flat-square&logo=github)](https://github.com/ASHALAN777)

</div>

---

## ⚠️ Security Notice

> The `.env` file is listed in `.gitignore`.  
> **Never commit real API keys to GitHub.**  
> Always use the provided `.env.example` template for new deployments.

---

<div align="center">

Made with ☕ by [Alan](https://github.com/ASHALAN777) · MIT License

</div>
