# ST. NORBERT'S SCHOOL ERP

A comprehensive, production-ready School Management System designed to streamline academic operations, communication, and administration.

---

## 🌟 Key Features

- **Dynamic Dashboard**: Personalized views for Admins, Teachers, Students, and Parents.
- **Real-Time Communication**: Integrated database-backed messaging system with auto-refresh and secure role-based filtering.
- **Academic Management**: Full CRUD for Classes, Lessons, Exams, Assignments, and Results.
- **Financial Module**: Integrated fee tracking and payroll management.
- **Smart Classroom**: Digital study materials and virtual classroom links.
- **High-End UI/UX**: Modern, responsive design with premium aesthetics (Glassmorphism, clean typography).
- **Security**: Robust JWT-based authentication and role-based access control (RBAC).

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 (App Router), Tailwind CSS
- **Backend**: Next.js Server Actions, MongoDB Atlas
- **ORM**: Prisma
- **Authentication**: Custom JWT with `jose`
- **Media**: Cloudinary for institutional file storage
- **Payments**: Razorpay Integration

---

## 🚀 Getting Started

### 1. Environment Configuration
Create a `.env` file in the root directory and add your production credentials:

```env
DATABASE_URL="your_mongodb_atlas_url"
AUTH_SECRET="your_secure_secret"

NEXT_PUBLIC_SCHOOL_NAME="ST. NORBERT'S SCHOOL"
NEXT_PUBLIC_SCHOOL_SLOGAN="Imparting modern education, instilling high ideals."

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_secret"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="educore_preset"

RAZORPAY_KEY_ID="your_razorpay_id"
RAZORPAY_KEY_SECRET="your_razorpay_secret"
```

### 2. Installation
```bash
npm install
npx prisma generate
npx prisma db push
```

### 3. Run Development Server
```bash
npm run dev
```

---

## 👨‍💻 Developed By
**Verve Nova Technologies Pvt Ltd**
[https://vervenovatech.com/](https://vervenovatech.com/)

---

## 📜 License
© 2024 ST. NORBERT'S SCHOOL. All rights reserved. Proprietary software developed by Verve Nova Technologies.