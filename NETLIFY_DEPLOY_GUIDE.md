# 🚀 Netlify Deployment Guide - Hotel Shivansh Website

Yeh guide aapko Hotel Shivansh ki Next.js 16 website ko Netlify par free mein deploy karne ka aasan aur complete process batati hai.

---

## 📁 1. Configured Netlify Files (Already Created)

Aapke project mein Netlify ke liye files create aur configure kar di gayi hain:
1. **[`netlify.toml`](./netlify.toml)** (Root directory config)
2. **[`nextjs-app/netlify.toml`](./nextjs-app/netlify.toml)** (Subdirectory fallback config)
3. **`@netlify/plugin-nextjs`** (`nextjs-app/package.json` mein installed hai)

---

## 🌐 2. Deployment Methods

### Method A: GitHub ke Zariye Deploy (Recommended & Sabse Aasan)

1. **Code Commit & Push Karein:**
   Terminal mein yeh commands run karein:
   ```bash
   git add .
   git commit -m "Deploy Hotel Shivansh Next.js app to Netlify"
   git push origin main
   ```

2. **Netlify Dashboard Par Jayein:**
   - [app.netlify.com](https://app.netlify.com) par login karein (GitHub account se).
   - **"Add new site"** button par click karein aur **"Import an existing project"** chunein.
   - **GitHub** select karein aur apna repository (`Hitachi-Brand-shop----k-k-Enterprises` ya Hotel Shivansh repo) choose karein.

3. **Build Settings Verify Karein (Auto-filled by netlify.toml):**
   - **Base directory:** `nextjs-app`
   - **Build command:** `npm run build`
   - **Publish directory:** `nextjs-app/.next`
   - **Node version:** `20`

4. **"Deploy Site" par click karein!**
   - 1 se 2 minute mein aapki website live ho jayegi aur aapko ek live public URL milega (jaise `https://hotel-shivansh-sikar.netlify.app`).

---

### Method B: Netlify CLI Se Direct Deploy (Terminal Se)

Agar aap bina GitHub ke seedha terminal se deploy karna chahte hain:

1. **Netlify CLI Login:**
   ```bash
   npx netlify login
   ```
   *(Browser open hoga, Netlify account mein "Authorize" click karein)*

2. **Deploy to Production:**
   ```bash
   npx netlify deploy --build --prod
   ```

3. Terminal aapse poochega:
   - *Create & configure a new site?* -> **Yes**
   - *Team?* -> Apna account select karein
   - *Site name?* -> `hotel-shivansh-sikar` (ya koi bhi unique naam)

Deploy complete hote hi Netlify aapko **Live Production URL** de dega!

---

## ⚙️ Environment & Features

- **Next.js Version:** 16.3.4 (App Router)
- **Plugin:** `@netlify/plugin-nextjs` (Serverless functions for API routes & image optimization)
- **100% Responsive:** Mobile, Tablet, Laptop, Desktop support
- **Justdial Ratings & Reviews:** Real 5.0 Star testimonials & verified badge
- **WhatsApp Direct Room Booking:** Active on `+91 94606 24455`
