# How Bazaar

> **Retired.** How Bazaar (howbazaar.gg) was an unofficial reference site for items, skills, monsters, and merchants in The Bazaar. Its data stopped updating after the February 2026 patch and the site has been sunset.
>
> The live domain now serves a single static farewell page from [`docs/`](docs/) via GitHub Pages. The last full version of the app is tagged [`archive-2026-02-04`](https://github.com/MeoMix/howbazaar/releases/tag/archive-2026-02-04).
>
> Questions or hellos: [Meo.DDR@gmail.com](mailto:Meo.DDR@gmail.com) · [github.com/MeoMix](https://github.com/MeoMix) · [linkedin.com/in/MeoMix](https://www.linkedin.com/in/MeoMix)

## What's here

- `docs/` — the static sunset page that GitHub Pages publishes to www.howbazaar.gg.
- `src/`, `scripts/`, `static/` — the original SvelteKit app and the data pipeline that parsed game files into the site's JSON. Kept for reference; it was deployed on Vercel and expects a `PUBLIC_CDN_URL` pointing at an image CDN that no longer exists.

## Running the old app locally

```bash
npm install
PUBLIC_CDN_URL=http://localhost:5173 npm run dev
```

Images will not load without the CDN, but the UI and data browsing still work.
