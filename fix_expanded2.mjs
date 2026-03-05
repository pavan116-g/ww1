import { readFileSync, writeFileSync } from 'fs';
const f = 'c:/Users/pavan/ww1/src/components/PreWW1.jsx';
const lines = readFileSync(f, 'utf-8').split(/\r?\n/);

// Lines 763-772 (0-indexed: 762-771) are the old isOpen panel
// Replace them with new lines that include an image
const newLines762to771 = [
    `                                                {isOpen && (`,
    `                                                    <div>`,
    `                                                        <div style={{ height: '1px', background: \`\${group.accent}20\`, marginBottom: '1rem' }} />`,
    `                                                        <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start' }}>`,
    `                                                            {p.img && (`,
    `                                                                <div style={{ flexShrink: 0 }}>`,
    `                                                                    <img src={p.img} alt={p.name}`,
    `                                                                        style={{ width: '110px', height: '140px', objectFit: 'cover', objectPosition: 'top center', borderRadius: '8px', border: \`2px solid \${group.accent}44\`, filter: 'grayscale(15%) brightness(0.88)', display: 'block' }}`,
    `                                                                        onError={e => { e.target.parentElement.style.display = 'none'; }} />`,
    `                                                                </div>`,
    `                                                            )}`,
    `                                                            <div style={{ flex: 1, minWidth: 0 }}>`,
    `                                                                <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.82rem', lineHeight: 1.75, margin: '0 0 0.9rem' }}>{p.bio}</p>`,
    `                                                                <div style={{ background: \`\${group.accent}10\`, border: \`1px solid \${group.accent}22\`, borderRadius: '8px', padding: '0.6rem 1rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>`,
    `                                                                    <span style={{ color: group.accent, fontSize: '0.7rem', flexShrink: 0, marginTop: '0.05rem' }}>★</span>`,
    `                                                                    <span style={{ color: group.accent, fontSize: '0.75rem', fontStyle: 'italic' }}>{p.fact}</span>`,
    `                                                                </div>`,
    `                                                            </div>`,
    `                                                        </div>`,
    `                                                    </div>`,
    `                                                )}`,
];

// Replace lines at 0-indexed positions 762 to 771 (lines 763-772 in 1-indexed)
const before = lines.slice(0, 762);
const after = lines.slice(772); // skip the 10 old lines (762..771)
const result = [...before, ...newLines762to771, ...after];
writeFileSync(f, result.join('\r\n'), 'utf-8');
console.log(`Done! New file has ${result.length} lines.`);
