# PC Parts Philippines (PERN Stack)

A full-stack application for comparing PC part prices from different retailers in the Philippines, building PCs, and checking component compatibility.

## Features

- Compare prices from different retailers
- Build your PC by selecting compatible components
- View price history and trends
- Responsive design for desktop and mobile
- Built with PERN Stack (PostgreSQL, Express, React, Node.js)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database

### Installation

1. Clone the repository:

```
git clone https://github.com/MylesLozano/pcpartsph.git
```

2. Install dependencies:

```
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

```
PORT=3000
NODE_ENV=development
PGHOST=your-db-host
PGDATABASE=pcpartsph
PGUSER=your-db-user
PGPASSWORD=your-db-password
```

### Running the Project

- Start the backend server:

```
npm run dev
```

- Start the frontend (in a separate terminal):

```
cd src
npm run dev
```

## Technology Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: PostgreSQL (via Neon.tech)
- **Deployment**: Render

## Project Structure

```
pcpartsph/
├── backend/              # Backend Express server
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── routes/           # API routes
│   └── server.js         # Server entry point
├── src/                  # Frontend React app
│   ├── assets/           # Static assets
│   ├── components/       # React components
│   ├── pages/            # Page components
│   └── utils/            # Utility functions
└── uploads/              # File uploads
```
