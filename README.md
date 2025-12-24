# Christmas Application - Refactored Structure

## 📁 Project Structure

```
noem/
├── public/                    # Static assets only
│   ├── assets/               # Images and media
│   ├── font/                 # Font files
│   ├── image/                # Image assets
│   └── iamgedefault/         # Default images
│
├── src/                      # Source code
│   ├── animations/           # Animation modules
│   │   ├── textEffect.js    # "Merry Christmas" particle text effect
│   │   └── tree.js          # GSAP tree animation
│   │
│   ├── components/           # UI components
│   │   └── book.js          # Book component with typing effect
│   │
│   ├── styles/               # CSS files
│   │   ├── style.css        # Main styles
│   │   └── button.css       # Button styles
│   │
│   ├── utils/                # Utility functions
│   │   ├── api.js           # API data utilities
│   │   ├── config.js        # Configuration and constants
│   │   └── dom.js           # DOM utility functions
│   │
│   └── main.js              # Application entry point
│
├── index.html               # Main HTML file
├── package.json             # Dependencies
└── pnpm-lock.yaml          # Lock file
```

## 🎯 Key Improvements

### 1. **Modular Architecture**
   - Separated concerns into logical modules
   - Clear separation between animations, components, utilities, and styles
   - Better code organization and maintainability

### 2. **ES6 Modules**
   - Uses modern JavaScript module syntax (import/export)
   - Proper encapsulation of functionality
   - Tree-shakeable code

### 3. **Utility Functions**
   - Reusable helper functions in `utils/`
   - Configuration centralized in `config.js`
   - API data handling separated from business logic

### 4. **Component-Based Structure**
   - Each component is self-contained
   - Easy to test and maintain
   - Clear dependencies

### 5. **Clean Public Folder**
   - Only static assets remain in `public/`
   - No JavaScript or CSS files
   - Better caching and deployment

## 🚀 Development

### Install Dependencies
```bash
pnpm install
```

### Development Server
```bash
pnpm dev
```

### Build for Production
```bash
pnpm build
```

### Preview Production Build
```bash
pnpm preview
```

## 📦 Modules Overview

### `src/main.js`
- Application entry point
- Initializes all components
- Exposes functions globally for backward compatibility

### `src/animations/`
- **textEffect.js**: Particle-based text animation for "Merry Christmas"
- **tree.js**: GSAP-powered Christmas tree animation

### `src/components/`
- **book.js**: Interactive book with typewriter effect using GSAP

### `src/utils/`
- **config.js**: Application constants and configuration
- **api.js**: Functions to fetch and validate API data
- **dom.js**: DOM manipulation utilities

### `src/styles/`
- **style.css**: Main application styles
- **button.css**: Button-specific styles

## 🔧 Configuration

Configuration is centralized in `src/utils/config.js`:
- Mobile detection
- Font settings
- Default messages
- Particle colors and types
- Animation settings

## 🌐 API Integration

The app supports dynamic content through `window.apiData`:
- `letterContent`: Content for the book/letter
- `textEffectSeq`: Sequence for text animation
- `messages`: Messages for snow effect

## 🎨 Features

1. **Christmas Tree Animation**: GSAP-powered SVG animation
2. **Particle Text Effect**: Dynamic "Merry Christmas" text with particles
3. **Interactive Book**: Hover-triggered typewriter effect
4. **Snow Effects**: Three.js powered snow animation
5. **Responsive Design**: Mobile and desktop optimized

## 📝 Notes

- Uses Vite for fast development and optimized builds
- GSAP plugins loaded from CDN for animation effects
- Three.js for 3D snow effects
- Maintains backward compatibility with existing HTML structure
