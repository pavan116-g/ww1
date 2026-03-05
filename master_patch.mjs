// Master patch: applies ALL changes to PreWW1.jsx from the clean git state
// Uses a short unique anchor text instead of multiline - CRLF safe
import { readFileSync, writeFileSync } from 'fs';

const f = 'c:/Users/pavan/ww1/src/components/PreWW1.jsx';
let c = readFileSync(f, 'utf-8');

// ─── STEP 1: Fix country name mismatches ──────────────────────────────────
c = c.replaceAll('"Bosnia and Herzegovina"', '"Bosnia and Herz."');
c = c.replaceAll('"United States"', '"United States of America"');
console.log('Step 1: country name fixes');

// ─── STEP 2: Per-front map projection ─────────────────────────────────────
c = c.replace(
    `const mapCfg = { rotate: [-30, -42, 0], scale: 1350 };`,
    `const mapCfg =
                        activeFront === 'west'         ? { rotate: [-5,  -48, 0], scale: 2800 } :
                        activeFront === 'east'         ? { rotate: [-28, -52, 0], scale: 1900 } :
                        activeFront === 'middle-east'  ? { rotate: [-38, -35, 0], scale: 1800 } :
                        activeFront === 'italian'      ? { rotate: [-13, -45, 0], scale: 3200 } :
                                                         { rotate: [-15, -52, 0], scale: 1400 };`
);
console.log('Step 2: per-front projection');

// ─── STEP 3: Insert 4 new sections before </div> closing the main container
// Anchor = unique short string found on one line in the clean file
const ANCHOR = `            <style>{\``;
if (!c.includes(ANCHOR)) {
    console.error('Anchor not found! Cannot insert sections.');
    process.exit(1);
}

