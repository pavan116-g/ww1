// Patch: 1) Compact timeline  2) Key Figures hover instead of click
import { readFileSync, writeFileSync } from 'fs';
const f = 'c:/Users/pavan/ww1/src/components/PreWW1.jsx';
let c = readFileSync(f, 'utf-8');

// ── FIX 1: Make timeline more compact ────────────────────────────────────────
// Reduce outer spacing
c = c.replace(
    `{/* ── SECTION: INTERACTIVE TIMELINE ── */}\n            <div style={{ marginTop: '5rem', marginBottom: '5rem' }}>`,
    `{/* ── SECTION: INTERACTIVE TIMELINE ── */}\n            <div style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }}>`
);
// Smaller header margin
c = c.replace(
    `{/* ── SECTION: INTERACTIVE TIMELINE ── */}\n            <div style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }}>\n                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>`,
    `{/* ── SECTION: INTERACTIVE TIMELINE ── */}\n            <div style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }}>\n                <div style={{ textAlign: 'center', marginBottom: '1.8rem' }}>`
);
// Smaller event gap
c = c.replace(
    `{ width: 'calc(50% - 2.5rem)', background: 'rgba(255,255,255,0.03)', border: \`1px solid \${ev.color}30\`, borderLeft: ev.side === 'left' ? \`3px solid \${ev.color}\` : undefined, borderRight: ev.side === 'right' ? \`3px solid \${ev.color}\` : undefined, borderRadius: '10px', padding: '1.1rem 1.4rem' }`,
    `{ width: 'calc(50% - 2rem)', background: 'rgba(255,255,255,0.03)', border: \`1px solid \${ev.color}30\`, borderLeft: ev.side === 'left' ? \`3px solid \${ev.color}\` : undefined, borderRight: ev.side === 'right' ? \`3px solid \${ev.color}\` : undefined, borderRadius: '8px', padding: '0.65rem 1rem' }`
);
// Smaller dot
c = c.replace(
    `{ position: 'absolute', left: '50%', top: '1.2rem', transform: 'translateX(-50%)', width: '12px', height: '12px', borderRadius: '50%', background: ev.color, boxShadow: \`0 0 0 4px rgba(0,0,0,0.8), 0 0 12px \${ev.color}88\`, zIndex: 2 }`,
    `{ position: 'absolute', left: '50%', top: '0.8rem', transform: 'translateX(-50%)', width: '9px', height: '9px', borderRadius: '50%', background: ev.color, boxShadow: \`0 0 0 3px rgba(0,0,0,0.8), 0 0 8px \${ev.color}88\`, zIndex: 2 }`
);
// Smaller gap between events
c = c.replace(
    `{ display: 'flex', justifyContent: ev.side === 'left' ? 'flex-end' : 'flex-start', marginBottom: '2.5rem', position: 'relative' }`,
    `{ display: 'flex', justifyContent: ev.side === 'left' ? 'flex-end' : 'flex-start', marginBottom: '1.2rem', position: 'relative' }`
);
// Smaller title/desc fonts inside event card
c = c.replace(
    `{ color: '#fff', fontWeight: 700, fontSize: '0.92rem', margin: '0.4rem 0 0.3rem', lineHeight: 1.3 }`,
    `{ color: '#fff', fontWeight: 700, fontSize: '0.8rem', margin: '0.3rem 0 0.25rem', lineHeight: 1.3 }`
);
c = c.replace(
    `{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', lineHeight: 1.65 }`,
    `{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem', lineHeight: 1.6 }`
);

console.log('Timeline compacted');

// ── FIX 2: Key Figures — hover instead of click ────────────────────────────
// Rename expandedFigure → hoveredFigure for clarity
c = c.replace(
    `const [expandedFigure, setExpandedFigure] = React.useState(null);`,
    `const [hoveredFigure, setHoveredFigure] = React.useState(null);`
);
// Replace onClick with onMouseEnter+onMouseLeave, and isOpen check
c = c.replace(
    `const isOpen = expandedFigure === p.id;`,
    `const isOpen = hoveredFigure === p.id;`
);
c = c.replace(
    `onClick={() => setExpandedFigure(n => n === p.id ? null : p.id)}`,
    `onMouseEnter={() => setHoveredFigure(p.id)} onMouseLeave={() => setHoveredFigure(null)}`
);
// Remove the click arrow chevron (no longer needed for hover)
c = c.replace(
    `<span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '1rem', transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>›</span>`,
    ``
);

console.log('Key Figures switched to hover');

writeFileSync(f, c, 'utf-8');
console.log('Done! Patch applied.');
