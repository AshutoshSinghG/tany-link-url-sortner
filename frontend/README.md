# TinyLink Frontend

A modern, responsive React application for managing and viewing URL shortener statistics.

## 🚀 Features

- **Dashboard** - View all short links in a searchable table
- **Create Links** - Generate short links with custom or auto-generated codes
- **Link Statistics** - View detailed stats for individual links
- **Delete Links** - Remove links with confirmation
- **Copy to Clipboard** - One-click copy of short URLs
- **Responsive Design** - Works on desktop and mobile devices
- **Real-time Updates** - Automatic refresh after create/delete operations

## 🛠 Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router v6
- **Styling:** TailwindCSS
- **HTTP Client:** Axios

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navigation header
│   │   ├── AddLinkForm.jsx     # Form to create new links
│   │   ├── LinkTable.jsx       # Table displaying all links
│   │   └── Loader.jsx          # Loading spinner
│   ├── pages/
│   │   ├── Dashboard.jsx       # Main dashboard page
│   │   └── StatsPage.jsx       # Individual link stats page
│   ├── utils/
│   │   └── api.js              # API client functions
│   ├── App.jsx                 # Main app component with routing
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

## 🔧 Environment Variables

Create a `.env` file in the frontend root directory:

```env
VITE_API_BASE_URL=http://localhost:5000
```

For production, set this to your deployed backend URL (e.g., `https://tinylink-backend.onrender.com`).

See `env.example` for template. Copy it to `.env` and fill in your values.

## 🏃 Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env
   # Edit .env with your backend API URL
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   The app will automatically open at `http://localhost:5173`

## 🏗 Building for Production

1. **Build the app:**
   ```bash
   npm run build
   ```

2. **Preview the production build:**
   ```bash
   npm run preview
   ```

The build output will be in the `dist/` directory.

## 🚢 Deployment on Vercel

### Prerequisites
- Vercel account
- GitHub repository with your code

### Steps

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset:** Vite
     - **Root Directory:** `frontend` (if monorepo) or leave blank if frontend is root
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
     - **Install Command:** `npm install`

3. **Set Environment Variables:**
   - Go to Project Settings → Environment Variables
   - Add: `VITE_API_BASE_URL` = `https://your-backend-url.onrender.com`

4. **Deploy:**
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - Your app will be available at: `https://your-project.vercel.app`

### Vercel Configuration

Vercel automatically detects Vite projects. The default settings should work, but you can also create a `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

## 📱 Pages

### Dashboard (`/`)
- Displays all short links in a table
- Form to create new links
- Search/filter functionality
- Delete links with confirmation
- Copy short URLs to clipboard
- View stats button for each link

### Stats Page (`/code/:code`)
- Shows detailed statistics for a single link
- Displays:
  - Short code
  - Short URL (clickable)
  - Original URL (clickable)
  - Total clicks
  - Last clicked timestamp
  - Created at timestamp
- 404 page if link doesn't exist

## 🎨 UI Features

- **Clean Design** - Modern, minimal interface
- **Responsive** - Mobile-friendly layout
- **Loading States** - Spinners during API calls
- **Error Handling** - User-friendly error messages
- **Success Feedback** - Confirmation messages
- **Empty States** - Helpful messages when no data
- **Truncated URLs** - Long URLs are truncated with tooltips
- **Copy Functionality** - One-click copy to clipboard

## 🔗 API Integration

The frontend communicates with the backend API through the `api.js` utility:

- `createLink(target, code)` - Create new short link
- `getAllLinks()` - Fetch all links
- `getLinkStats(code)` - Get stats for a link
- `deleteLink(code)` - Delete a link
- `getShortUrl(code)` - Get full short URL

All API calls use Axios and handle errors gracefully.

## 📝 Notes

- The app uses React Router for client-side routing
- All API calls are async and show loading states
- Error messages are displayed inline
- Short URLs are automatically generated if no custom code is provided
- The app automatically refreshes after create/delete operations

## 🧪 Testing

Test the frontend by:

1. Creating links with and without custom codes
2. Viewing the dashboard table
3. Searching/filtering links
4. Copying short URLs
5. Viewing individual link stats
6. Deleting links
7. Testing 404 page for non-existent links

## 📄 License

ISC

