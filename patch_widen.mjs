// Stretch Battles page to fill left and right - wider container + taller map
import { readFileSync, writeFileSync } from 'fs';
const f = 'c:/Users/pavan/ww1/src/pages/Battles.jsx';
let c = readFileSync(f, 'utf-8');

// 1. Widen the outer container from 1300px to full-bleed (padding only, no maxWidth cap)
c = c.replace(
    `<div style={{ maxWidth: '1300px', margin: '0 auto', padding: '2.5rem 2rem' }}>`,
    `<div style={{ maxWidth: '100%', margin: '0 auto', padding: '2.5rem 3.5vw' }}>`
);

// 2. Make main panel taller
c = c.replace(
    `borderRadius: '12px', overflow: 'hidden', display: 'flex', minHeight: '540px' }}`,
    `borderRadius: '12px', overflow: 'hidden', display: 'flex', minHeight: '620px' }}`
);

// 3. Make map taller
c = c.replace(
    `style={{ width: '100%', height: '320px', background: 'rgba(10,20,40,0.6)' }}`,
    `style={{ width: '100%', height: '420px', background: 'rgba(10,20,40,0.6)' }}`
);

// 4. Widen battle list from 280px to 320px
c = c.replace(
    `width: '280px', flexShrink: 0, borderRight:`,
    `width: '320px', flexShrink: 0, borderRight:`
);

// 5. Hero banner also takes full width - change from padding 3rem to 4rem sides
c = c.replace(
    `border: '1px solid rgba(192,57,43,0.2)', padding: '3rem 3rem 2.5rem'`,
    `border: '1px solid rgba(192,57,43,0.2)', padding: '3rem 4rem 2.5rem'`
);

writeFileSync(f, c, 'utf-8');
console.log('Done! Page widened.');
