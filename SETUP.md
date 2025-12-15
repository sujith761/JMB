# JMB Setup & Testing Guide

## Step-by-Step Setup

### Step 1: MongoDB Atlas IP Whitelist ⚠️ CRITICAL

**This is required for the app to work!**

1. Go to: https://cloud.mongodb.com/
2. Login to your account
3. Navigate to: **Network Access** (left sidebar)
4. Click: **+ Add IP Address**
5. Choose one option:
   - **For Development:** Enter your current IP (check: https://www.whatismyipaddress.com/)
   - **For Quick Testing:** Enter `0.0.0.0/0` (allows all IPs - not for production!)
6. Click **Confirm**
7. Wait 1-2 minutes for Atlas to apply changes

### Step 2: Clone & Install Dependencies

```bash
# From project root
cd JVM-Bleaching-Dyeing/server
npm install

cd ../client
npm install

cd ../admin
npm install --legacy-peer-deps
```

### Step 3: Configure Environment Variables

Edit `.env` file in `JVM-Bleaching-Dyeing/` folder:

```env
PORT=5000
MONGODB_URI=mongodb+srv://sujithcs:SUJITHCS09@cluster0.rskwzyd.mongodb.net/
MONGODB_DB=jmb
JWT_SECRET=super_secret_key_change_in_production
RAZORPAY_KEY_ID=rzp_test_xxxx
RAZORPAY_KEY_SECRET=secret_xxxx
CLIENT_URL=http://localhost:5173,http://localhost:5174
```

**Note:** Keep the MongoDB URI exactly as provided. For Razorpay keys, leave as-is for test mode.

### Step 4: Seed Database

Run from `server/` folder:

```bash
cd server
npm run seed
```

**Expected Output:**
```
Seed complete
```

This creates:
- 8 sample products (bleaching & dyeing chemicals)
- 1 admin user: `admin@jmb.com` / `Admin@123`

### Step 5: Start All Three Apps (in separate terminals)

**Terminal 1 - Server (API):**
```bash
cd JVM-Bleaching-Dyeing/server
npm run dev
```

Expected: `Server running on port 5000` & `MongoDB connected`

**Terminal 2 - Client (User Site):**
```bash
cd JVM-Bleaching-Dyeing/client
npm run dev
```

Expected: `VITE v5.x.x  ready in XXX ms`

**Terminal 3 - Admin Dashboard:**
```bash
cd JVM-Bleaching-Dyeing/admin
npm run dev
```

Expected: `VITE v5.x.x  ready in XXX ms`

### Step 6: Test the Full Flow

#### A. User Registration & Booking

1. Open: **http://localhost:5173** (Client)
2. Click **Sign Up** (top right)
3. Fill in:
   - Name: `John Doe`
   - Email: `john@example.com`
   - Company: `ABC Textiles`
   - Password: `Test@123`
4. Click **Create Account**
5. You'll auto-login and redirect to home
6. Click **Book Processing** button
7. Fill booking form:
   - Process Type: `Bleaching`
   - Fabric Type: `Cotton`
   - Product: `Hydrogen Peroxide - ₹25/meter` (auto-loaded)
   - Quantity: `100` meters
   - Duration: `48 hours`
   - Vehicle Number: `ABC-1234`
   - Notes: `Standard cotton`
8. Click **Proceed to Payment**
9. Razorpay popup appears (test mode)
   - Use test card: `4111 1111 1111 1111`
   - Expiry: Any future date (e.g., `12/25`)
   - CVV: `123`
   - OTP: `123456`
10. Payment should succeed → **Booking confirmed!**

#### B. Admin Dashboard

1. Open: **http://localhost:5174/admin/login** (Admin)
2. Login:
   - Email: `admin@jmb.com`
   - Password: `Admin@123`
3. You'll see **Dashboard** with stats:
   - Total Bookings: `1`
   - Total Revenue: `₹2500` (100m × ₹25)
   - Pending Orders: `1`

4. Click **Products** (left sidebar):
   - See 8 products (4 bleaching, 4 dyeing)
   - Try: Add new product, Edit, Delete

5. Click **Bookings**:
   - See the booking you just created
   - Try changing status: pending → processing → completed
   - Filter by status

6. Click **Transactions**:
   - See the payment
   - Try: **Download Daily PDF** & **Download Monthly PDF**
   - PDF should have transaction details

7. Click **Messages**:
   - If empty (no messages yet)
   - Go to client, fill Contact form, refresh here

#### C. Contact Form Test

1. Client: http://localhost:5173/contact
2. Fill:
   - Name: `Jane`
   - Email: `jane@test.com`
   - Phone: `9876543210`
   - Message: `Great service!`
3. Click **Send Message**
4. Go to Admin → Messages
5. You'll see the message
6. Click **Reply** and send response

---

## Troubleshooting

### Issue: "MongoDB connection error: IP not whitelisted"

**Solution:** Whitelist your IP in Atlas Network Access (see Step 1)

### Issue: "Login failed" (Admin or Client)

**Checklist:**
- [ ] Is server running? (check Terminal 1 for `Server running on port 5000`)
- [ ] Is MongoDB connected? (check Terminal 1 for `MongoDB connected`)
- [ ] Are credentials correct?
  - Admin: `admin@jmb.com` / `Admin@123`
  - User: Use one you registered
- [ ] Check browser console (F12 → Console) for errors
- [ ] Check Network tab (F12 → Network) for API call status

### Issue: "Cannot find module 'react-router-dom'"

**Solution:**
```bash
cd client
npm install react-router-dom
cd ../admin
npm install react-router-dom
```

### Issue: Tailwind CSS not showing (styles look broken)

**Solution:**
```bash
# In client folder
npm install -D tailwindcss postcss autoprefixer

# In admin folder
npm install -D tailwindcss postcss autoprefixer
```

### Issue: Port 5000 already in use

**Solution (Windows):**
```powershell
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Solution (Mac/Linux):**
```bash
lsof -ti:5000 | xargs kill -9
```

### Issue: Razorpay popup not appearing on payment

**Possible causes:**
- Razorpay keys not set (uses test mode, still works)
- Browser popup blocked (check address bar for popup icon)
- API call failed (check Network tab in F12)

**Workaround:** Complete flow anyway, mock payment success manually for testing

---

## Key Endpoints to Test

### API Base: `http://localhost:5000/api`

```bash
# Get all products
curl http://localhost:5000/api/products

# Get bleaching products only
curl http://localhost:5000/api/products?processType=bleaching

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test","email":"test@test.com","password":"Test@123","company":"Corp"
  }'
```

---

## Success Criteria

✅ **Setup Complete When:**

- [ ] Server starts without errors
- [ ] MongoDB shows connected
- [ ] Client loads at http://localhost:5173
- [ ] Admin loads at http://localhost:5174
- [ ] Can register & login as user
- [ ] Can create & pay for booking
- [ ] Can login to admin & see booking
- [ ] Can update booking status
- [ ] Can download PDF report

---

## Next Features (Optional)

- [ ] Image upload for products (Cloudinary)
- [ ] Email notifications (SendGrid/Nodemailer)
- [ ] SMS alerts (Twilio)
- [ ] User booking history page
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Payment webhook verification
- [ ] Multi-language support

---

## Support

**If stuck:**

1. Check all three terminal outputs for errors
2. Check browser console (F12)
3. Check Network tab for API errors (F12)
4. Ensure .env has correct MongoDB URI
5. Ensure IP is whitelisted in MongoDB Atlas
6. Try: `npm cache clean --force && npm install`

---

**You're all set! Happy testing! 🚀**
