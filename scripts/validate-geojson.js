const fs = require('fs');
const path = require('path');

console.log('--- Validating GeoJSON Datasets ---');

const boundariesDir = path.join(__dirname, '..', 'data', 'historical', '1905', 'boundaries');
const boundaryPath = path.join(boundariesDir, 'bengal-pre-partition.geojson');
const districtsPath = path.join(boundariesDir, 'districts.geojson');

let errors = 0;

function validateGeoJSON(filePath, expectedType) {
  if (!fs.existsSync(filePath)) {
    console.error(`ERROR: File not found: ${filePath}`);
    errors++;
    return;
  }

  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (data.type !== 'FeatureCollection') {
      console.error(`ERROR: ${filePath} is not a FeatureCollection`);
      errors++;
    }
    if (!Array.isArray(data.features) || data.features.length === 0) {
      console.error(`ERROR: ${filePath} features array is missing or empty`);
      errors++;
    }

    data.features.forEach((feature, idx) => {
      if (!feature.geometry || !feature.geometry.coordinates) {
        console.error(`ERROR: Feature ${idx} in ${filePath} missing geometry`);
        errors++;
        return;
      }
      
      const coords = feature.geometry.coordinates;
      // Bounding box check for Bengal scope: Lon [80..93], Lat [17..28]
      const rings = feature.geometry.type === 'Polygon' ? [coords[0]] : coords.map(c => c[0]);
      rings.forEach(ring => {
        ring.forEach(([lon, lat]) => {
          if (lon < 80 || lon > 93 || lat < 17 || lat > 28) {
            console.error(`ERROR: Coordinate out of bounds in ${filePath}: [${lon}, ${lat}]`);
            errors++;
          }
        });
      });
    });

    console.log(`✓ ${path.basename(filePath)} passed validation (${data.features.length} features)`);
  } catch (err) {
    console.error(`ERROR: Failed to parse ${filePath}: ${err.message}`);
    errors++;
  }
}

validateGeoJSON(boundaryPath, 'Boundary');
validateGeoJSON(districtsPath, 'Districts');

if (errors > 0) {
  console.error(`GeoJSON validation failed with ${errors} error(s).`);
  process.exit(1);
} else {
  console.log('All GeoJSON files validated successfully!');
}
