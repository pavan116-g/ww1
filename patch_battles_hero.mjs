// Add hero banner + front stats to Battles page
import { readFileSync, writeFileSync } from 'fs';
const f = 'c:/Users/pavan/ww1/src/pages/Battles.jsx';
let c = readFileSync(f, 'utf-8');

const HERO = `
                {/* ── Hero Banner ── */}
                <div style={{ position: 'relative', marginBottom: '2.5rem', borderRadius: '16px', overflow: 'hidden', background: 'linear-gradient(135deg, rgba(8,8,14,0.96) 0%, rgba(20,8,8,0.96) 100%)', border: '1px solid rgba(192,57,43,0.2)', padding: '3rem 3rem 2.5rem' }}>
                    {/* Ambient numbers watermark */}
                    {['1914','1915','1916','1917','1918'].map((yr, i) => (
                        <div key={yr} style={{ position: 'absolute', top: i % 2 === 0 ? '10%' : '45%', left: \`\${10 + i * 18}%\`, fontSize: '8rem', fontWeight: 900, color: 'rgba(192,57,43,0.04)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none', letterSpacing: '-0.04em' }}>{yr}</div>
                    ))}
                    <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
                        <div>
                            <div style={{ fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#c0392b', fontWeight: 700, marginBottom: '0.8rem', opacity: 0.85 }}>1914 – 1918 · All Fronts</div>
                            <h1 style={{ fontSize: 'clamp(2rem,4vw,3.2rem)', color: '#fff', fontWeight: 900, margin: '0 0 1rem', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                                The War's<br/>
                                <span style={{ background: 'linear-gradient(135deg,#c0392b,#e74c3c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Defining Battles</span>
                            </h1>
                            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem', margin: 0, maxWidth: '500px', lineHeight: 1.75, fontStyle: 'italic' }}>
                                "The war that was supposed to end by Christmas lasted 1,561 days and claimed the lives of 17 million people."
                            </p>
                        </div>
                        {/* Quick totals */}
                        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                            {[
                                { num: '30+', label: 'Major Battles' },
                                { num: '5', label: 'War Fronts' },
                                { num: '65M', label: 'Soldiers' },
                            ].map(s => (
                                <div key={s.label} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(192,57,43,0.2)', borderRadius: '10px', padding: '1rem 1.4rem' }}>
                                    <div style={{ fontSize: '2rem', fontWeight: 900, color: '#c0392b', lineHeight: 1 }}>{s.num}</div>
                                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.3rem' }}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Front Overview Cards ── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
                    {[
                        { id: 'west',        icon: '⚔️', label: 'Western Front',  color: '#6ea8d8', battles: '12', note: 'Trench stalemate' },
                        { id: 'east',        icon: '🛡️', label: 'Eastern Front',  color: '#E6192B', battles: '9',  note: 'Mobile warfare' },
                        { id: 'middle-east', icon: '🌙', label: 'Middle East',     color: '#c9a84c', battles: '4',  note: 'Desert campaigns' },
                        { id: 'italian',     icon: '🏔️', label: 'Italian Front',  color: '#3d8c46', battles: '3',  note: 'Alpine warfare' },
                        { id: 'naval',       icon: '⚓', label: 'Naval',          color: '#4c9bc9', battles: '3',  note: 'Atlantic & North Sea' },
                    ].map(fr => (
                        <button key={fr.id} onClick={() => { setActiveFront(fr.id); setExpandedBattle(null); }}
                            style={{ background: activeFront === fr.id ? \`\${fr.color}18\` : 'rgba(255,255,255,0.02)', border: \`1px solid \${activeFront === fr.id ? fr.color : 'rgba(255,255,255,0.07)'}\`, borderTop: \`3px solid \${fr.color}\`, borderRadius: '10px', padding: '1rem 0.8rem', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s ease' }}>
                            <div style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>{fr.icon}</div>
                            <div style={{ color: activeFront === fr.id ? '#fff' : 'rgba(255,255,255,0.6)', fontWeight: 700, fontSize: '0.78rem', lineHeight: 1.2, marginBottom: '0.2rem' }}>{fr.label}</div>
                            <div style={{ color: fr.color, fontSize: '0.65rem', fontWeight: 800 }}>{fr.battles} Battles</div>
                            <div style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.62rem', marginTop: '0.2rem' }}>{fr.note}</div>
                        </button>
                    ))}
                </div>

`;

// Insert the hero banner right after the outer wrapper div and before the old header
const ANCHOR = `{/* Page Header */}`;
if (!c.includes(ANCHOR)) { console.error('Anchor not found'); process.exit(1); }
c = c.replace(ANCHOR, HERO + `{/* Removed old plain header, now integrated above */}\n                {false && (`);

// Also close the false && block after the old header closing div
c = c.replace(
    `<p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', margin: 0 }}>Select a front, then click a battle to explore</p>\n                </div>`,
    `<p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', margin: 0 }}>Select a front, then click a battle to explore</p>\n                </div>\n                )}`
);

// Remove the old plain front selector buttons (the flex row of 5 buttons) since the cards above now handle it
const OLD_SELECTOR_START = `{/* Front Selector */}`;
const OLD_SELECTOR_END = `)}\n                </div>\n\n                {/* Main Panel */}`;
const startIdx = c.indexOf(OLD_SELECTOR_START);
const endIdx = c.indexOf(OLD_SELECTOR_END);
if (startIdx !== -1 && endIdx !== -1) {
    c = c.slice(0, startIdx) + `\n                {/* Main Panel */}` + c.slice(endIdx + OLD_SELECTOR_END.length);
}

writeFileSync(f, c, 'utf-8');
console.log('Done! Battle page hero added.');
