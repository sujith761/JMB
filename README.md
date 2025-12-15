# JMB – Online Fabric Bleaching & Dyeing Booking Platform

Production-ready MERN stack app with client, admin, server, Razorpay payments, PDF reports, and MongoDB.

## 📋 Prerequisites

- Node.js 16+
- MongoDB Atlas account (cluster created)
- Razorpay test account (optional for testing payments)

## 🚀 Quick Start

### 1. Environment Setup

Edit `JVM-Bleaching-Dyeing/.env`:
```
PORT=5000
MONGODB_URI=mongodb+srv://sujithcs:SUJITHCS09@cluster0.rskwzyd.mongodb.net/
MONGODB_DB=jmb
JWT_SECRET=super_secret_change_me
RAZORPAY_KEY_ID=your_test_key_id
RAZORPAY_KEY_SECRET=your_test_key_secret
CLIENT_URL=http://localhost:5173,http://localhost:5174
```

**IMPORTANT:** Whitelist your IP in MongoDB Atlas:
1. Go to Network Access
2. Add IP Address → Your Current IP (or 0.0.0.0/0 for dev)
3. Confirm changes

### 2. Server (API)
```
cd JVM-Bleaching-Dyeing/server
npm install
npm run seed        # Seed sample products + admin user
npm run dev         # Start server on port 5000
```

Server runs on **http://localhost:5000**. You should see `MongoDB connected` in console.

### 3. Client (User Website)
```
cd JVM-Bleaching-Dyeing/client
npm install
npm run dev         # Start on http://localhost:5173
```

### 4. Admin Dashboard
```
cd JVM-Bleaching-Dyeing/admin
npm install
npm run dev         # Start on http://localhost:5174
```

## 🔐 Default Credentials

**Admin Login:**
- Email: `admin@jmb.com`
- Password: `Admin@123`

(From seed.js; change in MongoDB after first login)

## 📱 Features

### Client (User Site)
- ✅ Public pages: Home, Services, Why JMB, Products, About, Careers, Contact
- ✅ User auth: Register, Login, Logout
- ✅ Quick booking flow: Select process (bleach/dye) → fabric → quantity → duration → vehicle # → notes
- ✅ Razorpay payment integration (test mode)
- ✅ Booking confirmation & status tracking
- ✅ Contact form submission
- ✅ Protected route: Only logged-in users can book

### Admin Dashboard
- ✅ **Login:** JWT-based admin authentication
- ✅ **Dashboard:** Stats (total bookings, revenue, pending orders)
- ✅ **Products:** Add/Edit/Delete bleaching & dyeing chemicals with rates
- ✅ **Bookings:** View all bookings, filter by status, update status (pending→processing→completed)
- ✅ **Transactions:** View all payments, download daily/monthly PDF reports
- ✅ **Messages:** View customer contact submissions, reply to messages
- ✅ Protected: All admin routes require login

## 🧪 Testing Flow

### 1. Seed Data
Server seed creates:
- 8 products (4 bleaching, 4 dyeing)
- 1 admin user (`admin@jmb.com` / `Admin@123`)

### 2. Register User (Client)
```
http://localhost:5173/register
Name: Test User
Email: test@example.com
Company: Test Corp
Password: Test@123
```

### 3. Book Fabric (Client)
```
http://localhost:5173/booking
- Select: Bleaching or Dyeing
- Fabric: Cotton/Silk/Wool
- Product: Pick chemical (auto-loads by process type)
- Quantity: 100 meters
- Duration: 24/48/72 hours
- Vehicle: ABC-1234
- Notes: Any sensitivity/specs
- Click "Proceed to Payment"
```

### 4. Razorpay Test Payment (if keys set)
Use test cards:
- Card: 4111111111111111
- Expiry: Any future date
- CVV: Any 3 digits
- OTP: 123456

Without real keys, mock the payment flow manually.

### 5. Admin Dashboard
```
http://localhost:5174/admin/login
Email: admin@jmb.com
Password: Admin@123
```

- View dashboard stats
- Manage products (add/edit/delete)
- View bookings, update status
- View payments, download PDF
- Reply to customer messages

