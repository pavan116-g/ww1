import React, { useState } from 'react';

const FIGURES = {
    allied: [
        { id: 'haig', name: 'Sir Douglas Haig', role: 'British Commander-in-Chief', flag: '🇬🇧', img: '/Sir_Douglas_Haig.jpg', bio: "Commanded British forces on the Western Front from 1915 to the war end. His tactics at the Somme and Passchendaele drew fierce criticism for massive casualties, yet he led the Hundred Days Offensive that ultimately broke Germany's resistance.", fact: '402,000 British casualties on the Somme under his command' },
        { id: 'joffre', name: 'Joseph Joffre', role: 'French Commander-in-Chief', flag: '🇫🇷', img: '/Portrait_de_Joseph_Joffre_(cropped)(b).jpg', bio: "The 'Victor of the Marne', Joffre stabilised the Western Front and organised the decisive counter-attack at the Marne in 1914. He was replaced in 1916 after Verdun's stalemate became politically untenable.", fact: 'Orchestrated the miracle retreat and counter-attack of the Marne' },
        { id: 'pershing', name: 'John J. Pershing', role: 'US Expeditionary Force Commander', flag: '🇺🇸', img: '/250px-General_John_Joseph_Pershing_head_on_shoulders.jpg', bio: "Commanded the American Expeditionary Forces in France. He insisted on keeping US troops as an independent army. His nickname 'Black Jack' came from his command of Buffalo Soldiers.", fact: 'Led 2 million US troops to Europe by the war end' },
        { id: 'brusilov', name: 'Aleksei Brusilov', role: 'Russian General', flag: '🇷🇺', img: '/Брусилов_Алексей_Алексеевич.jpg', bio: "Mastermind of the 1916 Brusilov Offensive — one of the most effective military operations of the entire war. His multi-point attack shattered the Austro-Hungarian army.", fact: 'Offensive killed/captured over 1 million Austro-Hungarian troops' },
    ],
    central: [
        { id: 'kaiser', name: 'Kaiser Wilhelm II', role: 'German Emperor & Supreme Warlord', flag: '🇩🇪', img: '/Kaiser_Wilhelm_II_of_Germany_-_1902_(cropped).jpg', bio: "Germany's last emperor and the head of the Central Powers. His erratic diplomacy and dismissal of Bismarck's careful alliance system directly contributed to the war's outbreak. He abdicated two days before the Armistice.", fact: 'Abdicated on 9 Nov 1918, two days before the Armistice' },
        { id: 'hindenburg', name: 'Paul von Hindenburg', role: 'German Field Marshal', flag: '🇩🇪', img: '/Bundesarchiv_Bild_183-C06886,_Paul_v._Hindenburg_(cropped)(2).jpg', bio: "The old Prussian hero recalled from retirement who triumphed at Tannenberg, crushing two Russian armies. Later became Germany's Chief of Staff and effectively ran the war by 1916.", fact: 'The Tannenberg victory took 92,000 Russian prisoners in 3 days' },
        { id: 'ludendorff', name: 'Erich Ludendorff', role: 'German Quartermaster General', flag: '🇩🇪', img: '/Erich_Ludendorff_1924_Portrait_(3x4_cropped)(2).jpg', bio: "The strategic mastermind behind Eastern Front victories and the 1918 Spring Offensive (Kaiserschlacht). His innovative Stormtrooper infiltration tactics nearly broke the Allied line before US reserves proved decisive.", fact: 'Designed the Stormtrooper infiltration tactics still studied today' },
        { id: 'ataturk', name: 'Mustafa Kemal (Atatürk)', role: 'Ottoman Commander — Gallipoli', flag: '🇹🇷', img: '/Ataturk1930s.jpg', bio: "Defender of Gallipoli who became the most celebrated military figure the Ottoman Empire produced. He later founded modern Turkey.", fact: 'His defence of Gallipoli earned the Turks a decisive victory in 1915' },
    ],
};

const WEAPONS = [
    { icon: '🛡️', name: 'The Tank', color: '#6ea8d8', first: 'Somme — Sep 1916', desc: "Britain's Mark I tank changed warfare forever. Slow (6 km/h), unreliable, but psychologically devastating — able to cross trenches and barbed wire that had killed thousands.", stats: [{ label: 'Top Speed', val: '6 km/h' }, { label: 'Crew', val: '8 men' }, { label: 'Deployed at Somme', val: '49 tanks' }] },
    { icon: '☣️', name: 'Poison Gas', color: '#8ac47a', first: 'Ypres — Apr 1915', desc: "Germany first used chlorine gas. Phosgene and mustard gas followed. Gas caused blindness, lung damage, and horrific deaths — yet the wind made it unpredictable.", stats: [{ label: 'Gas casualties (WW1)', val: '1.3 million' }, { label: 'Deaths by gas', val: '91,000' }, { label: 'Types used', val: '50+ chemicals' }] },
    { icon: '✈️', name: 'Military Aviation', color: '#c9a84c', first: 'Frontline recon — 1914', desc: "Planes began as unarmed reconnaissance tools. Within a year, fighters like the Fokker Eindecker were shooting down enemies. By 1918, strategic bombing of cities had begun.", stats: [{ label: 'Red Baron victories', val: '80 kills' }, { label: 'Aircraft built (UK)', val: '55,000' }, { label: 'Bombing raids on Britain', val: '208' }] },
    { icon: '🚢', name: 'U-Boats', color: '#E6192B', first: 'Atlantic — 1914', desc: "German submarines nearly strangled Britain's supply lines. Unrestricted U-boat warfare in 1917 sank 1 in 4 ships entering British waters — and ultimately pulled the USA into the war.", stats: [{ label: 'Ships sunk', val: '5,000+' }, { label: 'U-boats lost', val: '178' }, { label: 'Allied sailors killed', val: '15,000+' }] },
];

