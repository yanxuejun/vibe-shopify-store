# VIBE Shopify Storefront

A high-performance, headless Shopify storefront built with **Next.js**, **Tailwind CSS**, and deployed on **Cloudflare Pages**.

## 🚀 Features

- **Headless Shopify**: Powered by Shopify Storefront API.
- **Edge Runtime**: Optimized for Cloudflare Pages (next-on-pages).
- **Modern UI**: Premium design using Tailwind CSS v4 and Lucide icons.
- **Type Safe**: Fully typed with TypeScript.

## 🛠️ Getting Started

### 1. Prerequisites

- A Shopify store and a Storefront Access Token.
- Cloudflare account (for deployment).

### 2. Environment Variables

Create a `.env.local` file (one has been prepared for you) and add your Shopify credentials:

```bash
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-access-token
```

### 3. Development

```bash
npm run dev
```

### 4. Cloudflare Pages Build & Deploy

To build the project for Cloudflare Pages:

```bash
npm run pages:build
```

This will generate a `.next-on-pages` directory.

To test locally with Wrangler:

```bash
npm run pages:dev
```

## 📂 Project Structure

- `src/app`: Next.js App Router pages and layouts.
- `src/components`: Reusable UI components.
- `src/lib/shopify`: Shopify API client and utilities.
- `src/lib/utils.ts`: General utilities (Tailwind merge, etc.).

## 📝 License

MIT
