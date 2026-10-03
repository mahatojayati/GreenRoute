````
# 📁 Project Architecture & File Structure


# 🏗️ Project Structure

```text
smart_waste_management/
│
├── design_guidelines.json          # UI design system, colors, typography & component rules
│
├── backend/                        # Flask Backend
│   ├── .env                        # Backend environment variables
│   ├── requirements.txt            # Python dependencies
│   └── server.py                   # Main Flask server
│
└── frontend/                       # React Frontend
    ├── .env                        # Frontend environment variables
    ├── package.json                # Project metadata & npm packages
    ├── tailwind.config.js          # Tailwind CSS configuration
    ├── postcss.config.js           # PostCSS configuration
    │
    ├── public/
    │   └── index.html              # Root HTML file
    │
    └── src/
        ├── index.js                # React entry point
        ├── index.css               # Global styles
        ├── App.js                  # Root application component
        │
        └── components/
            ├── Navbar.js               # Top navigation bar
            ├── Sidebar.js              # Dashboard sidebar navigation
            ├── HeroSection.js          # Landing page hero section
            ├── BentoGrid.js            # Dashboard overview cards
            ├── BinsManager.js          # Smart waste bin management
            ├── CollectionScheduler.js  # Waste collection scheduling
            ├── RecyclingAnalytics.js   # Recycling statistics & analytics
            ├── EducationHub.js         # Educational resources
            ├── SupportChatDrawer.js    # AI support chat interface
            └── AlertsManager.js        # Notifications and alerts
```

---

# 📂 Folder Overview

## Root Directory

Contains project-wide files and configuration.

| File | Purpose |
|-------|----------|
| `design_guidelines.json` | Defines the application's design language, including colors, typography, spacing, and UI standards. |

---

## Backend (`backend/`)

Built using **Flask (Python)**.

| File | Purpose |
|-------|----------|
| `.env` | Stores API keys and environment variables. |
| `requirements.txt` | Lists all Python dependencies. |
| `server.py` | Main Flask application and API server. |

---

## Frontend (`frontend/`)

Built using **React.js** and **Tailwind CSS**.

### Configuration Files

| File | Purpose |
|-------|----------|
| `.env` | Frontend environment variables |
| `package.json` | Project configuration and npm dependencies |
| `tailwind.config.js` | Tailwind CSS customization |
| `postcss.config.js` | PostCSS processing configuration |

---

### Public Folder

Contains static assets served directly by the web server.

| File | Purpose |
|-------|----------|
| `index.html` | Root HTML page for the React application |

---

### Source Code (`src/`)

Contains the main application logic.

| File | Purpose |
|-------|----------|
| `index.js` | React application entry point |
| `index.css` | Global styling |
| `App.js` | Root component that renders the application |

---

## Components (`src/components/`)

Each file represents a reusable UI module.

| Component | Description |
|------------|-------------|
| `Navbar.js` | Top navigation bar |
| `Sidebar.js` | Dashboard navigation menu |
| `HeroSection.js` | Landing page introduction |
| `BentoGrid.js` | Dashboard summary cards |
| `BinsManager.js` | Manage smart waste bins |
| `CollectionScheduler.js` | Schedule waste collection |
| `RecyclingAnalytics.js` | Display recycling insights and charts |
| `EducationHub.js` | Sustainability learning resources |
| `SupportChatDrawer.js` | AI-powered support chat |
| `AlertsManager.js` | Notifications and alert management |

---

# 🛠 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- PostCSS

### Backend
- Python
- Flask

### Configuration
- Environment Variables (`.env`)
- JSON Design Guidelines

---

# 🚀 High-Level Architecture

```text
                User
                  │
                  ▼
          React Frontend
                  │
          REST API Requests
                  │
                  ▼
           Flask Backend
                  │
      Business Logic & APIs
                  │
                  ▼
     Database / External Services
```
````
