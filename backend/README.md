# TinyLink Backend API

A production-ready URL shortening service built with Node.js, Express, and MongoDB.

## 🚀 Features

- Create short links with custom or auto-generated shortcodes
- Redirect short URLs to original URLs
- Track click statistics (total clicks, last clicked timestamp)
- Delete links
- RESTful API with proper HTTP status codes
- Health check endpoint

## 🛠 Tech Stack

- **Runtime:** Node.js (v18+)
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Validation:** validator.js

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   └── linkController.js    # Business logic
│   ├── middleware/
│   │   ├── errorHandler.js      # Global error handler
│   │   └── validateLink.js      # Request validation
│   ├── models/
│   │   └── Link.js              # Mongoose schema
│   ├── routes/
│   │   └── linkRoutes.js        # API routes
│   ├── utils/
│   │   ├── shortcodeGenerator.js # Generate random codes
│   │   └── urlValidator.js      # URL validation
│   └── server.js                # Entry point
├── .env.example                 # Environment variables template
├── package.json
└── README.md
```

## 📡 API Routes

### Health Check
```
GET /healthz
```
Returns server status and version.

**Response:**
```json
{
  "ok": true,
  "version": "1.0"
}
```

### Create Link
```
POST /api/links
```

**Request Body:**
```json
{
  "target": "https://example.com",
  "code": "custom1" // optional
}
```

**Response (201 Created):**
```json
{
  "code": "custom1",
  "target": "https://example.com",
  "totalClicks": 0,
  "lastClicked": null,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Responses:**
- `400 Bad Request` - Invalid URL or shortcode format
- `409 Conflict` - Shortcode already exists

### Get All Links
```
GET /api/links
```

**Response (200 OK):**
```json
[
  {
    "code": "abc123",
    "target": "https://example.com",
    "totalClicks": 42,
    "lastClicked": "2024-01-01T12:00:00.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### Get Link Stats
```
GET /api/links/:code
```

**Response (200 OK):**
```json
{
  "code": "abc123",
  "target": "https://example.com",
  "totalClicks": 42,
  "lastClicked": "2024-01-01T12:00:00.000Z",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Response:**
- `404 Not Found` - Link not found

### Delete Link
```
DELETE /api/links/:code
```

**Response (200 OK):**
```json
{
  "message": "Link deleted successfully"
}
```

**Error Response:**
- `404 Not Found` - Link not found

### Redirect
```
GET /:code
```

Redirects to the target URL with HTTP 302 status. Automatically increments click count and updates last clicked timestamp.

**Error Response:**
- `404 Not Found` - Link not found

## 🔧 Environment Variables

Create a `.env` file in the backend root directory:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tinylink?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

See `env.example` for template. Copy it to `.env` and fill in your values.

## 🏃 Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env
   # Edit .env with your MongoDB connection string
   ```

3. **Start the server:**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

4. **Server will run on:** `http://localhost:5000`

## 🚢 Deployment on Render

### Prerequisites
- MongoDB Atlas account (free tier works)
- Render account

### Steps

1. **Create MongoDB Atlas Cluster:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Create a database user
   - Whitelist IP addresses (or use `0.0.0.0/0` for Render)
   - Get connection string

2. **Deploy on Render:**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name:** tinylink-backend
     - **Environment:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Plan:** Free tier is fine

3. **Set Environment Variables in Render:**
   - `MONGODB_URI` - Your MongoDB Atlas connection string
   - `PORT` - Render sets this automatically (use `process.env.PORT`)
   - `NODE_ENV` - `production`
   - `FRONTEND_URL` - Your Vercel frontend URL

4. **Deploy:**
   - Click "Create Web Service"
   - Render will build and deploy automatically
   - Your API will be available at: `https://tinylink-backend.onrender.com`

### Render Configuration

Render automatically detects Node.js projects. Ensure your `package.json` has:
- `"type": "module"` for ES modules
- `"engines": { "node": ">=18.0.0" }`

## 📝 Notes

- Shortcodes are 6-8 alphanumeric characters
- Custom shortcodes must be globally unique
- URLs must include protocol (http:// or https://)
- Click tracking is automatic on redirect
- All timestamps are in ISO 8601 format

## 🧪 Testing

Test the API using curl or Postman:

```bash
# Health check
curl http://localhost:5000/healthz

# Create link
curl -X POST http://localhost:5000/api/links \
  -H "Content-Type: application/json" \
  -d '{"target": "https://example.com"}'

# Get all links
curl http://localhost:5000/api/links

# Redirect (will open in browser)
curl -L http://localhost:5000/abc123
```

## 📄 License

ISC

