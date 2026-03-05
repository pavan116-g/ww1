import { readFileSync, writeFileSync } from 'fs';
const f = 'c:/Users/pavan/ww1/src/components/PreWW1.jsx';
let c = readFileSync(f, 'utf-8');

// Replace the old isOpen expanded panel (bio + fact badge, no image)
// with the new one that shows image on the left + bio + fact on the right
const oldPanel = `{isOpen && (
                                                    <div>
                                                        <div style={{ height: '1px', background: \`\${group.accent}20\`, marginBottom: '0.9rem' }} />
                                                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', lineHeight: 1.75, margin: '0 0 0.9rem' }}>{p.bio}</p>
                                                        <div style={{ background: \`\${group.accent}10\`, border: \`1px solid \${group.accent}22\`, borderRadius: '8px', padding: '0.6rem 1rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                                                            <span style={{ color: group.accent, fontSize: '0.7rem', flexShrink: 0, marginTop: '0.05rem' }}>★</span>
                                                            <span style={{ color: group.accent, fontSize: '0.75rem', fontStyle: 'italic' }}>{p.fact}</span>
                                                        </div>
                                                    </div>
                                                )}`;

const newPanel = `{isOpen && (
                                                    <div>
                                                        <div style={{ height: '1px', background: \`\${group.accent}20\`, marginBottom: '1rem' }} />
                                                        <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start' }}>
                                                            {p.img && (
                                                                <div style={{ flexShrink: 0 }}>
                                                                    <img src={p.img} alt={p.name}
                                                                        style={{ width: '110px', height: '140px', objectFit: 'cover', objectPosition: 'top center', borderRadius: '8px', border: \`2px solid \${group.accent}44\`, filter: 'grayscale(15%) brightness(0.88)', display: 'block' }}
                                                                        onError={e => { e.target.parentElement.style.display = 'none'; }} />
                                                                </div>
                                                            )}
                                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                                <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.82rem', lineHeight: 1.75, margin: '0 0 0.9rem' }}>{p.bio}</p>
                                                                <div style={{ background: \`\${group.accent}10\`, border: \`1px solid \${group.accent}22\`, borderRadius: '8px', padding: '0.6rem 1rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                                                                    <span style={{ color: group.accent, fontSize: '0.7rem', flexShrink: 0, marginTop: '0.05rem' }}>★</span>
                                                                    <span style={{ color: group.accent, fontSize: '0.75rem', fontStyle: 'italic' }}>{p.fact}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}`;

if (!c.includes(oldPanel.trim().slice(0, 60))) {
    // Try finding it a different way
    console.log('WARN: exact match not found, searching for fragment...');
    const idx = c.indexOf('isOpen && (\n                                                    <div>\n                                                        <div style={{ height:');
    console.log('Fragment index:', idx);
}

const updated = c.replace(oldPanel, newPanel);
if (updated === c) {
    console.log('ERROR: old panel text not found in file! No changes made.');
} else {
    writeFileSync(f, updated, 'utf-8');
    console.log('Done! Image added to expanded panel.');
}
