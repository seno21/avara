# Avara Studio - Website Design System & Architecture

## 1. Project Overview

**Avara Studio** is an e-commerce platform designed to offer a premium, elegant online shopping experience. The website's design heavily emphasizes the brand's identity, utilizing a minimalist and sophisticated approach inspired by the official logo.

- **Framework:** Vue 3 (Composition API)
- **Language:** TypeScript
- **Build Tool:** Vite
- **State Management:** Pinia
- **Styling:** Tailwind CSS (recommended for rapid UI development) / SCSS

---

## 2. Color Palette

Based on the provided Avara Studio logo, the design utilizes a luxurious and neutral color scheme.

| Role                       | Color Name          | Hex Code  | Usage                                                                                                  |
| :------------------------- | :------------------ | :-------- | :----------------------------------------------------------------------------------------------------- |
| **Background (Primary)**   | Warm Cream          | `#F6F4EE` | Main page backgrounds, ensuring a soft, premium feel similar to the logo's canvas.                     |
| **Background (Secondary)** | Pure White          | `#FFFFFF` | Product cards, modals, dropdowns, and contrasting sections.                                            |
| **Text (Primary)**         | Deep Black          | `#1A1A1A` | Main headings, primary body text, and logo text.                                                       |
| **Text (Muted)**           | Charcoal Gray       | `#6B6B6B` | Secondary text, descriptions, footer text, and placeholders.                                           |
| **Accent / Action**        | Elegant Bronze/Gold | `#AD9277` | Inspired by the logo's "swoosh". Used for primary buttons, active links, hover states, and highlights. |
| **Accent (Hover)**         | Deep Bronze         | `#8C755E` | Hover state for primary buttons.                                                                       |

---

## 3. Typography

To match the contrast in the logo (Serif for "AVARA" and Sans-serif for "STUDIO"), we use a dual-font pairing strategy.

- **Primary Font (Headings):** _Playfair Display_ or _Cinzel_ (Serif)
  - Used for H1, H2, H3, product titles, and major banners.
  - Conveys elegance and luxury.
- **Secondary Font (Body & UI):** _Montserrat_ or _Inter_ (Sans-serif)
  - Used for body text, navigation menus, buttons, and product descriptions.
  - Ensures clean readability and modern aesthetics. Tracked out (letter-spacing) for uppercase elements.

---

## 4. UI/UX Principles

1. **Minimalism:** Ample whitespace (negative space) to let products stand out.
2. **Luxury Feel:** Thin borders, delicate hover effects (e.g., slow fade in/out), and high-resolution imagery.
3. **Accessibility:** High contrast ratios between text and background.
4. **Responsive:** Mobile-first design approach, ensuring perfect layout on all devices.

---

## 5. Directory Structure (Vue + TypeScript)

Standard structure for scalability and maintainability:

```text
src/
├── assets/            # Static assets (images, fonts, global styles)
├── components/        # Reusable UI components (Buttons, Cards, Navbar)
│   ├── common/        # Generic UI (BaseButton.vue, BaseInput.vue)
│   └── layout/        # Header.vue, Footer.vue
├── composables/       # Vue 3 custom hooks (e.g., useCart.ts, useAuth.ts)
├── router/            # Vue Router configuration
├── store/             # Pinia stores (cartStore.ts, productStore.ts)
├── types/             # TypeScript interfaces and types (Product.ts, User.ts)
├── views/             # Page components (Home.vue, Shop.vue, Checkout.vue)
├── App.vue            # Root component
└── main.ts            # Entry point
```

---

## 6. Key Components (TypeScript Examples)

### A. Primary Button Component (`BaseButton.vue`)

```vue
<template>
  <button
    :class="[
      'px-6 py-3 transition-colors duration-300 font-sans tracking-widest uppercase text-sm',
      variant === 'primary'
        ? 'bg-[#AD9277] text-white hover:bg-[#8C755E]'
        : 'bg-transparent border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#F6F4EE]',
    ]"
    @click="emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{ variant?: "primary" | "outline" }>();
const emit = defineEmits(["click"]);
</script>
```

### B. Product Interface (`types/Product.ts`)

```typescript
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  inStock: boolean;
  category: string;
}
```
