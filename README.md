🚀 HireFlow - Intelligent AI Recruitment Ecosystem

HireFlow is a professional-grade MERN application that revolutionizes the hiring process. By integrating Google Gemini AI for resume analysis, SendGrid for automated communication, and a Hybrid Cloud Architecture, HireFlow provides a stable, scalable, and intelligent hiring experience.

![alt text](https://img.shields.io/badge/Container-Docker-2496ED?style=flat-square&logo=docker)


![alt text](https://img.shields.io/badge/Frontend-Vercel-black?style=flat-square&logo=vercel)


![alt text](https://img.shields.io/badge/Backend-Render-46E3B7?style=flat-square&logo=render)


![alt text](https://img.shields.io/badge/AI-Google_Gemini-blue?style=flat-square&logo=googlegemini)


![alt text](https://img.shields.io/badge/Logging-BetterStack-6ad1ff?style=flat-square&logo=loggy)

🧪 Live Demo & Testing Credentials

Experience the platform immediately using these pre-configured test accounts:

Role	Email Address	Password
Admin	admin@hireflow.demo	Admin123!
Candidate	candidate@hireflow.demo	Candidate123!

Live Site: https://hire-flow-alpha.vercel.app

✨ Core Features
🤖 AI Intelligence (Google Gemini Pro)

Automated Resume Scoring: Every application is processed by Gemini AI to generate a relevance score (0-100).

Actionable Feedback: Candidates receive specific, AI-generated advice on resume improvement.

📧 Automated Workflow (SendGrid)

Status Notifications: Candidates receive automated emails when their application status changes (Shortlisted, Interview, etc.).

👩‍💼 Admin Infrastructure

Pipeline Management: Track candidates through a professional hiring funnel.

Dynamic Job Manager: Create and manage job listings with a responsive interface.

🛠️ The Tech Stack

Frontend: React.js (Vite), Tailwind CSS, Axios, Context API, Lottie Animations.

Backend: Node.js, Express.js, Mongoose, Multer (Memory Storage).

Security: JWT (Access/Refresh Tokens), HttpOnly Cookies, Bcryptjs, Helmet, Rate Limiting.

Persistence: MongoDB Atlas (Data), Cloudinary (PDFs), BetterStack (Cloud Logs).

🌎 Hybrid Cloud Architecture

HireFlow utilizes a professional hybrid strategy to bypass common cloud limitations:

Frontend (Vercel): Optimized for static delivery and global edge performance.

Backend (Render): Deployed as a persistent Web Service to handle long-running AI tasks and stable database connections.

Dockerization: The entire ecosystem is containerized for "run-anywhere" portability and environment parity.

🚀 Installation & Setup
Option A: Docker (Recommended)

The fastest way to get HireFlow running locally with a single command:

code
Bash
download
content_copy
expand_less
# 1. Clone the repo
git clone https://github.com/ASHALAN777/HireFlow-.git

# 2. Setup your .env files (Use .env.example as a guide)

# 3. Boot up the entire ecosystem
docker-compose up --build
Option B: Manual Installation
code
Bash
download
content_copy
expand_less
# Setup Backend
cd Server && npm install
node index.js

# Setup Frontend
cd Frontend && npm install
npm run dev
⚙️ Environment Configuration

Create a .env file in the Server folder with these keys:

code
Env
download
content_copy
expand_less
PORT=3001
NODE_ENV=production
MONGO_URI=your_mongodb_uri
FRONTEND_URL=https://your-app.vercel.app

# Security
ACCESS_SECRET_KEY=your_key
REFRESH_SECRET_KEY=your_key

# AI & Services
GEMINI_API_KEY=your_gemini_key
SENDGRID_API_KEY=your_sendgrid_key
SENDGRID_FROM=verified@email.com

# Storage & Logs
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
LOGTAIL_SOURCE_TOKEN=your_token

👤 Author

Alan
GitHub Profile

⚠️ Security Notice

The .env file is included in .gitignore. Never commit your real API keys to GitHub. Use the provided .env.example template for new deployments.
