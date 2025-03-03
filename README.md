# React + TypeScript + Vite

# 🏫 Teacher Management System

Bu loyiha **o‘qituvchilarni ro‘yxatga olish, tahrirlash, filtrlash va yuzni tanib olish tizimini** o‘z ichiga oladi.  
Admin panel orqali o‘qituvchilarni boshqarish va rasm ma’lumotlarini ko‘rish mumkin.

---

## 🚀 Foydalanilgan texnologiyalar

- **Frontend:** React (TypeScript), Vite, Bootstrap  
- **Backend:** Mavjud API
- **Yuzni tanib olish:** OpenCV (backend API orqali)  

---

## 🎯 Loyihaning maqsadi

- O‘qituvchilarni tizimga ro‘yxatga olish  
- O‘qituvchilarning ma’lumotlarini tahrirlash va o‘chirish  
- Rasm yuklash va yuzni tanib olish imkoniyati  
- Admin panel orqali o‘qituvchilarni boshqarish  

---

## 🛠 Loyihani ishga tushirish

**1️⃣ Talablar:**  
- **Node.js v18+** (yoki yangiroq)  
- **NPM yoki Yarn**  

**2️⃣ Loyihani klonlash va bog‘liqliklarni o‘rnatish**  
```bash
git clone https://github.com/JavoxirJava/teacher-register.git
cd teacher-register
npm install
```

## 🚀 Deploy qilish

### **Netlify orqali**
1. [Netlify](https://www.netlify.com/) hisobiga kiring  
2. "New site from Git" orqali loyihani yuklang  
3. **"Build Command"**: `npm run build`  
4. **"Publish Directory"**: `dist`  
5. Deploy tugmasini bosing  

### **Vercel orqali**
1. [Vercel](https://vercel.com/) hisobiga kiring  
2. "New Project" orqali GitHub loyihangizni yuklang  
3. **"Build Command"**: `npm run build`  
4. **"Output Directory"**: `dist`  
5. Deploy tugmasini bosing  

### **Linux VPS (NGINX) orqali**
1. **Serverga ulaning:**  
   ```bash
   ssh user@your-server-ip

2. **Loyihani yuklab oling va build qiling:**
```bash
cd /var/www
git clone https://github.com/YOUR_GITHUB/teacher-management.git
cd teacher-management
npm install
npm run build
```

3. **NGINX sozlamalarini o‘rnating (/etc/nginx/sites-available/default):**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/teacher-management/dist;
    index index.html;
    location / {
        try_files $uri /index.html;
    }
}
```

4. **NGINX-ni qayta yuklash:**
```bash
sudo systemctl restart nginx
```

### **CPanel orqali**
1. **CPanel-ga kiring va public_html papkasiga o‘ting.**
2. **dist/ papkasidagi barcha fayllarni ZIP qilib yuklang va Extract qiling.**
3. **.htaccess fayliga quyidagi kodni qo‘shing:**
```perl
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```
✅ **Endi loyiha https://your-domain.com da ishlaydi!**

✅ **Tugatgandan so‘ng, sizning loyiha tayyor!**  
