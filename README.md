<div align="center">

<!-- BANNER SVG -->
<img src="https://readme-typing-svg.demolab.com?font=DM+Mono&size=13&pause=1000&color=63B3ED&center=true&vCenter=true&width=435&lines=High-Performance+AI+Recruitment+Ecosystem;Security-Audited+·+Battle-Tested+·+MERN" alt="Typing SVG" />

# <img src="./logo.svg" width="46" height="46" valign="middle" /> &nbsp;HireFlow

**A production-grade recruitment engine designed for high-concurrency and audited security.**  
Optimized with Redis · Load-tested to 12,000+ requests · SonarCloud Security 'A' Rated.

<br/>

[![SonarCloud Security Rating](https://img.shields.io/badge/SonarCloud-Security_A-brightgreen?style=for-the-badge&logo=sonarcloud)](https://sonarcloud.io/)
[![SecurityHeaders Grade](https://img.shields.io/badge/SecurityHeaders-Grade_A-brightgreen?style=for-the-badge)](https://securityheaders.com/)
[![Redis](https://img.shields.io/badge/Caching-Upstash_Redis-FF4438?style=for-the-badge&logo=redis&logoColor=white)](https://upstash.com/)

<br/>

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-hire--flow--alpha.vercel.app-63B3ED?style=for-the-badge)](https://hire-flow-alpha.vercel.app)

</div>

---

## 🛡️ Professional Security Audit (The "Security A" Flex)

I prioritized user data protection by passing a professional security audit using **SonarCloud** and **SecurityHeaders**.

- **NoSQL Injection Mitigation:** Refactored database queries to include strict **Mongoose ObjectId validation** and input sanitization, protecting the system against unauthorized data access via query injection.
- **SonarCloud Verified:** Achieved a **"Grade A" Security Rating** with 0.0% code duplication.
- **Secure Authentication:** Implemented **HTTP-only and Secure cookies** for JWT storage, making the system immune to XSS-based token theft.
- **Hardened Headers:** Achieved a **"Grade A"** rating on SecurityHeaders.com by implementing `helmet.js` and a strict Content Security Policy (CSP).

---

## 🚀 Performance Optimization (Redis Caching)

HireFlow is optimized for high-speed session management, reducing infrastructure costs and improving UX.

- **Distributed Caching:** Integrated **Redis** to cache user sessions and password hashes, bypassing the primary database for 90% of auth checks.
- **Latency Reduction:** API response times for authenticated routes were reduced from **250ms to <200ms** (20% improvement).
- **Cache-Aside Pattern:** Implemented an automated fallback logic to MongoDB on cache misses to ensure data integrity.

---

## 📊 Battle-Tested Scalability (Autocannon)

The authentication system was stress-tested using **Autocannon** to simulate real-world traffic spikes:

| Metric | Result |
|-------|-------------|
| **Total Successful Logins** | 12,827+ (Single Cycle) |
| **Success Rate** | 🟢 100.0% (Zero Errors) |
| **Concurrency** | 500+ Concurrent Connections |
| **Stability** | 0% Server Crashes under extreme CPU load |

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

### ⚡ Distributed Cache
**Upstash Redis**
- Sub-ms session lookups
- Reduced MongoDB I/O pressure
- Real-time session invalidation

</td>
<td width="50%">

### 🔒 Enterprise Security
**Layered Protection**
- JWT Access + Refresh Tokens
- NoSQL Injection Mitigation
- OWASP-compliant middleware

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

**Persistence & Caching**  
![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white)

**Backend Core**  
![Node](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=flat-square&logo=JSON%20web%20tokens)

---

## 👤 Author

<div align="center">

<img src="https://github.com/ASHALAN777.png" width="80" style="border-radius:50%" />

**Alan**  
[![GitHub](https://img.shields.io/badge/GitHub-ASHALAN777-181717?style=flat-square&logo=github)](https://github.com/ASHALAN777)

</div>

---

<div align="center">

Made with ☕ by [Alan](https://github.com/ASHALAN777) · MIT License

</div>
