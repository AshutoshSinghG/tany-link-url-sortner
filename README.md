# TinyLink - URL Shortener

A full-stack MERN application for shortening URLs, similar to Bit.ly. Built with production-quality code and ready for deployment.

## 🎯 Overview

TinyLink allows users to:
- Create short links from long URLs
- Use custom shortcodes or auto-generated ones
- Track click statistics
- View detailed analytics
- Manage links through a clean dashboard

## 🚀 Live Demo

- **Frontend:** [Deploy on Vercel](https://tany-link-url-sortner.onrender.com)
- **Backend:** [Deploy on Render](https://tany-link-url-sortner.vercel.app/)

## 🛠 Tech Stack

### Backend
- **Runtime:** Node.js (v18+)
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Validation:** validator.js

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router v6
- **Styling:** TailwindCSS
- **HTTP Client:** Axios

## 📁 Project Structure

```
TinyLink/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   └── linkController.js
│   │   ├── middleware/
│   │   │   ├── errorHandler.js
│   │   │   └── validateLink.js
│   │   ├── models/
│   │   │   └── Link.js
│   │   ├── routes/
│   │   │   └── linkRoutes.js
│   │   ├── utils/
│   │   │   ├── shortcodeGenerator.js
│   │   │   └── urlValidator.js
│   │   └── server.js
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Header.jsx
    │   │   ├── AddLinkForm.jsx
    │   │   ├── LinkTable.jsx
    │   │   └── Loader.jsx
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   └── StatsPage.jsx
    │   ├── utils/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── package.json
    └── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js v18 or higher
- MongoDB Atlas account (free tier works)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```
   Edit `.env` and add your MongoDB connection string:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tinylink
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start the server:**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

   Server runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```
   Edit `.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

   App opens at `http://localhost:5173`

## 📡 API Documentation

### Health Check
```
GET /healthz
```
Returns server status.

### Create Link
```
POST /api/links
Body: { "target": "https://example.com", "code": "optional" }
```

### Get All Links
```
GET /api/links
```

### Get Link Stats
```
GET /api/links/:code
```

### Delete Link
```
DELETE /api/links/:code
```

### Redirect
```
GET /:code
```
Redirects to target URL (302).

See [backend/README.md](./backend/README.md) for detailed API documentation.

## 🚢 Deployment

### Backend on Render

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Set environment variables:
   - `MONGODB_URI`
   - `NODE_ENV=production`
   - `FRONTEND_URL` (your Vercel URL)
5. Deploy

See [backend/README.md](./backend/README.md) for detailed instructions.

### Frontend on Vercel

1. Push code to GitHub
2. Import project on Vercel
3. Set environment variable:
   - `VITE_API_BASE_URL` (your Render backend URL)
4. Deploy

See [frontend/README.md](./frontend/README.md) for detailed instructions.

## 🎥 Demo Video Recording

### REcorded Video

1. **Demo Video Link:** [Click heare](https://obsproject.com)

### Video Content Checklist

- ✅ Show dashboard with links
- ✅ Create a new link (with custom code)
- ✅ Create a link (auto-generated code)
- ✅ View link statistics
- ✅ Copy short URL
- ✅ Test redirect functionality
- ✅ Delete a link
- ✅ Show 404 page for non-existent link
- ✅ Show responsive design (mobile view)

## ✨ Features

- ✅ Create short links with custom or auto-generated codes
- ✅ Redirect short URLs to original URLs
- ✅ Track click statistics (total clicks, last clicked)
- ✅ View detailed analytics per link
- ✅ Delete links
- ✅ Search/filter links
- ✅ Copy short URLs to clipboard
- ✅ Responsive design
- ✅ Clean, modern UI
- ✅ Error handling and validation
- ✅ Health check endpoint

## 📝 License

ISC

## 👨‍💻 Development

### Backend Development
```bash
cd backend
npm run dev  # Auto-reload on changes
```

### Frontend Development
```bash
cd frontend
npm run dev  # Vite dev server with HMR
```

## 🤝 Contributing

This is a take-home assignment project. For production use, consider:
- Adding user authentication
- Rate limiting
- Analytics dashboard
- Custom domains
- QR code generation
- Link expiration dates

