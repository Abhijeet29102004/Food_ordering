# TastyBites Food Ordering Website

A modern food ordering web application built with React, TypeScript, Vite, Zustand, and Tailwind CSS.

## Features

- Browse menu items by category and search
- View detailed information for each menu item
- Add items to cart and manage quantities
- Checkout with delivery and payment options
- Order confirmation page with estimated delivery
- Responsive design for mobile and desktop
- Persistent cart using local storage
- Animated UI with Tailwind CSS

## Tech Stack

- **React** (UI library)
- **TypeScript** (type safety)
- **Vite** (build tool)
- **Zustand** (state management)
- **Tailwind CSS** (styling)
- **React Router** (routing)
- **Lucide React** (icons)

## Project Structure

```
Food_ordering/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── home/
│   │   ├── layout/
│   │   └── menu/
│   ├── data/            # Static data (menu items, categories)
│   ├── lib/             # Utility functions
│   ├── pages/           # Route pages (Home, Menu, Cart, etc.)
│   ├── store/           # Zustand store for cart
│   ├── types/           # TypeScript types
│   ├── App.tsx          # Main app component with routes
│   ├── main.tsx         # Entry point
│   └── index.css        # Tailwind CSS entry
├── public/
│   └── index.html       # HTML entry
├── package.json         # Project metadata and scripts
├── tailwind.config.js   # Tailwind CSS config
├── postcss.config.js    # PostCSS config
├── vite.config.ts       # Vite config
├── tsconfig*.json       # TypeScript configs
└── README.md            # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd Food_ordering
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   ```

4. **Open in browser:**
   Visit [http://localhost:5173](http://localhost:5173)

### Build for Production

```sh
npm run build
```

### Preview Production Build

```sh
npm run preview
```

### Linting

```sh
npm run lint
```

## Customization

- **Menu Items:** Edit `src/data/menuItems.ts`
- **Categories:** Edit `src/data/categories.ts`
- **Styling:** Modify `tailwind.config.js` and `src/index.css`
- **Routes:** See `src/App.tsx`

## Folder Details

- `src/components/` - UI components (cart, checkout, home, layout, menu)
- `src/pages/` - Route pages (`HomePage`, `MenuPage`, `CartPage`, `CheckoutPage`, `OrderConfirmationPage`, `ItemDetailPage`)
- `src/store/cartStore.ts` - Cart state management
- `src/lib/utils.ts` - Utility functions
- `src/types/index.ts` - TypeScript interfaces

