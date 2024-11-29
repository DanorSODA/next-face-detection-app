# AI Face Detection

A real-time face detection application built with Next.js and face-api.js.
This application uses your webcam to detect faces, facial landmarks, and expressions in real-time.

## Features

- Real-time face detection
- Facial landmark recognition
- Expression analysis
- Webcam integration
- Responsive design

## Prerequisites

Before you begin, ensure you have installed:

- Node.js (version 16.x or higher)
- Yarn package manager

## Installation

1. Clone the repository:

```bash
git clone https://github.com/DanorSODA/next-face-detection-app
cd next-face-detection-app
```

2. Install dependencies:

```bash
yarn install
```

3. Start the development server:

```bash
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```tree
├── app/
│   ├── fonts/
│   │   ├── GeistVF.woff         # Geist Sans font
│   │   └── GeistMonoVF.woff     # Geist Mono font
│   ├── models/                   # Face detection models
│   ├── page.tsx                 # Main application component
│   ├── page.module.css          # Styles for main component
│   ├── layout.tsx               # Root layout component
│   └── globals.css              # Global styles
├── public/
│   └── models/                  # face-api.js model files
└── package.json                 # Project dependencies
```

### Essential Files

- [`app/page.tsx`](src/app/page.tsx) - Main application logic and webcam integration
- [`app/page.module.css`](src/app/page.module.css) - Styling for the face detection interface
- [`app/layout.tsx`](src/app/layout.tsx) - Root layout with font configuration

## Technologies Used

- [Next.js](https://nextjs.org) - React framework
- [face-api.js](https://github.com/justadudewhohacks/face-api.js) - JavaScript face detection library
