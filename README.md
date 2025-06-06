# Promptly - AI-Powered Hinge Prompt Generator

> Transform your dating game with AI-generated, personality-driven prompts that help you stand out on Hinge effortlessly ✨

## 🏗️ Project Structure

This is a **monorepo** containing both the mobile app and backend API:

```
promptly/
├── mobile/          # React Native (Expo) mobile app
├── api/             # Node.js Express API server
├── shared/          # Shared types and utilities
└── docs/            # Documentation
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm 9+
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Studio

### 1. Clone & Install

```bash
git clone <repository-url>
cd promptly-front_end
npm run install:all
```

### 2. Environment Setup

```bash
# Copy environment files
cp mobile/.env.example mobile/.env
cp api/.env.example api/.env

# Add your API keys to both .env files
```

### 3. Development

```bash
# Start both mobile app and API server
npm run dev

# Or run individually:
npm run dev:mobile    # Mobile app (Expo)
npm run dev:api       # API server (Express)
```

## 📱 Mobile App (`/mobile`)

**Tech Stack:**

- React Native (Expo)
- TypeScript
- Clerk (Authentication)
- Linear Gradient
- React Native SVG

**Key Features:**

- Landing page with animated prompt demo
- Social authentication (Google, Apple, Email)
- User onboarding flow
- AI prompt generation interface
- Prompt editing and rating

## 🔧 API Server (`/api`)

**Tech Stack:**

- Node.js + Express
- TypeScript
- Clerk (Authentication)
- OpenAI API
- Prisma ORM
- PostgreSQL

**Key Features:**

- RESTful API endpoints
- Clerk authentication middleware
- AI prompt generation
- User profile management
- Prompt rating system

## 🛠️ Available Scripts

### Root Level

- `npm run dev` - Start both mobile and API in development
- `npm run build` - Build both projects for production
- `npm run install:all` - Install dependencies for all workspaces
- `npm run clean` - Remove all node_modules
- `npm run lint` - Lint both projects
- `npm run test` - Run tests for both projects

### Mobile App (`cd mobile`)

- `npm start` - Start Expo development server
- `npm run ios` - Start iOS simulator
- `npm run android` - Start Android emulator
- `npm run web` - Start web version

### API Server (`cd api`)

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run API tests

## 🔐 Authentication

Using **Clerk** for authentication across both mobile and API:

1. **Mobile**: Social OAuth + Email flows
2. **API**: JWT verification middleware
3. **Shared**: Session management and user context

## 🎨 Design System

The app follows a cohesive design system with:

- **Colors**: Purple-based palette with rainbow gradients
- **Typography**: Inter (UI), Playfair Display (prompts), Gelasio (headings)
- **Components**: Reusable buttons, cards, and form elements

## 🚢 Deployment

### Frontend (Expo/EAS)

```bash
cd mobile
eas build --platform all
eas submit
```

### Backend (Vercel/Railway/Heroku)

```bash
cd api
npm run build
# Deploy to your preferred platform
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ by the Promptly Team**
