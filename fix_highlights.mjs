import { readFileSync, writeFileSync } from 'fs';

const filePath = 'c:/Users/pavan/ww1/src/components/PreWW1.jsx';
let content = readFileSync(filePath, 'utf-8');

// ── FIX 1: Country name mismatches in battleMapData ──────────────────────────
// "Bosnia and Herzegovina" -> "Bosnia and Herz." (GeoJSON name)
content = content.replaceAll('"Bosnia and Herzegovina"', '"Bosnia and Herz."');
// "United States" -> "United States of America" (GeoJSON name)
content = content.replaceAll('"United States"', '"United States of America"');

// ── FIX 2: Per-front static projection in the new activeFront section ─────────
// Replace the fixed mapCfg with a per-front config
const oldMapCfg = `                    const mapCfg = { rotate: [-30, -42, 0], scale: 1350 };`;
const newMapCfg = `                    const mapCfg =
                        activeFront === 'west'         ? { rotate: [-5,  -48, 0], scale: 2800 } :
                        activeFront === 'east'         ? { rotate: [-28, -52, 0], scale: 1900 } :
                        activeFront === 'middle-east'  ? { rotate: [-38, -35, 0], scale: 1800 } :
                        activeFront === 'italian'      ? { rotate: [-13, -45, 0], scale: 3200 } :
                                                         { rotate: [-15, -52, 0], scale: 1400 }; // naval / default`;
content = content.replace(oldMapCfg, newMapCfg);

writeFileSync(filePath, content, 'utf-8');
console.log('Done! Applied country name fixes and per-front projection.');
