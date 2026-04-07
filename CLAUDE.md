# Project Instructions

## Commands
- `npm start` — Start dev server (port 3000)
- `npm run build` — Production build
- `npm test` — Run tests

## Git Rules
- Never include `Co-Authored-By` in commits
- Push directly when asked — no confirmation needed
- Use short, descriptive commit messages
- Never amend previous commits — always create new ones
- Never force push

## Code Style
- React functional components only
- Tailwind CSS for all styling — avoid custom CSS unless necessary
- Framer Motion for complex animations, CSS for simple/infinite ones
- Prefer CSS animations over JS for float, bounce, spin effects
- Use `once: true` for scroll-triggered animations (no re-triggering)

## Architecture
- Pages are lazy-loaded (React.lazy + Suspense)
- All portfolio data lives in `src/data/portfolioData.js`
- ParticleField and MouseGlow render only on homepage
- Environment variables are on Vercel dashboard — never hardcode keys
- `.env` and `.env.example` are gitignored

## Performance
- Minimize framer-motion infinite animations — prefer CSS
- Keep font weights minimal (Inter 4 + JetBrains Mono 2)
- Optimize images before committing
- Use `memo` and `useMemo` where appropriate

## Deployment
- Vercel auto-deploys on push to main
- Domain: https://honnur.in
- SPA routing via vercel.json rewrites
