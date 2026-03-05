// Full-width Battles page - edge to edge layout
import { readFileSync, writeFileSync } from 'fs';
const f = 'c:/Users/pavan/ww1/src/pages/Battles.jsx';
let c = readFileSync(f, 'utf-8');

// 1. Remove max-width constraint - go truly full width with minimal padding
c = c.replace(
    `<div style={{ maxWidth: '100%', margin: '0 auto', padding: '2.5rem 3.5vw' }}>`,
    `<div style={{ width: '100%', padding: '1.5rem 1.5rem' }}>`
);

// 2. Hero banner - make it taller and more dramatic
c = c.replace(
    `border: '1px solid rgba(192,57,43,0.2)', padding: '3rem 4rem 2.5rem'`,
    `border: '1px solid rgba(192,57,43,0.2)', padding: '3.5rem 5rem 3rem'`
);

// 3. Make the main battle panel fill remaining viewport height
c = c.replace(
    `borderRadius: '12px', overflow: 'hidden', display: 'flex', minHeight: '620px' }}`,
    `borderRadius: '12px', overflow: 'hidden', display: 'flex', minHeight: 'calc(100vh - 430px)' }}`
);

// 4. Map fills more height
c = c.replace(
    `style={{ width: '100%', height: '420px', background: 'rgba(10,20,40,0.6)' }}`,
    `style={{ width: '100%', height: 'calc(100vh - 520px)', minHeight: '380px', background: 'rgba(10,20,40,0.6)' }}`
);

writeFileSync(f, c, 'utf-8');
console.log('Full-width layout applied.');