const People = () => {
    const [hoveredFigure, setHoveredFigure] = useState(null);

    return (
        <div style={{ backgroundColor: 'var(--bg-deep)', color: 'var(--text-primary)', minHeight: '100vh' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem 4rem' }}>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <div style={{ display: 'inline-block', fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#c0392b', fontWeight: 700, marginBottom: '1rem', padding: '0.4rem 1.2rem', border: '1px solid rgba(163,22,33,0.35)', borderRadius: '100px', background: 'rgba(163,22,33,0.08)' }}>Commanders & Innovators</div>
                    <h1 style={{ fontSize: 'clamp(2rem,4vw,3rem)', color: '#fff', fontWeight: 900, margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>People & Technology</h1>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem', margin: 0 }}>Hover a commander card to expand their biography</p>
                </div>

                {/* Key Figures */}
                <div style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: '#fff', fontWeight: 800, marginBottom: '2rem', paddingBottom: '0.6rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>Key Figures</h2>
                    {[
                        { label: 'Allied Powers', people: FIGURES.allied, accent: '#6ea8d8' },
                        { label: 'Central Powers', people: FIGURES.central, accent: '#E6192B' },
                    ].map(group => (
                        <div key={group.label} style={{ marginBottom: '2.5rem' }}>
                            <div style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: group.accent, fontWeight: 700, marginBottom: '1.2rem', opacity: 0.8 }}>{group.label}</div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '1.2rem', alignItems: 'start' }}>
                                {group.people.map(p => {
                                    const isOpen = hoveredFigure === p.id;
                                    return (
                                        <div key={p.id}
                                            onMouseEnter={() => setHoveredFigure(p.id)}
                                            onMouseLeave={() => setHoveredFigure(null)}
                                            style={{ background: isOpen ? `${group.accent}12` : 'rgba(255,255,255,0.03)', border: `1px solid ${isOpen ? group.accent + '55' : 'rgba(255,255,255,0.07)'}`, borderRadius: '12px', padding: '1.4rem', cursor: 'default', transition: 'all 0.25s ease' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                {p.img
                                                    ? <img src={p.img} alt={p.name} style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: `2px solid ${group.accent}55`, flexShrink: 0, filter: 'grayscale(20%)' }} onError={e => { e.target.style.display = 'none'; }} />
                                                    : <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: `${group.accent}22`, border: `2px solid ${group.accent}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>{p.flag}</div>
                                                }
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.2 }}>{p.name}</div>
                                                    <div style={{ color: group.accent, fontSize: '0.72rem', marginTop: '0.2rem', opacity: 0.75 }}>{p.role}</div>
                                                </div>
                                            </div>
                                            {isOpen && (
                                                <div style={{ marginTop: '1rem' }}>
                                                    <div style={{ height: '1px', background: `${group.accent}20`, marginBottom: '1rem' }} />
                                                    <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start' }}>
                                                        {p.img && (
                                                            <div style={{ flexShrink: 0 }}>
                                                                <img src={p.img} alt={p.name}
                                                                    style={{ width: '110px', height: '140px', objectFit: 'cover', objectPosition: 'top center', borderRadius: '8px', border: `2px solid ${group.accent}44`, filter: 'grayscale(15%) brightness(0.88)', display: 'block' }}
                                                                    onError={e => { e.target.parentElement.style.display = 'none'; }} />
                                                            </div>
                                                        )}
                                                        <div style={{ flex: 1, minWidth: 0 }}>
                                                            <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.82rem', lineHeight: 1.75, margin: '0 0 0.9rem' }}>{p.bio}</p>
                                                            <div style={{ background: `${group.accent}10`, border: `1px solid ${group.accent}22`, borderRadius: '8px', padding: '0.6rem 1rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
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

                {/* Weapons & Technology */}
                <div>
                    <h2 style={{ fontSize: '1.5rem', color: '#fff', fontWeight: 800, marginBottom: '2rem', paddingBottom: '0.6rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>Weapons & Technology</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '1.5rem' }}>
                        {WEAPONS.map(w => (
                            <div key={w.name} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${w.color}30`, borderTop: `3px solid ${w.color}`, borderRadius: '14px', padding: '2rem 1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'background 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.background = `${w.color}09`}
                                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '2.5rem' }}>{w.icon}</span>
                                    <span style={{ fontSize: '0.6rem', color: w.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', background: `${w.color}15`, padding: '0.25rem 0.75rem', borderRadius: '20px' }}>First: {w.first}</span>
                                </div>
                                <h3 style={{ color: '#fff', fontWeight: 900, fontSize: '1.3rem', margin: 0 }}>{w.name}</h3>
                                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.84rem', lineHeight: 1.75, margin: 0, flex: 1 }}>{w.desc}</p>
                                <div style={{ borderTop: `1px solid ${w.color}20`, paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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

            </div>
        </div>
    );
};

export default People;
