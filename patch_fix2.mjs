// Fix: 1) Timeline - hide desc text so cards are compact single-line items
//      2) Key Figures grid - add alignItems:'start' so hovered card doesn't stretch siblings
import { readFileSync, writeFileSync } from 'fs';
const f = 'c:/Users/pavan/ww1/src/components/PreWW1.jsx';
let c = readFileSync(f, 'utf-8');

// ── FIX 1: Hide timeline description text ────────────────────────────────────
// Just remove the desc line from the rendered card — keep the date badge + title
c = c.replace(
    `<div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem', lineHeight: 1.6 }}>{ev.desc}</div>`,
    `{/* desc hidden for compact view */}`
);

// ── FIX 2: Key Figures grid — add alignItems:'start' ─────────────────────────
// This stops other cards in the same row from stretching to match the hovered card's height
c = c.replace(
    `<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '1.2rem' }}>`,
    `<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '1.2rem', alignItems: 'start' }}>`
);

writeFileSync(f, c, 'utf-8');
console.log('Done.');
