# StoryHouse — Creative Studio

A modern, responsive website for **StoryHouse**, a creative advertising and brand-content studio focused on storytelling, content production, and digital growth for D2C brands.

**Live website:** [storyhouseagency.in](https://storyhouseagency.in/)

## Overview

Built as a React single-page experience, the StoryHouse website presents the studio's services, selected campaign work, team, creative process, and enquiry form. The interface combines bold typography, custom motion details, and an image- and video-led visual style.

## Features

- Responsive layout with mobile navigation
- Animated preloader, custom cursor, scroll-reveal effects, and number counters
- Dedicated sections for the studio, services, campaigns, leadership, and creative process
- Image and video assets showcasing the studio's work
- Contact form integrated with Web3Forms
- SEO and social-sharing metadata, canonical URL, and XML sitemap
- Firebase Hosting configuration with HTTPS-related security headers and single-page-app routing

## Tech Stack

| Area | Technology |
| --- | --- |
| Frontend | React 19, JavaScript (JSX) |
| Build tooling | Vite 8 |
| Styling | CSS3 |
| Forms | Web3Forms |
| Hosting configuration | Firebase Hosting |
| Icons and typography | Font Awesome, Google Fonts |

## Getting Started

**Requirements:** Node.js and npm compatible with Vite 8.

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open the local URL printed in your terminal.

### Build for Production

```bash
npm run build
npm run preview
```

The production files are generated in `dist/`.

### Code Quality

```bash
npm run lint
```

## Project Structure

```text
storyhouse-main/
├── public/
│   ├── assets/
│   │   ├── images/
│   │   └── videos/
│   ├── privacy.html
│   ├── terms.html
│   └── sitemap.xml
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── firebase.json
├── index.html
├── package.json
└── vite.config.js
```

## Deployment

The repository includes Firebase Hosting configuration for serving the built application from `dist/`. After installing and authenticating the Firebase CLI for an authorized project:

```bash
npm run build
firebase deploy --only hosting
```

---

*Website developed for StoryHouse Creative Studio.*
