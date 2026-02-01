# Setup Checklist - What You Need to Do

## ✅ COMPLETED (Code Editing Done)
- [x] All backend routes registered in server.js
- [x] All controllers and services created
- [x] All validators and middlewares implemented
- [x] Admin dashboard pages complete
- [x] Frontend UI complete

---

## 🔧 YOUR TASKS - STEP BY STEP

### Step 1: Create Supabase Account & Project
1. Go to https://supabase.com
2. Sign up or log in
3. Create a new project (name it "keychain-ecommerce")
4. Choose a region closest to you
5. Set a strong database password and save it
6. Wait for the project to finish setting up (~2 minutes)

### Step 2: Get Your Credentials
1. In Supabase dashboard, go to **Settings → API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Anon Key** (under "Project API keys")
3. Keep these safe - you'll need them next

### Step 3: Update Environment Variables
1. Open `.env.local` in the root of your project
2. Add these two lines:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```
3. Save the file

### Step 4: Create Database Tables
1. In Supabase dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Open the file: `DATABASE_SETUP.md` in your project
4. Copy ALL the SQL code from that file
5. Paste it into the Supabase SQL Editor
6. Click **"Run"** to execute
7. Wait for it to complete (should take ~10 seconds)

### Step 5: Verify Tables Were Created
1. In Supabase, go to **Table Editor**
2. You should see these 9 tables:
   - users
   - products
   - orders
   - order_items
   - messages
   - newsletter
   - reviews
   - analytics_events
   - admin_logs
3. If all 9 tables appear, you're good!

### Step 6: Test the Backend Connection
1. Open terminal in your project folder
2. Run: `npm run dev`
3. Open another terminal and run:
```
curl http://localhost:5000/api/health
```
4. You should see: `{"status":"OK","timestamp":"..."}`

### Step 7: Test a Product API Call
Run this in terminal:
```
curl http://localhost:5000/api/products
```
You might get an empty array `[]` which is correct - no products yet, but database is connected!

### Step 8: Add Test Product (Optional)
In Supabase Table Editor:
1. Click on **products** table
2. Click **Insert row**
3. Add sample product data:
   - name: "Test Keychain"
   - description: "A test product"
   - price: 29.99
   - category: "keychains"
   - stock: 10

### Step 9: Refresh Frontend
1. Stop your development server (Ctrl+C)
2. Run: `npm run dev` again
3. Go to http://localhost:3000/products
4. You should see your test product!

---

## 📋 Quick Reference - What Each Backend Route Does

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/products` | GET | List all products |
| `/api/products` | POST | Create new product (admin) |
| `/api/products/:id` | PUT | Update product (admin) |
| `/api/products/:id` | DELETE | Delete product (admin) |
| `/api/auth/login` | POST | Login user |
| `/api/auth/register` | POST | Register new user |
| `/api/orders` | GET | Get user orders |
| `/api/orders` | POST | Create order |
| `/api/admin/stats` | GET | Get dashboard stats (admin) |
| `/api/newsletter/subscribe` | POST | Subscribe to newsletter |
| `/api/contact` | POST | Submit contact form |

---

## ⚠️ Important Notes

- **Don't commit .env.local** to git - your credentials are private!
- **Backend must run** on port 5000 while frontend runs on 3000
- If you see CORS errors, the backend isn't running
- If products don't show, database isn't connected yet
- Admin login credentials: `admin@keychain.com` / `admin123`

---

## 🆘 Troubleshooting

### Frontend shows "Error loading products"
→ Backend not running. Run `npm run dev` in a separate terminal

### Blank page on admin dashboard
→ .env.local missing Supabase credentials (Step 3)

### Database tables not showing in Supabase
→ SQL didn't execute properly. Try running it again (Step 4)

### "Cannot GET /api/products" error
→ Backend routes not registered. You already fixed this! Restart server.

---

## ✨ After Setup is Complete

Once all steps are done, your ecommerce site will be:
- ✅ Connected to Supabase database
- ✅ Admin dashboard fully functional
- ✅ Products saved in real database
- ✅ Orders tracked in database
- ✅ Customer messages stored
- ✅ Newsletter subscribers managed

Then you can:
1. Add real products
2. Enable payments (Stripe/PayPal)
3. Set up email notifications
4. Configure image uploads to cloud storage
5. Deploy to production

---

**Estimated time to complete: 15-20 minutes**

Need help? Check DATABASE_SETUP.md or BACKEND_SETUP.md for more details.
