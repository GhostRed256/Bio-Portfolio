<div align="center">

# 🎨 Bio-Portfolio

### A Dynamic, Weather-Responsive Portfolio Website

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-bio--portfolio--seven.vercel.app-7C3AED?style=for-the-badge)](https://bio-portfolio-seven.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

<br/>

<img src="https://img.shields.io/github/stars/GhostRed256/Bio-Portfolio?style=social" alt="Stars"/>
<img src="https://img.shields.io/github/forks/GhostRed256/Bio-Portfolio?style=social" alt="Forks"/>
<img src="https://img.shields.io/github/license/GhostRed256/Bio-Portfolio" alt="License"/>

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🌦️ **Dynamic Weather Themes** | Automatically adapts to real-time weather conditions (Sunny, Rainy, Snowy, Evening) |
| 🎈 **Floating Balloons** | Pastel-colored balloons that float upwards with scroll-based parallax |
| ⌨️ **Typewriter Effect** | Animated text reveal on page load |
| 🖼️ **Art Gallery** | Showcase your artwork with smooth hover effects |
| 💻 **GitHub Showcase** | Display projects in stylish browser window cards |
| 🔗 **Hover Profiles** | Preview GitHub & LinkedIn profiles on hover |
| 🌙 **Day/Night Mode** | Automatic theme switching based on time and weather |
| 📱 **Fully Responsive** | Optimized for all screen sizes and devices |

---

## 🛠️ Tech Stack

<div align="center">

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React Framework with App Router |
| **React 19** | UI Components |
| **TypeScript** | Type Safety |
| **Tailwind CSS** | Styling |
| **Framer Motion** | Animations |
| **Open-Meteo API** | Weather Data (Free, No API Key) |

</div>

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/GhostRed256/Bio-Portfolio.git

# Navigate to project directory
cd Bio-Portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles & theme variables
├── components/
│   ├── layout/            # Navbar, Footer
│   ├── sections/          # Hero, ArtGallery, GithubShowcase, Contact
│   └── ui/                # BrowserWindow, FloatingBalloons, WeatherEffects
├── data/                  # Projects & Art data
├── hooks/                 # Custom hooks (useWeather)
└── lib/                   # Utility functions
```

---

## 🌤️ Weather Integration

The portfolio dynamically adapts its theme based on real-time weather:

| Condition | Theme | Animation |
|-----------|-------|-----------|
| ☀️ Sunny | Pastel Yellow | Rotating sun glow |
| 🌧️ Rainy | Cool Blue | Falling rain + lightning |
| ❄️ Snowy | Ice White | Floating snowflakes |
| 🌆 Evening | Orange & Navy | Sunset gradient |
| 🌙 Night | Dark Navy | Moonlight ambiance |

> **Default Location:** Dibrugarh, Assam  
> **Custom Location:** Enabled with browser geolocation permission

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/GhostRed256/Bio-Portfolio)

Or manually:

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com/new)
3. Deploy (no environment variables required!)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

### Made with ❤️ by [GhostRed256](https://github.com/GhostRed256)

⭐ Star this repo if you found it helpful!

</div>
