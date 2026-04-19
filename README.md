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
[![SonarQube](https://img.shields.io/badge/SonarQube-A%20Rating-4E9BCD?style=flat-square&logo=sonarqube&logoColor=white)](https://www.sonarsource.com/products/sonarqube/)
[![Security Headers](https://img.shields.io/badge/Security%20Headers-A%20Grade-00C853?style=flat-square&logo=shield&logoColor=white)](https://securityheaders.com/)

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

## 🛡️ Code Quality & Security

HireFlow is audited against industry-standard tooling for code quality and HTTP security posture.

<div align="center">

| Tool | Grade | What was evaluated |
|------|-------|--------------------|
| **SonarQube** | 🟢 **A** | Code smells, bugs, vulnerabilities, duplications |
| **Security Headers** | 🟢 **A** | HTTP response headers (CSP, HSTS, X-Frame-Options, etc.) |

</div>

---

## ⚡ Performance Benchmarks

### 🔐 Login Endpoint — Redis Cache Load Test (Local Redis · No Rate Limit)

Load tested with **Autocannon** across four progressive phases.  
**647,117 successful logins · 0 errors · 100% success rate across all phases.**

> Redis session caching bypasses bcrypt on repeat logins — verified auth sessions are served directly from cache, reducing per-request cost from ~100ms (bcrypt) to sub-millisecond (Redis GET).

| Phase | Connections | Duration | Sent | 2xx ✅ | 4xx | 5xx | Avg RPS | Avg Latency | p99 Latency |
|-------|-------------|----------|------|--------|-----|-----|---------|-------------|-------------|
| 1️⃣ Warm-up | 20 | 15s | 29,791 | **29,791** | 0 | 0 | 1,986 | 9.57ms | 42ms |
| 2️⃣ Ramp-up | 50 | 30s | 1,41,683 | **1,41,683** | 0 | 0 | 4,723 | 10.09ms | 27ms |
| 3️⃣ Medium load | 100 | 45s | 1,98,387 | **1,98,387** | 0 | 0 | 4,409 | 22.21ms | 68ms |
| 4️⃣ High load | 200 | 60s | 2,77,256 | **2,77,256** | 0 | 0 | 4,622 | 42.8ms | 131ms |
| **Total** | — | **150s** | **6,47,117** | **6,47,117** | **0** | **0** | — | — | — |

---

### 📊 Throughput Comparison by Strategy

| Strategy | Successful Logins | Notes |
|----------|-------------------|-------|
| 🔴 With bcrypt (no cache) | ~15,000 | bcrypt ~100ms per hash, CPU bottleneck |
| 🟡 Redis cache (Upstash TLS) | ~300,000 | Network RTT + TLS overhead per request |
| 🟢 Redis cache (local) | **647,117** | Sub-ms lookup, zero network overhead |
| ⚡ Normal endpoint (no auth) | ~2,200,000 | Baseline — no bcrypt, no Redis |

> **How Redis achieves 647k logins:** After the first successful bcrypt verify, the session is cached in Redis with a 5-minute TTL. All subsequent login attempts within that window hit the cache directly — skipping both the database query and bcrypt — and return a fresh JWT in under 1ms.

---

### 🏆 Previous Benchmark (Upstash TLS · Production Redis)

Load tested with **Autocannon** across five progressive phases — 0 errors across all **12,827 total requests**.

| Phase | Requests | 2xx | 4xx | 5xx | Success Rate | Avg Latency |
|-------|----------|-----|-----|-----|-------------|-------------|
| 1️⃣ Warm-up | 752 | 752 | 0 | 0 | ✅ 100% | 391 ms |
| 2️⃣ Ramp-up | 1,523 | 1,523 | 0 | 0 | ✅ 100% | 960 ms |
| 3️⃣ Medium load | 1,294 | 1,294 | 0 | 0 | ✅ 100% | 3,409 ms |
| 4️⃣ High load | 1,523 | 1,523 | 0 | 0 | ✅ 100% | 7,491 ms |
| 5️⃣ Peak stress | 7,735 | 7,735 | 0 | 0 | ✅ 100% | 21,573 ms |

> **Note:** Latency increases at peak load are expected on Render's free tier due to shared resources and cold-start behaviour. Zero server errors were recorded across all phases.

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
![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white)
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
│         ┌───────────────────────────┼────────┐      │
│         │                           │        │      │
│  ┌──────▼──────┐  ┌─────────────────▼──┐  ┌─▼────┐ │
│  │MongoDB Atlas│  │    Cloudinary       │  │Sendg.│ │
│  │    Data     │  │   PDF Storage       │  │Email │ │
│  └─────────────┘  └─────────────────────┘  └──────┘ │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │         Redis (Upstash TLS / Local)          │   │
│  │   Login session cache · bcrypt bypass        │   │
│  │   300k RPS (Upstash) · 647k RPS (local)      │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
└─────────────────────────────────────────────────────┘
```

| Layer | Platform | Purpose |
|-------|----------|---------|
| **Frontend** | Vercel | Edge delivery, global CDN |
| **Backend** | Render | Persistent service, long-running AI tasks |
| **Cache** | Redis (Upstash / Local) | Login session cache, bcrypt bypass |

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

# ── Cache ────────────────────────────────────────
REDIS_URL=your_upstash_redis_url
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
