# BwAI-Minna 2025

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16.0.0 or higher)
- npm (v7.0.0 or higher)
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/AbrahamAlgorithm/bwai-minna-2025.git
cd bwai-minna-2025
```

2. Install dependencies:
```bash
npm install
```

## Development

To start the development server:

```bash
npm run dev
```

This will start the application at `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
bwai-minna-2025-ui/
├── src/
│   ├── components/
│   │   ├── Main/
│   │   └── ...
│   ├── assets/
│   ├── context/
│   └── ...
├── public/
├── .env
├── package.json
└── vite.config.js
```

## Technologies Used

- React 18
- Vite
- Web Speech API
- Context API
- CSS3