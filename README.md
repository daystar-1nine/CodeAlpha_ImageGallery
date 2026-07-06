# CodeAlphaGallery

![CodeAlphaGallery](./public/vite.svg)

CodeAlphaGallery is a premium, responsive image gallery application built for the CodeAlpha Frontend Development Internship. Designed with a sleek, minimalist aesthetic inspired by modern interfaces like Apple, Vercel, and Linear, it delivers an exceptional user experience with smooth animations, robust features, and performant architecture.

## 🚀 Features

- **Responsive Masonry Grid:** Dynamic image layout that flawlessly adapts to any screen size.
- **Premium Lightbox:** Fullscreen image viewing with zoom, pan, keyboard shortcuts, and detailed metadata.
- **Smart Search & Filtering:** Debounced live search with category chips for instant discovery.
- **Favorites & Collections:** Save images and organize them into custom collections using persistent local storage.
- **Dark Mode:** Elegant theming support (Light, Dark, System) for optimal viewing.
- **Smooth Animations:** 60fps transitions and micro-interactions powered by Framer Motion.
- **Performance Optimized:** React lazy loading, code splitting, image blur placeholders, and infinite scrolling.
- **Keyboard Navigation:** Comprehensive accessibility with ESC, Arrow keys, and shortcut support.

## 🛠️ Tech Stack

- **Framework:** React 19 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** Shadcn UI + Radix Primitives
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Routing:** React Router v7

## 📂 Folder Structure

```text
src/
├── components/
│   ├── common/        # Shared components
│   ├── gallery/       # Domain-specific components (Masonry, Lightbox, ImageCard)
│   ├── layout/        # App structural layout (Navbar, Footer)
│   └── ui/            # Shadcn UI primitives
├── constants/         # Static data and mock datasets
├── hooks/             # Custom React hooks (useFavorites, useDebounce, etc.)
├── pages/             # Route pages (Home, Gallery, Collections)
├── services/          # API integrations (Unsplash API)
├── store/             # Global Context providers
├── styles/            # Tailwind CSS configuration
├── types/             # TypeScript interfaces
└── utils/             # Helper functions
```

## 💻 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/codealpha-gallery.git
   cd codealpha-gallery
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory and add your Unsplash Access Key to enable live API fetching. If omitted, the app gracefully falls back to a high-quality mock dataset.
   ```env
   VITE_UNSPLASH_ACCESS_KEY=your_access_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🌐 Deployment

This project is optimized for deployment on Vercel. 
To deploy, simply connect your GitHub repository to Vercel, ensure the framework preset is set to Vite, and add your `VITE_UNSPLASH_ACCESS_KEY` to the environment variables in Vercel settings.

## 🔮 Future Improvements

- Add user authentication to sync favorites across devices.
- Implement drag-and-drop image uploads for personal collections.
- Add an integrated image color palette extractor.
- Implement a share API integration to directly copy/share image links to social media.

## 🙏 Credits

Built by for the CodeAlpha Internship Task 1.
Images sourced via the [Unsplash API](https://unsplash.com/developers).
