// Add rich bottom section below the main battle panel
import { readFileSync, writeFileSync } from 'fs';
const f = 'c:/Users/pavan/ww1/src/pages/Battles.jsx';
let c = readFileSync(f, 'utf-8');

const BOTTOM_CONTENT = `
                {/* ── Bottom: Casualty Stats ── */}
                <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: '1rem', marginBottom: '2rem' }}>
                    {[
                        { label: 'Western Front Deaths', val: '3.2M+', color: '#6ea8d8', icon: '⚔️' },
                        { label: 'Eastern Front Deaths', val: '4.5M+', color: '#E6192B', icon: '🛡️' },
                        { label: 'Gallipoli Casualties', val: '473K', color: '#c9a84c', icon: '🌙' },
                        { label: 'Isonzo Battles', val: '11 Battles', color: '#3d8c46', icon: '🏔️' },
                        { label: 'Ships Sunk by U-boats', val: '5,000+', color: '#4c9bc9', icon: '⚓' },
                        { label: 'Days of War', val: '1,561', color: '#c0392b', icon: '📅' },
                    ].map(s => (
                        <div key={s.label} style={{ background: \`\${s.color}0c\`, border: \`1px solid \${s.color}30\`, borderTop: \`2px solid \${s.color}\`, borderRadius: '10px', padding: '1.2rem 1rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>{s.icon}</div>
                            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: s.color, lineHeight: 1, marginBottom: '0.3rem' }}>{s.val}</div>
                            <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.05em', lineHeight: 1.4 }}>{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* ── Bottom: Famous Quotes ── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginBottom: '2rem' }}>
                    {[
                        { quote: 'Dulce et decorum est pro patria mori. — Sweet and honourable it is to die for one\'s country.', author: 'Wilfred Owen', role: 'War Poet, 1917', color: '#6ea8d8' },
                        { quote: 'I died in hell — they called it Passchendaele.', author: 'Siegfried Sassoon', role: 'British Officer & Poet', color: '#c0392b' },
                        { quote: 'The war to end all wars has proved to be a war to end peace.', author: 'Woodrow Wilson', role: 'US President, 1918', color: '#c9a84c' },
                    ].map(q => (
                        <div key={q.author} style={{ background: 'rgba(255,255,255,0.025)', border: \`1px solid \${q.color}25\`, borderLeft: \`3px solid \${q.color}\`, borderRadius: '10px', padding: '1.5rem' }}>
                            <div style={{ fontSize: '2rem', color: q.color, opacity: 0.3, lineHeight: 1, marginBottom: '0.5rem', fontFamily: 'Georgia, serif' }}>❝</div>
                            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.88rem', lineHeight: 1.75, fontStyle: 'italic', margin: '0 0 1rem' }}>{q.quote}</p>
                            <div style={{ color: q.color, fontSize: '0.78rem', fontWeight: 700 }}>{q.author}</div>
                            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.68rem', marginTop: '0.2rem' }}>{q.role}</div>
                        </div>
                    ))}
                </div>
`;

// Insert before the closing </div> of the page wrapper (which is right before </style>)
const ANCHOR = '</div>\r\n\r\n            <style>';
const ANCHOR_LF = '</div>\n\n            <style>';
const hasAnchor = c.includes(ANCHOR) || c.includes(ANCHOR_LF);

if (!hasAnchor) {
    console.error('Anchor not found, trying fallback');
    // fallback - find the style tag
    const styleIdx = c.indexOf('\n            <style>');
    if (styleIdx === -1) { console.error('No style tag found'); process.exit(1); }
    c = c.slice(0, styleIdx) + '\n' + BOTTOM_CONTENT + c.slice(styleIdx);
} else {
    const anchor = c.includes(ANCHOR) ? ANCHOR : ANCHOR_LF;
    c = c.replace(anchor, BOTTOM_CONTENT + '\n            </div>\n\n            <style>');
}

writeFileSync(f, c, 'utf-8');
console.log('Bottom content added!');
