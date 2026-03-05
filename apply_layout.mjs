import { readFileSync, writeFileSync } from 'fs';

const filePath = 'c:/Users/pavan/ww1/src/components/PreWW1.jsx';
const content = readFileSync(filePath, 'utf-8');
const lines = content.split(/\r?\n/);

// Find start and end of old activeFront block
const startIdx = lines.findIndex(l => l.trimStart().startsWith('{activeFront && (() => {'));
// Find the matching `})()}` that closes it (same indent level)
const indent = lines[startIdx].match(/^(\s*)/)[1].length;
let endIdx = -1;
for (let i = startIdx + 1; i < lines.length; i++) {
    const trimmed = lines[i].trimStart();
    const lineIndent = lines[i].match(/^(\s*)/)[1].length;
    if (lineIndent === indent && trimmed === '})()}') {
        endIdx = i;
        break;
    }
}

console.log(`Replacing lines ${startIdx + 1} to ${endIdx + 1} (0-indexed: ${startIdx}-${endIdx})`);

const newSection = `                {activeFront && (() => {
                    const b = expandedBattle ? battles.find(x => x.name === expandedBattle) : null;
                    const centralColor = '#E6192B';
                    const mapAlliedColor = activeFront === 'east' ? '#4a90d9' : accent;
                    const tugAlliedColor = activeFront === 'east' ? '#4a90d9' : accent;
                    const mapCfg = { rotate: [-30, -42, 0], scale: 1350 };
                    return (
                        <div style={{ marginTop: '1.5rem', background: 'rgba(255,255,255,0.015)', border: \`1px solid \${borderColor}\`, borderTop: \`4px solid \${topBorder}\`, borderRadius: '12px', overflow: 'hidden' }}>
                            <div style={{ display: 'flex', minHeight: '480px' }}>
                                <div style={{ width: '260px', flexShrink: 0, borderRight: \`1px solid \${borderColor}\`, overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: \`\${accent}33 transparent\` }}>
                                    <div style={{ padding: '0.9rem 1.2rem 0.6rem', borderBottom: \`1px solid \${accent}18\` }}>
                                        <div style={{ fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: accent, fontWeight: 700, opacity: 0.65 }}>
                                            {activeFront === 'west' ? 'Western Front' : activeFront === 'east' ? 'Eastern Front' : activeFront === 'middle-east' ? 'Middle East' : activeFront === 'naval' ? 'Naval Warfare' : 'Italian Front'} · {battles.length} Battles
                                        </div>
                                    </div>
                                    {battles.map((battle, idx) => {
                                        const isActive = expandedBattle === battle.name;
                                        return (
                                            <div key={battle.name}
                                                onClick={() => setExpandedBattle(n => n === battle.name ? null : battle.name)}
                                                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = \`\${accent}09\`; }}
                                                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                                                style={{ padding: '0.75rem 1.2rem', cursor: 'pointer', transition: 'background 0.15s ease', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: \`1px solid \${accent}0d\`, position: 'relative', background: isActive ? \`\${accent}14\` : 'transparent' }}
                                            >
                                                <div style={{ position: 'absolute', left: 0, top: '18%', bottom: '18%', width: isActive ? '3px' : '0', background: accent, borderRadius: '0 2px 2px 0', transition: 'width 0.2s ease' }} />
                                                <span style={{ color: accent, opacity: isActive ? 0.55 : 0.18, fontWeight: 900, fontSize: '0.88rem', width: '1.4rem', flexShrink: 0, textAlign: 'right' }}>{String(idx + 1).padStart(2, '0')}</span>
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <div style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.65)', fontWeight: isActive ? 700 : 400, fontSize: '0.82rem', lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{battle.name}</div>
                                                    <div style={{ color: accent, fontSize: '0.65rem', opacity: isActive ? 0.75 : 0.35, marginTop: '0.1rem' }}>{battle.date}</div>
                                                </div>
                                                {isActive && <span style={{ color: accent, fontSize: '0.85rem', flexShrink: 0 }}>›</span>}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#08080f' }}>
                                    <ComposableMap projection="geoAzimuthalEqualArea" projectionConfig={mapCfg} style={{ width: '100%', height: '480px', outline: 'none', display: 'block' }}>
                                        <Geographies geography={geoUrl}>
                                            {({ geographies }) => geographies.map(geo => {
                                                const nm = geo.properties.name;
                                                let fill = '#111120', hover = '#181828', stroke = '#1e1e30';
                                                if (expandedBattle && battleMapData[expandedBattle]) {
                                                    const md = battleMapData[expandedBattle];
                                                    if (md.allies.includes(nm)) { fill = mapAlliedColor; hover = \`\${mapAlliedColor}cc\`; stroke = '#fff'; }
                                                    else if (md.central.includes(nm)) { fill = centralColor; hover = \`\${centralColor}cc\`; stroke = '#fff'; }
                                                }
                                                return (
                                                    <Geography key={geo.rsmKey} geography={geo} fill={fill} stroke={stroke} strokeWidth={0.5}
                                                        data-tooltip-id="my-tooltip" data-tooltip-content={nm}
                                                        style={{ default: { outline: 'none', transition: 'fill 0.4s ease' }, hover: { fill: hover, outline: 'none', cursor: 'default' }, pressed: { outline: 'none' } }} />
                                                );
                                            })}
                                        </Geographies>
                                    </ComposableMap>
                                    {expandedBattle && (
                                        <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 10 }}>
                                            <div style={{ background: 'rgba(10,10,14,0.85)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '0.35rem 0.9rem', backdropFilter: 'blur(8px)', display: 'flex', gap: '0.9rem', alignItems: 'center' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                    <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: mapAlliedColor }} />
                                                    <span style={{ color: mapAlliedColor, fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase' }}>Allied</span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                    <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: centralColor }} />
                                                    <span style={{ color: centralColor, fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase' }}>Central</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {!expandedBattle && (
                                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                                            <div style={{ background: 'rgba(10,10,14,0.7)', backdropFilter: 'blur(8px)', border: \`1px solid \${accent}22\`, borderRadius: '12px', padding: '1rem 1.8rem', textAlign: 'center' }}>
                                                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Select a battle from the list</div>
                                                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.3rem' }}>Countries will highlight on the map</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {b && (
                                <div style={{ borderTop: \`1px solid \${accent}22\`, background: 'linear-gradient(to right,#0e0e1a,#09090f)' }}>
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ flex: 1, padding: '1.5rem 2rem', borderRight: \`1px solid \${accent}18\` }}>
                                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.9rem' }}>
                                                <div>
                                                    <h2 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 900, margin: '0 0 0.35rem', lineHeight: 1.2 }}>{b.name}</h2>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                                                        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem' }}>{b.dateRange}</span>
                                                        <span style={{ width: '1px', height: '10px', background: 'rgba(255,255,255,0.12)' }} />
                                                        <span style={{ background: \`\${accent}1e\`, border: \`1px solid \${accent}44\`, color: accent, fontSize: '0.68rem', fontWeight: 800, padding: '0.15rem 0.8rem', borderRadius: '20px' }}>Victory: {b.victor}</span>
                                                    </div>
                                                </div>
                                                <button onClick={() => setExpandedBattle(null)}
                                                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.85rem' }}
                                                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; e.currentTarget.style.color = '#fff'; }}
                                                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}>✕</button>
                                            </div>
                                            <div style={{ height: '1px', background: \`linear-gradient(to right,\${accent}30,transparent)\`, marginBottom: '1rem' }} />
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                                <div>
                                                    <div style={{ fontSize: '0.52rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', fontWeight: 700, marginBottom: '0.7rem' }}>Key Facts</div>
                                                    {(b.facts || [b.note]).map((f, i) => (
                                                        <div key={i} style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.5rem' }}>
                                                            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: accent, flexShrink: 0, marginTop: '0.5rem', opacity: 0.6 }} />
                                                            <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.82rem', lineHeight: 1.65 }}>{f}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                {(b.result || []).length > 0 && (
                                                    <div>
                                                        <div style={{ fontSize: '0.52rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: accent, fontWeight: 700, marginBottom: '0.7rem', opacity: 0.8 }}>Result</div>
                                                        {(b.result || []).map((r, i) => (
                                                            <div key={i} style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.5rem' }}>
                                                                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: accent, flexShrink: 0, marginTop: '0.5rem' }} />
                                                                <span style={{ color: \`\${accent}cc\`, fontSize: '0.82rem', lineHeight: 1.65 }}>{r}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            {b.img && (
                                                <div style={{ marginTop: '1rem', borderRadius: '8px', overflow: 'hidden', border: \`1px solid \${accent}22\`, maxHeight: '160px' }}>
                                                    <img src={encodeURI(b.img)} alt={b.name} style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block', filter: 'grayscale(10%) brightness(0.85)' }} onError={e => { e.target.parentElement.style.display = 'none'; }} />
                                                </div>
                                            )}
                                        </div>
                                        {(() => {
                                            const md = battleMapData[expandedBattle];
                                            if (!md || md.momentum === undefined) return null;
                                            return (
                                                <div style={{ width: '270px', flexShrink: 0, padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.2rem' }}>
                                                    <div style={{ fontSize: '0.5rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', fontWeight: 700 }}>Tug of War · Momentum</div>
                                                    <div>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                                                            <span style={{ fontSize: '0.68rem', fontWeight: 800, color: tugAlliedColor, textTransform: 'uppercase' }}>Allied</span>
                                                            <span style={{ fontSize: '0.68rem', fontWeight: 800, color: centralColor, textTransform: 'uppercase' }}>Central</span>
                                                        </div>
                                                        <div style={{ height: '14px', borderRadius: '7px', background: 'rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                                                            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: \`\${100 - md.momentum}%\`, background: \`linear-gradient(90deg,\${tugAlliedColor},\${tugAlliedColor}bb)\`, transition: 'width 1.2s cubic-bezier(0.2,0.8,0.2,1)' }} />
                                                            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: \`\${md.momentum}%\`, background: \`linear-gradient(-90deg,\${centralColor},\${centralColor}bb)\`, transition: 'width 1.2s cubic-bezier(0.2,0.8,0.2,1)' }} />
                                                            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'rgba(255,255,255,0.4)', zIndex: 5, transform: 'translateX(-50%)' }} />
                                                            <div style={{ position: 'absolute', left: \`\${100 - md.momentum}%\`, top: '50%', transform: 'translate(-50%,-50%)', width: '5px', height: '20px', background: '#fff', borderRadius: '2px', transition: 'left 1.2s cubic-bezier(0.2,0.8,0.2,1)', zIndex: 6 }} />
                                                        </div>
                                                        <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                                                            <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.45)', fontStyle: 'italic' }}>{md.momentum === 50 ? 'Brutal stalemate.' : md.momentum > 50 ? 'Favoring Central Powers.' : 'Favoring Allied Forces.'}</span>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex', gap: '0.6rem' }}>
                                                        <div style={{ flex: 1, background: \`\${tugAlliedColor}12\`, border: \`1px solid \${tugAlliedColor}33\`, borderRadius: '8px', padding: '0.6rem', textAlign: 'center' }}>
                                                            <div style={{ fontSize: '0.52rem', color: tugAlliedColor, fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.2rem' }}>Allied</div>
                                                            <div style={{ fontSize: '1rem', fontWeight: 900, color: tugAlliedColor }}>{100 - md.momentum}%</div>
                                                        </div>
                                                        <div style={{ flex: 1, background: \`\${centralColor}12\`, border: \`1px solid \${centralColor}33\`, borderRadius: '8px', padding: '0.6rem', textAlign: 'center' }}>
                                                            <div style={{ fontSize: '0.52rem', color: centralColor, fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.2rem' }}>Central</div>
                                                            <div style={{ fontSize: '1rem', fontWeight: 900, color: centralColor }}>{md.momentum}%</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })()}`;

const newLines = lines.slice(0, startIdx).concat(newSection.split('\n')).concat(lines.slice(endIdx + 1));
writeFileSync(filePath, newLines.join('\r\n'), 'utf-8');
console.log(`Done! Replaced lines ${startIdx + 1}-${endIdx + 1}. New total: ${newLines.length} lines`);
