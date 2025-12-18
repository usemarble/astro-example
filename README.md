# Astro + MarbleCMS Template

A production-ready Astro template for integrating [MarbleCMS](https://marblecms.com) into your blog or content site. This template demonstrates how to use Astro Content Collections with MarbleCMS to create a type-safe, performant blog.

## Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/usemarble/astro-example.git
   cd astro-example
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   MARBLE_API_URL=https://api.marblecms.com/v1
   MARBLE_API_KEY=your_api_key_here
   ```

   Get your API key from your [Marble dashboard](https://app.marblecms.com) under workspace settings.

4. **Run the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

   Open [http://localhost:4321](http://localhost:4321) to view your site.

## Project Structure

```
/
├── src/
│   ├── components/          # Reusable Astro components
│   │   ├── PostCard.astro   # Blog post card component
│   │   ├── Prose.astro      # Typography component for post content
│   │   └── ...
│   ├── layouts/             # Page layouts
│   │   └── Layout.astro     # Main site layout
│   ├── lib/
│   │   ├── queries.ts       # Functions to fetch data from MarbleCMS API
│   │   ├── schemas.ts       # Zod schemas for type-safe data validation
│   │   └── constants.ts     # Site configuration constants
│   ├── pages/
│   │   ├── index.astro      # Homepage (blog listing)
│   │   ├── blog/
│   │   │   ├── index.astro  # Blog listing page
│   │   │   └── [slug].astro # Individual post page
│   │   └── tags/            # Tag pages
│   ├── content.config.ts    # Astro Content Collections configuration
│   └── utils/               # Utility functions
├── public/                  # Static assets
└── astro.config.mjs         # Astro configuration
```

## How It Works

This template uses **Astro Content Collections** with custom loaders to fetch content from MarbleCMS at build time.

### Content Collections (`src/content.config.ts`)

The `content.config.ts` file defines two collections:

- **Posts**: Fetches blog posts from MarbleCMS using `fetchPosts()`
- **Categories**: Fetches categories using `fetchCategories()`

Each collection includes:

- A `loader` function that fetches data from the MarbleCMS API
- A Zod `schema` for runtime validation and TypeScript types

### API Queries (`src/lib/queries.ts`)

The `queries.ts` file contains functions that make requests to the MarbleCMS API:

- `fetchPosts(queryParams)` - Fetches paginated posts
- `fetchCategories(queryParams)` - Fetches categories

These functions use environment variables (`MARBLE_API_URL` and `MARBLE_API_KEY`) to authenticate requests via the `Authorization` header.

### Type Safety (`src/lib/schemas.ts`)

Zod schemas define the shape of your data, providing:

- Runtime validation
- TypeScript type inference
- Type-safe access to post data throughout your app

### Pages

- **Homepage** (`src/pages/index.astro`): Lists all blog posts
- **Blog Post** (`src/pages/blog/[slug].astro`): Displays individual posts using Astro's `getStaticPaths()`
- **Tags** (`src/pages/tags/[slug].astro`): Lists posts by tag

## Environment Variables

| Variable         | Description            | Where to Find                                                      |
| ---------------- | ---------------------- | ------------------------------------------------------------------ |
| `MARBLE_API_URL` | MarbleCMS API endpoint | Default: `https://api.marblecms.com/v1`                            |
| `MARBLE_API_KEY` | Your workspace API key | [Marble Dashboard](https://app.marblecms.com) → Workspace Settings |

**Important**: Never expose `MARBLE_API_KEY` in client-side code. These variables are only accessible in server-side code during the build process.

## Development

### Available Commands

| Command        | Description                                  |
| -------------- | -------------------------------------------- |
| `pnpm dev`     | Start development server at `localhost:4321` |
| `pnpm build`   | Build for production to `./dist/`            |
| `pnpm preview` | Preview production build locally             |

### Adding New Pages

Create new `.astro` files in `src/pages/` to add routes. Use `getCollection()` to access your MarbleCMS content:

```astro
---
import { getCollection } from 'astro:content';

const posts = await getCollection('posts');
---

<ul>
  {posts.map((post) => (
    <li>
      <a href={`/blog/${post.data.slug}`}>{post.data.title}</a>
    </li>
  ))}
</ul>
```

## Deployment

### Deploy to Vercel

Click the button below to deploy this template to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/usemarble/astro-example)

After deploying, add your environment variables in the Vercel dashboard:

1. Go to your project settings
2. Navigate to Environment Variables
3. Add `MARBLE_API_URL` and `MARBLE_API_KEY`

### Other Platforms

This template works with any static hosting platform that supports Astro:

- Netlify
- Cloudflare Pages
- GitHub Pages

## Documentation

- [MarbleCMS Documentation](https://docs.marblecms.com)
- [MarbleCMS MCP Integration Guide](https://docs.marblecms.com/mcp)
- [Astro Documentation](https://docs.astro.build)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)

## License

MIT
