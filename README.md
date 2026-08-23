# BENGAL THROUGH TIME
### Interactive Historical Atlas of Bengal Immediately Before the 1905 Partition

> **Tagline**: Explore the places, people, kingdoms and events that shaped Bengal.

**Bengal Through Time** is a production-quality, educational web application and digital historical atlas focused on the territorial, administrative, and political geography of Bengal immediately before the **Partition of 16 October 1905**.

---

## Key Features

1. **Authentic Historical Geography (c. 1905)**: Reconstructs the Lieutenant-Governorship of Bengal prior to Curzon's partition, encompassing Bengal proper, Bihar, Chota Nagpur, and Orissa across 9 administrative divisions and 49 districts.
2. **Parchment Historical Atlas Aesthetics**: Custom aged paper visual design (`Cinzel`, `Playfair Display`, `Plus Jakarta Sans`), brass accents, and responsive layout controls.
3. **Interactive Map Engine**: React + TypeScript + MapLibre GL JS with vector district overlays, boundary glow, zoom decluttering, and custom place & battle markers.
4. **Battles & Events Map Layer**: Interactive markers for historic battles (Plassey 1757, Buxar 1764), uprisings (Santhal Rebellion 1855, Indigo Revolt 1859), and partition events.
5. **"Who Ruled Here?" Political Timelines**: Chronological succession of political control (Ancient, Pala, Sena, Delhi Sultanate, Bengal Sultanate, Mughals, Nawabs of Bengal, EIC, British Raj).
6. **Then vs Now Name Resolution**: Compare 1905 colonial official place names with present-day modern equivalents sorted by 1901 population.
7. **Educational 'How to Use' Guide**: Tailored exploration workflows for students, UPSC/WBCS competitive exam aspirants, and history enthusiasts.
8. **Knowledge Check Quiz**: A 50-question, data-grounded multiple-choice quiz delivered in rounds of five questions, with answer feedback, cumulative scoring, and a graceful completion state.
9. **Historical Place Photography**: Optional local archival images on place detail pages, rendered in a responsive landscape frame with a graceful fallback when an image is not available.
10. **Traceable Sources & Citations**: Anchored in the *Imperial Gazetteer of India* (1907), *Bengal District Gazetteers*, and 1901 Census baseline records.

---

## Tech Stack & Architecture

- **Frontend**: React 18, TypeScript, Vite, React Router v6, Tailwind CSS, Lucide React, Framer Motion
- **Map Engine**: MapLibre GL JS (WGS 84 GeoJSON polygons & point features)
- **Data & Testing**: Static validated GeoJSON and JSON datasets, Vitest unit test suite
- **Deployment**: Vercel and Cloudflare Pages SPA fallbacks for direct route navigation and browser refreshes

---

## Quick Start (Local Development)

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Run Data Validation Scripts
```bash
# From project root
node scripts/validate-geojson.js
node scripts/build-data.js
```

### 3. Run Automated Tests
```bash
cd frontend
npm run test
```

### 4. Start Local Development Server
```bash
cd frontend
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## Project Structure

```
bengal-history/
├── data/
│   └── historical/
│       └── 1905/
│           ├── boundaries/
│           │   ├── bengal-pre-partition.geojson
│           │   └── districts.geojson
│           ├── administrative-divisions.json
│           ├── districts.json
│           ├── places.json
│           ├── events.json
│           ├── political-entities.json
│           └── sources.json
├── frontend/
│   ├── public/
│   │   ├── _redirects
│   │   └── images/places/      
│   ├── vercel.json               # Vercel SPA rewrite to index.html
│   └── src/
│       ├── components/
│       │   ├── PlaceImage.tsx
│       ├── pages/
│       │   ├── KnowledgeCheckPage.tsx
│       │   ├── PlaceDetailPage.tsx
│       ├── services/
│       ├── types/
│       ├── App.tsx
│       ├── index.css
│       └── main.tsx
├── research/
│   ├── pre-partition-bengal-1905.md
│   ├── partition-of-bengal-1905.md
│   ├── sources.md
│   └── methodology.md
├── scripts/
│   ├── validate-geojson.js
│   └── build-data.js
└── README.md
```

## Knowledge Check

The `/knowledge-check` page is linked from the How to Use guide and the footer, but is intentionally not included in the main navbar. It presents one question at a time with four choices and one correct answer. The user must submit an answer to see the result, then can continue through five questions. The next five are unlocked with **Try Again**; the final round contains the remaining two questions. After all 52 questions, the page shows the final score and a **Play Again** control that reloads the quiz from question one.

All questions are maintained in `frontend/src/data/knowledgeCheckQuestions.ts` and are based on the checked-in historical JSON data under `data/historical/1905/`.

## Historical Place Images

Place detail pages look for an optional image using the place slug:

```text
frontend/public/images/places/{place-slug}.jpg
```

For example, the Calcutta image is `frontend/public/images/places/calcutta.jpg`. See `frontend/public/images/places/README.md` for the image guidance.

## SPA Routing

- Vercel uses `frontend/vercel.json` to rewrite client-side routes to `/index.html`.
- Cloudflare Pages uses `frontend/public/_redirects` with `/* /index.html 200`.

---

## Authors & Credits

Made with passion by:
- **[Ridam Hazra](https://www.linkedin.com/in/algoridam003/)**
- **[Antigravity](https://antigravity.google/)**

---

## Historical Disclaimer

This project reconstructs historical geography based on contemporary 1905 British Indian administrative records and gazetteers. Historical boundaries do not correspond to present-day state boundaries of India or international boundaries of Bangladesh.

---

## License

- **Source Code**: MIT License
- **Data & Citations**: Creative Commons Attribution 4.0 International (CC BY 4.0)
- **Historical Images**: Public Domain / CC-BY-SA (Wikimedia Commons)
