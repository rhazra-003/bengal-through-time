const fs = require('fs');
const path = require('path');

console.log('--- Validating & Building Data Bundles ---');

const dataDir = path.join(__dirname, '..', 'data', 'historical', '1905');

const divisionsPath = path.join(dataDir, 'administrative-divisions.json');
const districtsPath = path.join(dataDir, 'districts.json');
const placesPath = path.join(dataDir, 'places.json');
const eventsPath = path.join(dataDir, 'events.json');
const politicalEntitiesPath = path.join(dataDir, 'political-entities.json');
const sourcesPath = path.join(dataDir, 'sources.json');

let errors = 0;

const divisions = JSON.parse(fs.readFileSync(divisionsPath, 'utf8'));
const districts = JSON.parse(fs.readFileSync(districtsPath, 'utf8'));
const places = JSON.parse(fs.readFileSync(placesPath, 'utf8'));
const events = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));
const politicalEntities = JSON.parse(fs.readFileSync(politicalEntitiesPath, 'utf8'));
const sources = JSON.parse(fs.readFileSync(sourcesPath, 'utf8'));

const divisionIds = new Set(divisions.map(d => d.id));
const districtIds = new Set(districts.map(d => d.id));
const sourceIds = new Set(sources.map(s => s.id));
const placeIds = new Set(places.map(p => p.id));

console.log(`Loaded:
- ${divisions.length} Divisions
- ${districts.length} Districts
- ${places.length} Places
- ${events.length} Events
- ${politicalEntities.length} Political Entities
- ${sources.length} Sources`);

// Validate Districts
districts.forEach(dist => {
  if (!divisionIds.has(dist.divisionId)) {
    console.error(`ERROR: District '${dist.id}' references unknown divisionId '${dist.divisionId}'`);
    errors++;
  }
});

// Validate Places
places.forEach(place => {
  if (!divisionIds.has(place.divisionId)) {
    console.error(`ERROR: Place '${place.id}' references unknown divisionId '${place.divisionId}'`);
    errors++;
  }
  if (!districtIds.has(place.districtId)) {
    console.error(`ERROR: Place '${place.id}' references unknown districtId '${place.districtId}'`);
    errors++;
  }
  if (typeof place.latitude !== 'number' || typeof place.longitude !== 'number') {
    console.error(`ERROR: Place '${place.id}' has invalid coordinates`);
    errors++;
  }
  if (place.sources) {
    place.sources.forEach(src => {
      if (!sourceIds.has(src.sourceId)) {
        console.error(`ERROR: Place '${place.id}' references unknown sourceId '${src.sourceId}'`);
        errors++;
      }
    });
  }
});

// Validate Events
events.forEach(evt => {
  if (evt.districtId && !districtIds.has(evt.districtId)) {
    console.error(`ERROR: Event '${evt.id}' references unknown districtId '${evt.districtId}'`);
    errors++;
  }
  if (evt.sources) {
    evt.sources.forEach(srcId => {
      if (!sourceIds.has(srcId)) {
        console.error(`ERROR: Event '${evt.id}' references unknown sourceId '${srcId}'`);
        errors++;
      }
    });
  }
});

if (errors > 0) {
  console.error(`❌ Data validation failed with ${errors} error(s).`);
  process.exit(1);
} else {
  console.log('✅ All JSON datasets and referential linkages validated successfully!');
}
