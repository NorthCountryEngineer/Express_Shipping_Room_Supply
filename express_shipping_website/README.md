This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

You can try the integrated Excalidraw canvas at `/excalidraw`.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Design System

The app uses a custom Material UI theme defined in `components/theme.ts`. The palette is designed to convey professionalism and trust:

| Role       | Hex      |
|------------|---------|
| Primary    | `#0B3D91` |
| Secondary  | `#007C91` |
| Background | `#F5F5F5` |
| Text       | `#333333` |
| Accent     | `#FF6F00` |

Typography defaults to a sans‑serif stack (`Inter`, `Roboto`, `Arial`, `sans-serif`). Heading sizes are tuned for proposals: `h1` at `2.5rem`, `h2` at `2rem`, and body text at `1rem`.

To adjust colors or fonts, edit `components/theme.ts` and restart the dev server.
