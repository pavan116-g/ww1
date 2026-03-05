// Replace zigzag timeline with horizontal scroll timeline (Option A)
import { readFileSync, writeFileSync } from 'fs';
const f = 'c:/Users/pavan/ww1/src/components/PreWW1.jsx';
let c = readFileSync(f, 'utf-8');

// Find the start anchor of the timeline section
const START_ANCHOR = `{/* ── SECTION: INTERACTIVE TIMELINE ── */}`;
// Find the end anchor - the next section starts right after
const END_ANCHOR = `{/* ── SECTION: WAR STATISTICS ── */}`;

const startIdx = c.indexOf(START_ANCHOR);
const endIdx = c.indexOf(END_ANCHOR);

if (startIdx === -1 || endIdx === -1) {
    console.error('Anchors not found!', { startIdx, endIdx });
    process.exit(1);
}

const newTimeline = `{/* ── SECTION: INTERACTIVE TIMELINE ── */}
            <div style={{ marginTop: '2.5rem', marginBottom: '3.5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'inline-block', fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#c0392b', fontWeight: '700', marginBottom: '1rem', padding: '0.4rem 1.2rem', border: '1px solid rgba(163,22,33,0.35)', borderRadius: '100px', background: 'rgba(163,22,33,0.08)' }}>1914 – 1918</div>
                    <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: '#fff', fontWeight: 900, margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>The War Timeline</h2>
                    <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem', margin: 0 }}>Scroll horizontally to explore key events</p>
                </div>
                {/* Horizontal scroll container */}
                <div style={{ position: 'relative', overflowX: 'auto', overflowY: 'visible', paddingBottom: '1rem', scrollbarWidth: 'thin', scrollbarColor: '#c0392b44 transparent' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', minWidth: 'max-content', padding: '140px 3rem', position: 'relative' }}>
                        {/* Horizontal spine */}
                        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, transparent, #c0392b55 5%, #c0392b55 95%, transparent)', transform: 'translateY(-50%)', zIndex: 0 }} />
                        {[
                            { year: '1914', month: 'Jun', title: 'Assassination of Franz Ferdinand', color: '#c0392b', above: true },
                            { year: '1914', month: 'Aug', title: 'World War Begins', color: '#e74c3c', above: false },
                            { year: '1914', month: 'Sep', title: 'Battle of the Marne', color: '#c0392b', above: true },
                            { year: '1915', month: 'Apr', title: 'Gallipoli Campaign', color: '#c9a84c', above: false },
                            { year: '1915', month: 'Apr', title: 'First Poison Gas Attack', color: '#6ea8d8', above: true },
                            { year: '1916', month: 'Feb', title: 'Battle of Verdun Begins', color: '#6ea8d8', above: false },
                            { year: '1916', month: 'Jul', title: 'Battle of the Somme', color: '#c0392b', above: true },
                            { year: '1916', month: 'Sep', title: 'Tanks First Used', color: '#3d8c46', above: false },
                            { year: '1917', month: 'Apr', title: 'USA Enters the War', color: '#c9a84c', above: true },
                            { year: '1917', month: 'Nov', title: 'Russian Revolution', color: '#e74c3c', above: false },
                            { year: '1918', month: 'Mar', title: 'Spring Offensive', color: '#c0392b', above: true },
                            { year: '1918', month: 'Nov', title: 'Armistice — War Ends', color: '#3d8c46', above: false },
                        ].map((ev, i) => (
                            <div key={i} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: i < 11 ? '3rem' : 0, zIndex: 1 }}>
                                {/* Card ABOVE the spine */}
                                {ev.above && (
                                    <div style={{ marginBottom: '1rem', width: '130px', background: 'rgba(10,10,16,0.92)', border: \`1px solid \${ev.color}40\`, borderTop: \`2px solid \${ev.color}\`, borderRadius: '8px', padding: '0.6rem 0.8rem', backdropFilter: 'blur(8px)' }}>
                                        <div style={{ fontSize: '0.55rem', fontWeight: 800, color: ev.color, textTransform: 'uppercase', letterSpacing: '0.12em', background: \`\${ev.color}18\`, padding: '0.12rem 0.5rem', borderRadius: '20px', display: 'inline-block', marginBottom: '0.35rem' }}>{ev.month} {ev.year}</div>
                                        <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.72rem', lineHeight: 1.35 }}>{ev.title}</div>
                                    </div>
                                )}
                                {!ev.above && <div style={{ height: '80px' }} />}

                                {/* Dot on the spine */}
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: ev.color, boxShadow: \`0 0 0 3px rgba(0,0,0,0.9), 0 0 10px \${ev.color}99\`, flexShrink: 0, zIndex: 2 }} />

                                {/* Card BELOW the spine */}
                                {!ev.above && (
                                    <div style={{ marginTop: '1rem', width: '130px', background: 'rgba(10,10,16,0.92)', border: \`1px solid \${ev.color}40\`, borderBottom: \`2px solid \${ev.color}\`, borderRadius: '8px', padding: '0.6rem 0.8rem', backdropFilter: 'blur(8px)' }}>
                                        <div style={{ fontSize: '0.55rem', fontWeight: 800, color: ev.color, textTransform: 'uppercase', letterSpacing: '0.12em', background: \`\${ev.color}18\`, padding: '0.12rem 0.5rem', borderRadius: '20px', display: 'inline-block', marginBottom: '0.35rem' }}>{ev.month} {ev.year}</div>
                                        <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.72rem', lineHeight: 1.35 }}>{ev.title}</div>
                                    </div>
                                )}
                                {ev.above && <div style={{ height: '80px' }} />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            `;

// Replace old timeline section with new one
const before = c.slice(0, startIdx);
const after = c.slice(endIdx);
const updated = before + newTimeline + after;
writeFileSync(f, updated, 'utf-8');
console.log('Horizontal scroll timeline applied!');
