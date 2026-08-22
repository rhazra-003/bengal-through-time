# Technical Methodology: Data Reconstruction & GeoJSON Pipeline

## 1. GeoJSON Construction & GIS Methodology

Reconstructing the 1905 territorial boundaries of the Lieutenant-Governorship of Bengal requires synthesizing historical Survey of India maps (1890–1905) with modern GIS administrative boundary datasets (GADM, Natural Earth, district shapefiles of India and Bangladesh).

### Processing Steps:
1. **Historical Alignment**: Digitized 1904 Survey of India administrative maps were georeferenced against WGS84 ground control points (river confluences, historical fort locations, mountain peaks, sea inlets).
2. **District Boundary Reconstruction**: Modern district shapefiles for West Bengal, Bangladesh, Bihar, Jharkhand, and Odisha were dissolved and re-grouped according to their 1905 district extents.
   - *Example*: Modern Bangladesh districts (Dhaka, Gazipur, Manikganj, Munshiganj, Narayanganj, Narsingdi) were merged to form the historical **1905 Dacca District**.
   - *Example*: Modern West Bengal districts (North 24 Parganas, South 24 Parganas, Kolkata) were merged to form the historical **1905 24-Parganas & Calcutta Districts**.
3. **Topological Cleanliness**: Vertices were snapped to prevent inter-district gaps or overlapping polygons. Polygons follow standard RFC 7946 GeoJSON format with right-hand winding order for outer rings.
4. **Coordinate Precision**: All coordinates are rounded to 4 decimal places (~11.1 meters at Bengal latitudes), striking the optimal balance between visual fidelity and lightweight file size (< 400 KB uncompressed).

---

## 2. Entity Resolution & Historical Naming Standard

In colonial Bengal, place names often had 3 or 4 variants across different administrative languages and historical eras:

```
[Pre-Colonial / Vernacular]  ──►  [1905 British Official]  ──►  [Post-Independence Modern]
       Kalikata                          Calcutta                        Kolkata
       Dhaka                             Dacca                           Dhaka
       Chattagrama                       Chittagong                      Chattogram
       Bardhaman                         Burdwan                         Bardhaman
       Sri Hatta                         Sylhet                          Sylhet
```

### Data Normalization Rules:
1. **Primary Historical Name**: Used on the 1905 map labels and primary headers (e.g., `Calcutta`, `Dacca`, `Murshidabad`, `Burdwan`, `Chittagong`).
2. **Modern Name**: Recorded in metadata and displayed prominently as `Modern: Kolkata`, `Modern: Dhaka`, etc.
3. **Alternate & Transliteration Variants**: Indexed in `alternateNames` array for global fuzzy search.
4. **No Historical Erasure**: Modern names are never used to overwrite historical map labels when the map setting is set to 1905.

---

## 3. Multi-Tier Image Fallback Pipeline

To guarantee that no place detail page or popup presents a broken image or a generic blank space, the `PlaceImage` component evaluates five sequential fallback tiers:

```
Tier 1: Verified Historical Wikimedia Commons Image (1860–1910)
  │
  ├─► Tier 2: Legal Reusable Historical Print / Archive Photo
  │
  ├─► Tier 3: High-Quality Modern Context Image (CC-BY / Public Domain)
  │
  ├─► Tier 4: Stylized Parchment Map Illustration / Iconography
  │
  └─► Tier 5: Elegant Neutral Procedural Fallback + "No historical photo available" badge
```

---

## 4. Source Provenance Schema

Every place and event in `data/historical/1905/` contains explicit source linkage:

```json
{
  "id": "murshidabad",
  "name": "Murshidabad",
  "historicalName": "Murshidabad",
  "sources": [
    {
      "sourceId": "imp-gazetteer-1907",
      "pages": "Vol. XVIII, pp. 42-58",
      "citation": "Imperial Gazetteer of India, Vol. XVIII, 1907, pp. 42-58"
    },
    {
      "sourceId": "bengal-gazetteer-murshidabad-1914",
      "pages": "pp. 1-15",
      "citation": "Bengal District Gazetteers: Murshidabad (1914), pp. 1-15"
    }
  ],
  "confidence": "HIGH"
}
```
