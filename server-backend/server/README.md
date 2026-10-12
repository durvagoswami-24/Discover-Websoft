# Discover Websoft -- Backend API

Node.js + Express + MongoDB backend for the Discover Websoft storefront.
Handles customer auth, admin login, quotation submissions, and cart/wishlist sync.

## Setup

1. **Install dependencies**
   ```
   cd server
   npm install
   ```

2. **Create a MongoDB Atlas cluster** (free tier is plenty to start):
   - Go to https://www.mongodb.com/cloud/atlas, sign up, create a free (M0) cluster
   - Under "Database Access", create a database user with a password
   - Under "Network Access", allow your IP (or 0.0.0.0/0 for development)
   - Click "Connect" -> "Drivers" -> copy the connection string

3. **Create your `.env` file** from the example:
   ```
   cp .env.example .env
   ```
   Fill in:
   - `MONGO_URI` -- the connection string from step 2 (replace `<username>`/`<password>`/`<cluster-url>`)
   - `JWT_SECRET` / `ADMIN_JWT_SECRET` -- any two long random strings (these sign login tokens -- keep them secret, never commit `.env`)
   - `ADMIN_SECURITY_KEY` -- the password you want for the Admin Login panel
   - `CLIENT_URL` -- your frontend's URL (defaults to `http://localhost:5173`)

4. **Seed the admin login** (run once):
   ```
   npm run seed:admin
   ```
   This creates the one admin record in the database, using `ADMIN_SECURITY_KEY` from your `.env`.

5. **Run the server**
   ```
   npm run dev
   ```
   Starts on `http://localhost:5000` (or whatever `PORT` you set). Visit `http://localhost:5000/api/health` -- you should see `{"status":"ok"}`.

## API Reference

### Auth (customer)
| Method | Route | Auth | Body |
|---|---|---|---|
| POST | `/api/auth/register` | - | `{ name, email, phone, password }` |
| POST | `/api/auth/login` | - | `{ email, password }` |
| GET | `/api/auth/me` | Bearer token | - |

### Admin
| Method | Route | Auth | Body |
|---|---|---|---|
| POST | `/api/admin/login` | - | `{ securityKey }` |

### Quotations
| Method | Route | Auth | Body |
|---|---|---|---|
| POST | `/api/quotations` | - (public, works for guests) | see below |
| GET | `/api/quotations` | Admin token | - |
| GET | `/api/quotations/:id` | Admin token | - |
| PATCH | `/api/quotations/:id/status` | Admin token | `{ status }` |

Quotation submission body -- matches what `PlanPage.jsx`'s `quotationSelection`
state already holds, so the frontend can send it close to as-is:
```json
{
  "customerName": "...",
  "customerPhone": "...",
  "customerEmail": "...",
  "serviceSlug": "graphic-designing",
  "subServiceSlug": "billboard-design",
  "planSlug": "basic-billboard-design",
  "planName": "Basic Billboard Design",
  "quotationType": "quantity",
  "details": { "quantity": 3 },
  "subtotal": 10500,
  "cgst": 945,
  "sgst": 945,
  "grandTotal": 12390
}
```

### Cart & Wishlist (require a logged-in customer)
| Method | Route | Body |
|---|---|---|
| GET | `/api/cart` | - |
| PUT | `/api/cart` | `{ cart: [...] }` (full replace) |
| GET | `/api/wishlist` | - |
| PUT | `/api/wishlist` | `{ wishlist: [...] }` (full replace) |

Both cart and wishlist arrays use the same item shape your Redux slices
already produce (`serviceSlug`, `subServiceSlug`, `planSlug`, `quantity`),
so no reshaping is needed on the frontend side to sync them.

## Auth pattern

Every protected route expects:
```
Authorization: Bearer <token>
```
Customer tokens come from `/api/auth/login` or `/api/auth/register`.
Admin tokens come from `/api/admin/login`. They use **separate secrets**
(`JWT_SECRET` vs `ADMIN_JWT_SECRET`), so a customer token can never be
used on an admin route or vice versa.

## Not built yet (flagged, not forgotten)

- Mail integration (quote confirmation emails, T&C attachment) -- no
  mail service is wired in yet
- Rate limiting / brute-force protection on login routes
- Input validation is minimal (checks required fields exist, not full
  schema validation) -- fine for now, worth hardening before production