const newSectionsBeforeAnchor = `
            {/* ── SECTION: INTERACTIVE TIMELINE ── */}
            <div style={{ marginTop: '5rem', marginBottom: '5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{ display: 'inline-block', fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#c0392b', fontWeight: '700', marginBottom: '1rem', padding: '0.4rem 1.2rem', border: '1px solid rgba(163,22,33,0.35)', borderRadius: '100px', background: 'rgba(163,22,33,0.08)' }}>1914 – 1918</div>
                    <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: '#fff', fontWeight: 900, margin: '0 0 0.8rem', letterSpacing: '-0.02em' }}>The War Timeline</h2>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1rem', margin: 0 }}>Key moments that shaped the Great War</p>
                </div>
                <div style={{ position: 'relative', paddingBottom: '2rem' }}>
                    <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom, transparent, rgba(163,22,33,0.6) 8%, rgba(163,22,33,0.6) 92%, transparent)', transform: 'translateX(-50%)' }} />
                    {[
                        { year: '1914', month: 'Jun', title: 'Assassination of Archduke Franz Ferdinand', desc: 'Gavrilo Princip shoots Archduke Franz Ferdinand in Sarajevo, triggering a diplomatic crisis that sets Europe ablaze.', side: 'left', color: '#c0392b' },
                        { year: '1914', month: 'Aug', title: 'World War Begins', desc: 'Germany declares war on Russia and France. Britain declares war on Germany after Belgium is invaded. The Great War begins.', side: 'right', color: '#e74c3c' },
                        { year: '1914', month: 'Sep', title: 'Battle of the Marne', desc: 'Allied forces halt the German advance into France. The war of movement ends and brutal trench warfare begins.', side: 'left', color: '#c0392b' },
                        { year: '1915', month: 'Apr', title: 'Gallipoli Campaign', desc: 'ANZAC and Allied troops land at Gallipoli. The campaign ends in an Ottoman victory after 8 months and 250,000 Allied casualties.', side: 'right', color: '#c9a84c' },
                        { year: '1915', month: 'Apr', title: 'First Use of Poison Gas', desc: 'Germany deploys chlorine gas at the Second Battle of Ypres — a terrifying shift in modern warfare that both sides quickly adopt.', side: 'left', color: '#6ea8d8' },
                        { year: '1916', month: 'Feb', title: 'Battle of Verdun Begins', desc: 'The longest battle of the war — 300 days of brutal fighting. France holds the line at enormous cost to both sides.', side: 'right', color: '#6ea8d8' },
                        { year: '1916', month: 'Jul', title: 'Battle of the Somme', desc: '57,470 British casualties on the first day alone — the bloodiest single day in British military history. Over 1 million total casualties.', side: 'left', color: '#c0392b' },
                        { year: '1916', month: 'Sep', title: 'Tanks First Used in Battle', desc: 'British Mark I tanks make their debut on the Somme — slow, unreliable, but psychologically devastating and historically revolutionary.', side: 'right', color: '#3d8c46' },
                        { year: '1917', month: 'Apr', title: 'United States Enters the War', desc: 'Congress declares war on Germany. Unrestricted U-boat warfare and the Zimmermann Telegram finally tip American public opinion.', side: 'left', color: '#c9a84c' },
                        { year: '1917', month: 'Nov', title: 'Russian Revolution', desc: 'The Bolsheviks seize power. Russia collapses into revolution and eventually signs the Treaty of Brest-Litovsk with Germany.', side: 'right', color: '#e74c3c' },
                        { year: '1918', month: 'Mar', title: 'Spring Offensive (Kaiserschlacht)', desc: "Germany's last great gamble — massive gains in days, but fresh American troops and Allied reserves ultimately hold the line.", side: 'left', color: '#c0392b' },
                        { year: '1918', month: 'Nov', title: 'Armistice — War Ends', desc: 'At 11:00 AM on the 11th day of the 11th month, the guns fall silent across Europe. Over 17 million dead.', side: 'right', color: '#3d8c46' },
                    ].map((ev, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: ev.side === 'left' ? 'flex-end' : 'flex-start', marginBottom: '2.5rem', position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '50%', top: '1.2rem', transform: 'translateX(-50%)', width: '12px', height: '12px', borderRadius: '50%', background: ev.color, boxShadow: \`0 0 0 4px rgba(0,0,0,0.8), 0 0 12px \${ev.color}88\`, zIndex: 2 }} />
                            <div style={{ width: 'calc(50% - 2.5rem)', background: 'rgba(255,255,255,0.03)', border: \`1px solid \${ev.color}30\`, borderLeft: ev.side === 'left' ? \`3px solid \${ev.color}\` : undefined, borderRight: ev.side === 'right' ? \`3px solid \${ev.color}\` : undefined, borderRadius: '10px', padding: '1.1rem 1.4rem' }}>
                                <span style={{ fontSize: '0.6rem', fontWeight: 800, color: ev.color, textTransform: 'uppercase', letterSpacing: '0.15em', background: \`\${ev.color}18\`, padding: '0.15rem 0.6rem', borderRadius: '20px' }}>{ev.month} {ev.year}</span>
                                <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.92rem', margin: '0.4rem 0 0.3rem', lineHeight: 1.3 }}>{ev.title}</div>
                                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', lineHeight: 1.65 }}>{ev.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── SECTION: WAR STATISTICS ── */}
            <div style={{ marginBottom: '5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{ display: 'inline-block', fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#c0392b', fontWeight: '700', marginBottom: '1rem', padding: '0.4rem 1.2rem', border: '1px solid rgba(163,22,33,0.35)', borderRadius: '100px', background: 'rgba(163,22,33,0.08)' }}>The Human Cost</div>
                    <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: '#fff', fontWeight: 900, margin: '0 0 0.8rem', letterSpacing: '-0.02em' }}>War by the Numbers</h2>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1rem', margin: 0 }}>The staggering scale of the Great War</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                    {[
                        { num: '17M+', label: 'Total Deaths', sub: 'Military & civilian combined', color: '#c0392b' },
                        { num: '21M+', label: 'Wounded', sub: 'Surviving casualties', color: '#e67e22' },
                        { num: '65M', label: 'Mobilised', sub: 'Total soldiers deployed', color: '#6ea8d8' },
                        { num: '4 yrs', label: 'Duration', sub: 'Jul 1914 – Nov 1918', color: '#3d8c46' },
                    ].map(stat => (
                        <div key={stat.label} style={{ background: 'rgba(255,255,255,0.03)', border: \`1px solid \${stat.color}33\`, borderTop: \`3px solid \${stat.color}\`, borderRadius: '12px', padding: '1.8rem 1.4rem', textAlign: 'center' }}>
                            <div style={{ fontSize: 'clamp(2rem,3.5vw,2.8rem)', fontWeight: 900, color: stat.color, lineHeight: 1, marginBottom: '0.5rem' }}>{stat.num}</div>
                            <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.3rem' }}>{stat.label}</div>
                            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem' }}>{stat.sub}</div>
                        </div>
                    ))}
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '2rem 2.5rem' }}>
                    <div style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontWeight: 700, marginBottom: '1.8rem' }}>Military Deaths by Nation (estimated)</div>
                    {[
                        { flag: '🇩🇪', name: 'Germany', dead: 1773700, max: 1773700, side: 'Central', color: '#E6192B' },
                        { flag: '🇷🇺', name: 'Russia', dead: 1700000, max: 1773700, side: 'Allied', color: '#6ea8d8' },
                        { flag: '🇫🇷', name: 'France', dead: 1357800, max: 1773700, side: 'Allied', color: '#6ea8d8' },
                        { flag: '🇦🇹', name: 'Austria-Hungary', dead: 1200000, max: 1773700, side: 'Central', color: '#E6192B' },
                        { flag: '🇬🇧', name: 'United Kingdom', dead: 885000, max: 1773700, side: 'Allied', color: '#6ea8d8' },
                        { flag: '🇮🇹', name: 'Italy', dead: 651000, max: 1773700, side: 'Allied', color: '#6ea8d8' },
                        { flag: '🇷🇴', name: 'Romania', dead: 335706, max: 1773700, side: 'Allied', color: '#6ea8d8' },
                        { flag: '🇹🇷', name: 'Ottoman Empire', dead: 325000, max: 1773700, side: 'Central', color: '#E6192B' },
                        { flag: '🇺🇸', name: 'United States', dead: 116516, max: 1773700, side: 'Allied', color: '#6ea8d8' },
                        { flag: '🇧🇬', name: 'Bulgaria', dead: 87500, max: 1773700, side: 'Central', color: '#E6192B' },
                    ].map(row => (
                        <div key={row.name} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{row.flag}</span>
                            <div style={{ width: '130px', flexShrink: 0 }}>
                                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem' }}>{row.name}</span>
                                <span style={{ marginLeft: '0.4rem', fontSize: '0.6rem', color: row.color, fontWeight: 700 }}>{row.side.toUpperCase()}</span>
                            </div>
                            <div style={{ flex: 1, height: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '5px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: \`\${(row.dead / row.max) * 100}%\`, background: \`linear-gradient(90deg, \${row.color}, \${row.color}99)\`, borderRadius: '5px' }} />
                            </div>
                            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', flexShrink: 0, minWidth: '80px', textAlign: 'right' }}>{row.dead.toLocaleString()}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── SECTION: KEY FIGURES ── */}
            {(() => {
                const [expandedFigure, setExpandedFigure] = React.useState(null);
                const figures = {
                    allied: [
                        { id: 'haig', name: 'Sir Douglas Haig', role: 'British Commander-in-Chief', flag: '🇬🇧', img: '/Sir_Douglas_Haig.jpg', bio: "Commanded British forces on the Western Front from 1915 to the war end. His tactics at the Somme and Passchendaele drew fierce criticism for massive casualties, yet he led the Hundred Days Offensive that ultimately broke Germany's resistance.", fact: '402,000 British casualties on the Somme under his command' },
                        { id: 'joffre', name: 'Joseph Joffre', role: 'French Commander-in-Chief', flag: '🇫🇷', img: '/Portrait_de_Joseph_Joffre_(cropped)(b).jpg', bio: "The 'Victor of the Marne', Joffre stabilised the Western Front after early German advances and organised the decisive counter-attack at the Marne in 1914. He was replaced in 1916 after Verdun's stalemate became politically untenable.", fact: 'Orchestrated the miracle retreat and counter-attack of the Marne' },
                        { id: 'pershing', name: 'John J. Pershing', role: 'US Expeditionary Force Commander', flag: '🇺🇸', img: '/250px-General_John_Joseph_Pershing_head_on_shoulders.jpg', bio: "Commanded the American Expeditionary Forces in France. He insisted on keeping US troops as an independent army rather than distributing them among Allied units. His nickname 'Black Jack' came from his command of Buffalo Soldiers.", fact: 'Led 2 million US troops to Europe by the war end' },
                        { id: 'brusilov', name: 'Aleksei Brusilov', role: 'Russian General', flag: '🇷🇺', img: '/\u0411\u0440\u0443\u0441\u0438\u043b\u043e\u0432_\u0410\u043b\u0435\u043a\u0441\u0435\u0439_\u0410\u043b\u0435\u043a\u0441\u0435\u0435\u0432\u0438\u0447.jpg', bio: "Mastermind of the 1916 Brusilov Offensive — considered one of the most effective military operations of the entire war. His multi-point attack shattered the Austro-Hungarian army and remains a landmark in military strategy.", fact: 'Offensive killed/captured over 1 million Austro-Hungarian troops' },
                    ],
                    central: [
                        { id: 'kaiser', name: 'Kaiser Wilhelm II', role: 'German Emperor & Supreme Warlord', flag: '🇩🇪', img: '/Kaiser_Wilhelm_II_of_Germany_-_1902_(cropped).jpg', bio: "Germany's last emperor and the titular head of the Central Powers. His erratic diplomacy, militarism, and dismissal of Bismarck's careful alliance system directly contributed to the war's outbreak. He abdicated two days before the Armistice.", fact: 'Abdicated on 9 Nov 1918, two days before the Armistice' },
                        { id: 'hindenburg', name: 'Paul von Hindenburg', role: 'German Field Marshal', flag: '🇩🇪', img: '/Bundesarchiv_Bild_183-C06886,_Paul_v._Hindenburg_(cropped)(2).jpg', bio: "The old Prussian hero recalled from retirement who triumphed at Tannenberg, crushing two entire Russian armies. Later became Germany's Chief of Staff with Ludendorff, effectively running the war by 1916, and later president of the Weimar Republic.", fact: 'The Tannenberg victory took 92,000 Russian prisoners in 3 days' },
                        { id: 'ludendorff', name: 'Erich Ludendorff', role: 'German Quartermaster General', flag: '🇩🇪', img: '/Erich_Ludendorff_1924_Portrait_(3x4_cropped)(2).jpg', bio: "The strategic mastermind behind Eastern Front victories and the brutal 1918 Spring Offensive (Kaiserschlacht). His innovative Stormtrooper infiltration tactics nearly broke the Allied line before US reserves proved decisive.", fact: 'Designed the Stormtrooper infiltration tactics still studied today' },
                        { id: 'ataturk', name: 'Mustafa Kemal (Ataturk)', role: 'Ottoman Commander — Gallipoli', flag: '🇹🇷', img: '/Ataturk1930s.jpg', bio: "Defender of Gallipoli who became the most celebrated military figure the Ottoman Empire produced. His order 'I do not order you to attack. I order you to die' to his 57th Division held the line. He later founded modern Turkey.", fact: 'His defence of Gallipoli earned the Turks a decisive victory in 1915' },
                    ],
                };
                return (
                    <div style={{ marginBottom: '5rem' }}>
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <div style={{ display: 'inline-block', fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#c0392b', fontWeight: '700', marginBottom: '1rem', padding: '0.4rem 1.2rem', border: '1px solid rgba(163,22,33,0.35)', borderRadius: '100px', background: 'rgba(163,22,33,0.08)' }}>The Commanders</div>
                            <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: '#fff', fontWeight: 900, margin: '0 0 0.8rem', letterSpacing: '-0.02em' }}>Key Figures</h2>
                            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1rem', margin: 0 }}>The generals and leaders who shaped the course of the war</p>
                        </div>
                        {[
                            { label: 'Allied Powers', people: figures.allied, accent: '#6ea8d8' },
                            { label: 'Central Powers', people: figures.central, accent: '#E6192B' },
                        ].map(group => (
                            <div key={group.label} style={{ marginBottom: '2.5rem' }}>
                                <div style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: group.accent, fontWeight: 700, marginBottom: '1.2rem', opacity: 0.8 }}>{group.label}</div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '1.2rem' }}>
                                    {group.people.map(p => {
                                        const isOpen = expandedFigure === p.id;
                                        return (
                                            <div key={p.id} onClick={() => setExpandedFigure(n => n === p.id ? null : p.id)}
                                                style={{ background: isOpen ? \`\${group.accent}12\` : 'rgba(255,255,255,0.03)', border: \`1px solid \${isOpen ? group.accent + '55' : 'rgba(255,255,255,0.07)'}\`, borderRadius: '12px', padding: '1.4rem', cursor: 'pointer', transition: 'all 0.25s ease' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                    {p.img
                                                        ? <img src={p.img} alt={p.name} style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: \`2px solid \${group.accent}55\`, flexShrink: 0, filter: 'grayscale(20%)' }} onError={e => { e.target.style.display = 'none'; }} />
                                                        : <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: \`\${group.accent}22\`, border: \`2px solid \${group.accent}44\`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>{p.flag}</div>
                                                    }
                                                    <div style={{ flex: 1, minWidth: 0 }}>
                                                        <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.2 }}>{p.name}</div>
                                                        <div style={{ color: group.accent, fontSize: '0.72rem', marginTop: '0.2rem', opacity: 0.75 }}>{p.role}</div>
                                                    </div>
                                                    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '1rem', transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>›</span>
                                                </div>
                                                {isOpen && (
                                                    <div style={{ marginTop: '1rem' }}>
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
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                );
            })()}

            {/* ── SECTION: WEAPONS & TECHNOLOGY ── */}
            <div style={{ marginBottom: '5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{ display: 'inline-block', fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#c0392b', fontWeight: '700', marginBottom: '1rem', padding: '0.4rem 1.2rem', border: '1px solid rgba(163,22,33,0.35)', borderRadius: '100px', background: 'rgba(163,22,33,0.08)' }}>Innovation & Destruction</div>
                    <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: '#fff', fontWeight: 900, margin: '0 0 0.8rem', letterSpacing: '-0.02em' }}>Weapons & Technology</h2>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1rem', margin: 0 }}>WW1 introduced industrialised killing on an unprecedented scale</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '1.5rem' }}>
                    {[
                        { icon: '🛡️', name: 'The Tank', color: '#6ea8d8', first: 'Somme — Sep 1916', desc: "Britain's Mark I tank changed warfare forever. Slow (6 km/h), unreliable, but psychologically devastating — able to cross trenches and barbed wire that had killed thousands.", stats: [{ label: 'Top Speed', val: '6 km/h' }, { label: 'Crew', val: '8 men' }, { label: 'Deployed at Somme', val: '49 tanks' }] },
                        { icon: '☣️', name: 'Poison Gas', color: '#8ac47a', first: 'Ypres — Apr 1915', desc: "Germany first used chlorine gas, visible as a greenish cloud. Phosgene and mustard gas followed. Gas caused blindness, lung damage, and horrific deaths — yet the wind made it unpredictable.", stats: [{ label: 'Gas casualties (WW1)', val: '1.3 million' }, { label: 'Deaths by gas', val: '91,000' }, { label: 'Types used', val: '50+ chemicals' }] },
                        { icon: '✈️', name: 'Military Aviation', color: '#c9a84c', first: 'Frontline recon — 1914', desc: "Planes began as unarmed reconnaissance tools. Within a year, fighters like the Fokker Eindecker were shooting down enemies. By 1918, strategic bombing of cities had begun.", stats: [{ label: 'Red Baron victories', val: '80 kills' }, { label: 'Aircraft built (UK)', val: '55,000' }, { label: 'Bombing raids on Britain', val: '208' }] },
                        { icon: '🚢', name: 'U-Boats', color: '#E6192B', first: 'Atlantic — 1914', desc: "German submarines nearly strangled Britain's supply lines. Unrestricted U-boat warfare in 1917 sank 1 in 4 ships entering British waters — and ultimately pulled the USA into the war.", stats: [{ label: 'Ships sunk', val: '5,000+' }, { label: 'U-boats lost', val: '178' }, { label: 'Allied sailors killed', val: '15,000+' }] },
                    ].map(w => (
                        <div key={w.name} style={{ background: 'rgba(255,255,255,0.03)', border: \`1px solid \${w.color}30\`, borderTop: \`3px solid \${w.color}\`, borderRadius: '14px', padding: '2rem 1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'background 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.background = \`\${w.color}09\`}
                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '2.5rem' }}>{w.icon}</span>
                                <span style={{ fontSize: '0.6rem', color: w.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', background: \`\${w.color}15\`, padding: '0.25rem 0.75rem', borderRadius: '20px' }}>First: {w.first}</span>
                            </div>
                            <h3 style={{ color: '#fff', fontWeight: 900, fontSize: '1.3rem', margin: 0 }}>{w.name}</h3>
                            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.84rem', lineHeight: 1.75, margin: 0, flex: 1 }}>{w.desc}</p>
                            <div style={{ borderTop: \`1px solid \${w.color}20\`, paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {w.stats.map(s => (
                                    <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>{s.label}</span>
                                        <span style={{ color: w.color, fontWeight: 700, fontSize: '0.82rem' }}>{s.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            `;

// Insert the new sections right before the <style> tag
const updated = c.replace(ANCHOR, newSectionsBeforeAnchor + ANCHOR);
if (updated === c) {
    console.error('Replacement had no effect!');
    process.exit(1);
}
writeFileSync(f, updated, 'utf-8');
const lineCount = updated.split('\n').length;
console.log(`All changes applied! File now has ~${lineCount} lines.`);
