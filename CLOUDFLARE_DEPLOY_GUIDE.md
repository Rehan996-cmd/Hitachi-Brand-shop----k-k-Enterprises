# ⚡ Cloudflare Pages Live Deployment Guide (Hindi & English)

Yeh guide aapko aapki website ko **Cloudflare Pages** par 100% free, ultra-fast global CDN aur free lifetime SSL (`https://`) ke sath live deploy karne ka aasan tarika batati hai.

---

## 🌟 3 Aasan Tarike (Choose Any One)

---

### 🚀 Method 1: Wrangler CLI se Direct 1-Click Deploy (Sabse Tez & Recommended)

Aap apne terminal se direct Cloudflare par website publish kar sakte hain:

#### Step 1: Cloudflare mein Login Karein
Terminal mein yeh command run karein:
```bash
npx wrangler login
```
*(Aapka default browser open hoga, Cloudflare account login karein aur **"Allow"** par click karein).*

#### Step 2: Website Deploy Karein
Login hone ke baad, yeh command run karein:
```bash
npx wrangler pages deploy public --project-name=hotel-shivansh
```
*(Agar pehli baar poochhe ki project create karna hai ya nahi, toh `y` dabakar Enter karein).*

#### Step 3: Live Website Ready!
Sirf 10-15 seconds mein aapko aapki live website ka link mil jayega:
👉 `https://hotel-shivansh.pages.dev`

---

### 🖱️ Method 2: Cloudflare Dashboard Direct Drag & Drop (Bina kisi Command ke)

Agar aap terminal use nahi karna chahte, toh seedha folder drag & drop karke live kar sakte hain:

1. [dash.cloudflare.com](https://dash.cloudflare.com) par free account banayein ya login karein.
2. Left sidebar mein **"Workers & Pages"** par click karein.
3. **"Create application"** button dabayein, fir **"Pages"** tab select karein.
4. **"Upload assets"** par click karein.
5. Project Name daalein: `hotel-shivansh` (ya apni pasand ka koi bhi naam).
6. File Explorer se `c:\Users\Rehan Jatu\Downloads\jack\public` folder ko drag karke drop karein.
7. **"Deploy site"** par click karein!
8. Turant aapki site live ho jayegi free SSL ke sath.

---

### 🔄 Method 3: GitHub Automatic Continuous Deployment (CI/CD)

Agar aap code GitHub par rakhte hain aur har update par auto-deploy chahte hain:

1. Apne code ko GitHub repository mein push karein:
   ```bash
   git add .
   git commit -m "Deploy to Cloudflare Pages"
   git push origin main
   ```
2. [Cloudflare Dashboard](https://dash.cloudflare.com) par jayein:
   - **Workers & Pages** ➔ **Create application** ➔ **Pages** ➔ **Connect to Git**
3. Apna GitHub account aur repository select karein.
4. Build Settings enter karein:
   - **Framework preset:** `None`
   - **Build output directory:** `public`
   - **Root directory:** `/`
5. **"Save and Deploy"** par click karein!
6. Ab jab bhi aap GitHub par naya code push karenge, Cloudflare automatic nayi website live kar dega.

---

## 🔒 Custom Domain Kaise Jodein (Optional)
Agar aapka apna domain hai (jaise `hotelshivansh.com` ya `myhotel.in`):
1. Cloudflare Pages project ke **Custom Domains** tab par jayein.
2. **"Set up a custom domain"** click karein.
3. Apna domain type karein — Cloudflare automatic free SSL certificate generate kar dega!
