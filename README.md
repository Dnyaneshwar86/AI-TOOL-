# ShikshaSetu – Smart Learning Platform

Complete full-scale **Education Platform UI scaffold** designed for Indian learners:
- Class 8th–12th (State Board + CBSE)
- Competitive exams (MPSC, SSC, Banking, Police Bharti, Army Bharti)
- Marathi (default), Hindi and English

## Included website pages
- `index.html` – hero, CTA, features, testimonials, stats counter, app section, FAQ, footer
- `courses.html` – class/exam filters + instructor, duration, demo, price, ratings, enroll flow
- `mock-tests.html` – timer-based interface, chapter/full tests, auto-result cards, graph area
- `materials.html` – subject-wise notes with search, download, bookmark actions
- `live-classes.html` – schedule, join links, reminders, recording access
- `blog.html` – exam updates, study tips, motivation articles
- `scholarship.html` – govt schemes, eligibility checker, apply form
- `about.html` – mission/vision, founder story, impact
- `contact.html` – form, WhatsApp, email/phone, map embed
- `auth.html` – OTP login, email login, Google login
- `dashboard.html` – student dashboard modules and analytics chart
- `admin.html` – content, student, payment, affiliate and analytics operations
- `mobile-app.html` – Android/iOS ready app screen blueprint

## UX/UI highlights
- Blue + orange modern theme
- Mobile-first responsive layout
- Light/Dark mode toggle
- Marathi motivational quotes throughout pages
- Student-friendly minimal cards and flows

## Mobile app readiness
App screens mapped for:
- Splash
- Login/Signup
- Home dashboard
- Course listing
- Video player
- Mock test interface
- Result analytics
- Profile page

## Monetization + payments modeled in structure
- Monthly/yearly subscription
- One-time purchase
- Coupon, referral, affiliate systems
- UPI / Card / NetBanking / EMI (integration-ready placeholders)

## SEO / performance / PWA
- SEO meta tags and schema on home page
- `sitemap.xml`, `robots.txt`
- `manifest.json` + `sw.js` for PWA baseline

## Run locally
```bash
python3 -m http.server 4173 --bind 0.0.0.0
```
Open `http://127.0.0.1:4173`.


## Ready-to-copy AI Builder Prompt
- Use `MASTER_PROMPT.md` for the complete all-features website + app generation prompt.

## Preview QA Review
Run a quick local review for metadata and internal links:
```bash
python3 scripts/preview_review.py
```
Results summary is documented in `PREVIEW_REVIEW.md`.