## 📦 Project Structure

```
JVM-Bleaching-Dyeing/
├── .env                 # Root env with DB + Razorpay keys
├── server/
│   ├── controllers/     # Auth, products, bookings, payments, reports
│   ├── models/          # User, Admin, Product, Booking, Payment, ContactMessage
│   ├── routes/          # API endpoints
│   ├── middleware/      # JWT auth middleware
│   ├── server.js        # Express entrypoint
│   ├── seed.js          # Database seeding script
│   └── package.json
├── client/
│   ├── src/
│   │   ├── pages/       # Home, Services, Products, Booking, Login, etc.
│   │   ├── components/  # Navbar, Footer, ProtectedRoute
│   │   ├── services/    # axios API client
│   │   ├── context/     # AuthContext for user login
│   │   ├── App.jsx      # Router with protected routes
│   │   └── index.css    # Tailwind directives
│   ├── .env             # VITE_API_URL=http://localhost:5000/api
│   └── package.json
└── admin/
    ├── src/
    │   ├── pages/       # AdminDashboard, ProductsPage, BookingsPage, etc.
    │   ├── components/  # AdminSidebar, AdminTopbar, ProtectedRoute
    │   ├── services/    # axios API client
    │   ├── context/     # AdminAuthContext
    │   ├── App.jsx      # Admin router
    │   └── index.css    # Tailwind directives
    ├── .env             # VITE_API_URL=http://localhost:5000/api
    └── package.json
```

## 🔧 API Endpoints

### Auth
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/admin/login` - Admin login

### Products
- `GET /api/products` - List all products (filter by ?processType=bleaching|dyeing)
- `POST /api/products` - Add product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Bookings
- `POST /api/bookings` - Create booking (user must be authenticated)
- `GET /api/bookings/my` - Get user's bookings
- `GET /api/admin/bookings` - List all bookings (admin only)
- `PUT /api/bookings/:id/status` - Update booking status (admin only)

### Payments
- `POST /api/payments/order` - Create Razorpay order
- `POST /api/payments/verify` - Verify payment signature
- `GET /api/admin/payments` - List all payments (admin only)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/admin/messages` - Get all messages (admin only)
- `POST /api/admin/messages/:id/reply` - Reply to message (admin only)

### Reports
- `GET /api/reports/transactions?range=daily|monthly` - Download PDF report (admin only)

## 🎨 Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | React 18 + Vite |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |
| Payments | Razorpay |
| Styling | Tailwind CSS |
| API Calls | Axios |
| Routing | React Router v6 |
| PDF Export | PDFKit |

## ⚠️ Known Issues & Fixes

### "MongoDB connection error: IP not whitelisted"
→ Whitelist your IP in Atlas Network Access

### "Login failed" (Admin or User)
→ Ensure server is running and responds to `http://localhost:5000`
→ Check browser console (F12) for CORS or network errors
→ Verify API URL in client/.env and admin/.env

### "Port 5000 already in use"
→ Change PORT in .env or kill process: `lsof -ti:5000 | xargs kill -9`

### "Module not found" errors
→ Run `npm install` in each folder (server, client, admin)
→ Clear node_modules and npm cache if issues persist: `rm -rf node_modules package-lock.json && npm install`

## 🚀 Deployment Ready

All apps are configured for easy deployment:

**Vercel / Netlify (Client & Admin):**
```bash
npm run build
# Deploy dist/ folder
```

**Railway / Render / Heroku (Server):**
```bash
npm start
```

## 📝 Next Steps

1. ✅ Add Cloudinary file upload for product images
2. ✅ Enhance UI with more animations & responsiveness
3. ✅ Add email notifications (confirmation, status updates)
4. ✅ Implement real Razorpay webhook verification
5. ✅ Add user profile & booking history
6. ✅ Mobile app (React Native)

## 📞 Support

For issues or questions, check:
- Server logs: `npm run dev` output
- Browser console: F12 → Console tab
- Network tab: F12 → Network tab (check API calls)
- MongoDB Atlas logs

---

**Built with ❤️ for textile industry digitization**
