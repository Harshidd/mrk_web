# MRKDESIGN Center Hub

Next.js (App Router) + Sanity CMS integrated application designed to look like a premium digital agency. High-performance, fully statically generated/SSR with dynamic routes.

## Local Setup

1. Rename `.env.example` to `.env.local` or `.env`.
2. Connect or Create a Sanity Project:
   - Run `npx sanity init` (if setting up from scratch or `npm create sanity@latest`) inside a temp folder and get your Project ID, OR
   - Go to [sanity.io/manage](https://manage.sanity.io), create a new project.
   - Set up CORS origins in Sanity Manage (`http://localhost:3000`).
   - Add your `projectId` to the `.env.local`.
   - Setup `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
3. Run `npm install`
4. Run `npm run dev`
5. Visit [http://localhost:3000/studio](http://localhost:3000/studio) to manage content.
6. Visit [http://localhost:3000/](http://localhost:3000/) to see the frontend.

## Deployment to Vercel

1. Push this repository to GitHub.
2. Import project in Vercel.
3. Ensure ENV variables are added:
   - `NEXT_PUBLIC_SITE_URL=https://your-domain.com`
   - `NEXT_PUBLIC_SANITY_PROJECT_ID=your_id`
   - `NEXT_PUBLIC_SANITY_DATASET=production`
   - `NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01`
   - (Optional) `SANITY_API_WRITE_TOKEN=token_here` for form submissions.
4. Deploy!
5. In Sanity Manage, add `https://your-domain.com` to CORS Origins.

## Sanity Seed Checklist

To populate the site for the first time, open [http://localhost:3000/studio](http://localhost:3000/studio) and create exactly:

1. **Site Settings** (singleton instance) -> Fill out Title, Info, WhatsApp, Arrays.
2. **Solution Categories** -> Create exactly 3. (e.g. Kurumsal Mimari, Dijital Dönüşüm, Süreç Optimizasyonu). Set order 1, 2, 3.
3. **Projects** -> Create at least 3 featured projects. Check "Featured". Set category, cover image, and results.
4. **Tools** -> Create 3 tools (some 'Active', some 'ComingSoon').
5. **Posts** -> Create 3 posts. Set category.
6. **Legal Page** -> Create exactly 1 document with the title and slug `kvkk`.

Once populated, the frontend will automatically showcase this content on the homepage and respective pages.
