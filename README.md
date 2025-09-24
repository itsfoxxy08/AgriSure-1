# AgriSure - Farmer Transparency Platform

**Team F3 Hackathon Project**

A comprehensive platform designed to eliminate corruption and increase transparency in government schemes for farmers.

## Team Members

- **Sudeep Kushwaha** - BackEnd Developer 
- **Abhishek** - Data Management  & Research
- **Vikas Choudhary** - FrontEnd Developer & UI/UX Designer 

## Project Overview

AgriSure is a revolutionary platform that bridges the gap between farmers and government agricultural schemes, ensuring transparency and eliminating corruption in the process.

## Key Features

### 🌾 Government Schemes Management
- Track PM-KISAN Scheme (₹6,000 annual support)
- Pradhan Mantri Fasal Bima Yojana (Crop Insurance)
- Soil Health Card Program
- Real-time application status tracking

### 📊 Mandi Price Intelligence
- Live market prices across multiple locations
- Transport cost calculations
- Net profit analysis and recommendations
- Price trend indicators with percentage changes

### 💰 Benefits Tracking
- Comprehensive benefit management dashboard
- Financial analytics and reporting
- Scheme eligibility checker

### 🛡️ Anti-Corruption Module
- Anonymous whistleblower reporting system
- Secure complaint filing against corrupt officials
- Protected under Whistleblower Protection Act

### 👤 Farmer Profile Management
- Personal dashboard for farmers
- Application history and status tracking
- Document management system

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: React Router v6
- **State Management**: TanStack Query
- **Charts**: Recharts
- **Form Handling**: React Hook Form + Zod validation
- **Database**: MongoDB

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd agrisure

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Project Structure

```
src/
├── components/
│   ├── home/           # Landing page components
│   ├── layout/         # Header, navigation
│   └── ui/             # Reusable UI components
├── pages/              # Route components
│   ├── Index.tsx       # Landing page
│   ├── Schemes.tsx     # Government schemes
│   ├── MandiPrices.tsx # Market prices
│   ├── Benefits.tsx    # Benefits tracking
│   ├── ReportCorruption.tsx # Corruption reporting
│   └── Profile.tsx     # User profile
├── lib/                # Utilities and helpers
└── hooks/              # Custom React hooks
```

## Deployment

This project is optimized for deployment on:
- Vercel
- Netlify  
- GitHub Pages
- Any static hosting service

## Mission Statement

**"Empowering farmers through transparency, eliminating corruption, and ensuring direct access to government benefits."**

AgriSure represents our commitment to leveraging technology for social good, specifically addressing the challenges faced by farmers in accessing government schemes and fair market prices.

---

**Developed with ❤️ by Team F3**
