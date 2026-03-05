import React, { useState } from 'react';
import Hero from '../components/Hero';
import WarOverviewTabs from '../components/WarOverviewTabs';

const Home = () => {
    const [hoveredCard, setHoveredCard] = useState(null);

    return (
        <div style={{ backgroundColor: 'var(--bg-deep)', color: 'var(--text-primary)', minHeight: '100vh' }}>
            <Hero />

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem 3rem' }}>

                {/* Pre-War Context Header */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div style={{ display: 'inline-block', fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--accent-crimson)', fontWeight: '700', marginBottom: '1.2rem', padding: '0.4rem 1.2rem', border: '1px solid rgba(163,22,33,0.35)', borderRadius: '100px', background: 'rgba(163,22,33,0.08)' }}>
                        Pre-War Context · 1871 – 1914
                    </div>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '0', color: 'var(--accent-white)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                        The <span style={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Powder Keg</span> of Europe
                    </h1>
                    <div style={{ width: '60px', height: '3px', background: 'linear-gradient(90deg, transparent, var(--accent-crimson), transparent)', margin: '1.5rem auto' }} />
                    <p style={{ fontSize: '1.15rem', maxWidth: '680px', margin: '0 auto', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                        In the years leading up to 1914, Europe was driven by two powerful and volatile forces that set the stage for the Great War.
                    </p>
                </div>

                {/* Imperialism & Nationalism Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                    {/* Imperialism */}
                    <div className="glass-panel" onMouseEnter={() => setHoveredCard('imperialism')} onMouseLeave={() => setHoveredCard(null)}
                        style={{ padding: '2.5rem', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid rgba(163,22,33,0.2)', borderTop: '3px solid #c0392b', borderRadius: '16px', transition: 'all 0.4s cubic-bezier(0.175,0.885,0.32,1.275)', transform: hoveredCard === 'imperialism' ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)', background: hoveredCard === 'imperialism' ? 'linear-gradient(145deg,rgba(40,10,10,0.85),rgba(20,5,5,0.9))' : 'rgba(18,18,22,0.6)', cursor: 'pointer' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                            <div>
                                <h2 style={{ color: hoveredCard === 'imperialism' ? '#e74c3c' : '#c0392b', margin: 0, fontSize: '2.4rem', fontWeight: '800', textTransform: 'lowercase', letterSpacing: '-0.02em', transition: 'color 0.3s ease' }}>imperialism</h2>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontStyle: 'italic', marginTop: '0.3rem' }}>/ɪmˈpɪəriəlɪz(ə)m/ • noun</div>
                            </div>
                        </div>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.75', color: hoveredCard === 'imperialism' ? 'rgba(255,255,255,0.85)' : 'var(--text-secondary)', margin: 0 }}>
                            A policy of extending a country's power through <span style={{ color: '#e74c3c', fontWeight: 700 }}>colonization</span>, use of military force, or other means.
                        </p>
                        <div style={{ maxHeight: hoveredCard === 'imperialism' ? '600px' : '0', opacity: hoveredCard === 'imperialism' ? 1 : 0, overflow: 'hidden', transition: 'max-height 0.5s ease,opacity 0.4s ease', marginTop: hoveredCard === 'imperialism' ? '1.4rem' : '0' }}>
                            <div style={{ borderTop: '1px solid rgba(192,57,43,0.2)', paddingTop: '1.2rem' }}>
                                <div style={{ fontSize: '0.68rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(192,57,43,0.7)', marginBottom: '0.8rem', fontWeight: '700' }}>Major Imperial Powers c. 1910</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                                    {[
                                        { flag: '🇬🇧', name: 'United Kingdom', note: "Ruled ~25% of the world's land mass" },
                                        { flag: '🇫🇷', name: 'France', note: '2nd largest empire — Africa, Indochina, Pacific' },
                                        { flag: '🇩🇪', name: 'Germany', note: 'Colonies in Africa (Cameroon, Namibia, Tanzania)' },
                                        { flag: '🇷🇺', name: 'Russia', note: 'Vast land empire across Central Asia & Siberia' },
                                        { flag: '🇧🇪', name: 'Belgium', note: "Congo Free State — 76× Belgium's own size" },
                                        { flag: '🇯🇵', name: 'Japan', note: 'Korea, Taiwan, Manchuria (expanding rapidly)' },
                                    ].map(({ flag, name, note }) => (
                                        <div key={name} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                                            <span style={{ fontSize: '1rem', flexShrink: 0 }}>{flag}</span>
                                            <div><span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.82rem', fontWeight: '600' }}>{name}</span><span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem' }}> — {note}</span></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Nationalism */}
                    <div className="glass-panel" onMouseEnter={() => setHoveredCard('nationalism')} onMouseLeave={() => setHoveredCard(null)}
                        style={{ padding: '2.5rem', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid rgba(59,130,246,0.2)', borderTop: '3px solid #3b82f6', borderRadius: '16px', transition: 'all 0.4s cubic-bezier(0.175,0.885,0.32,1.275)', transform: hoveredCard === 'nationalism' ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)', background: hoveredCard === 'nationalism' ? 'linear-gradient(145deg,rgba(8,18,36,0.85),rgba(4,10,20,0.9))' : 'rgba(18,18,22,0.6)', cursor: 'pointer' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                            <div>
                                <h2 style={{ color: hoveredCard === 'nationalism' ? '#60a5fa' : '#3b82f6', margin: 0, fontSize: '2.4rem', fontWeight: '800', textTransform: 'lowercase', letterSpacing: '-0.02em', transition: 'color 0.3s ease' }}>nationalism</h2>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontStyle: 'italic', marginTop: '0.3rem' }}>/ˈnæʃənəlɪz(ə)m/ • noun</div>
                            </div>
                        </div>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.75', color: hoveredCard === 'nationalism' ? 'rgba(255,255,255,0.85)' : 'var(--text-secondary)', margin: 0 }}>
                            Identification with one's own nation, especially to the <span style={{ color: hoveredCard === 'nationalism' ? '#60a5fa' : '#3b82f6', fontWeight: 700 }}>exclusion</span> of other nations' interests.
                        </p>
                        <div style={{ maxHeight: hoveredCard === 'nationalism' ? '600px' : '0', opacity: hoveredCard === 'nationalism' ? 1 : 0, overflow: 'hidden', transition: 'max-height 0.5s ease,opacity 0.4s ease', marginTop: hoveredCard === 'nationalism' ? '1.4rem' : '0' }}>
                            <div style={{ borderTop: '1px solid rgba(59,130,246,0.2)', paddingTop: '1.2rem' }}>
                                <div style={{ fontSize: '0.68rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(59,130,246,0.7)', marginBottom: '0.8rem', fontWeight: '700' }}>Major Nationalist Movements c. 1910</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                                    {[
                                        { flag: '🇷🇸', name: 'Serbia', note: 'Pan-Slavic nationalism — wanted to unite South Slavs' },
                                        { flag: '🇩🇪', name: 'Germany', note: 'Pan-Germanism — racial & cultural supremacy ideology' },
                                        { flag: '🇮🇹', name: 'Italy', note: 'Irredentism — reclaim Italian-speaking Habsburg lands' },
                                        { flag: '🇦🇹', name: 'Austria-Hungary', note: 'Suppressed Czech, Slovak, Croat & Slovene movements' },
                                        { flag: '🇹🇷', name: 'Ottoman Empire', note: 'Turkish nationalism rising within a multi-ethnic empire' },
                                        { flag: '🇮🇪', name: 'Ireland', note: 'Irish independence movement against British rule' },
                                    ].map(({ flag, name, note }) => (
                                        <div key={name} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                                            <span style={{ fontSize: '1rem', flexShrink: 0 }}>{flag}</span>
                                            <div><span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.82rem', fontWeight: '600' }}>{name}</span><span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem' }}> — {note}</span></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* War Overview Tabs */}
                <WarOverviewTabs />

                {/* Timeline */}
                <div style={{ marginTop: '2.5rem', marginBottom: '3.5rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div style={{ display: 'inline-block', fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#c0392b', fontWeight: '700', marginBottom: '1rem', padding: '0.4rem 1.2rem', border: '1px solid rgba(163,22,33,0.35)', borderRadius: '100px', background: 'rgba(163,22,33,0.08)' }}>1914 – 1918</div>
                        <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: '#fff', fontWeight: 900, margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>The War Timeline</h2>
                        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem', margin: 0 }}>Scroll horizontally to explore key events</p>
                    </div>
                    <div style={{ position: 'relative', overflowX: 'auto', overflowY: 'visible', paddingBottom: '1rem', scrollbarWidth: 'thin', scrollbarColor: '#c0392b44 transparent' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', minWidth: 'max-content', padding: '140px 3rem', position: 'relative' }}>
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
                                    {ev.above && (
                                        <div style={{ marginBottom: '1rem', width: '130px', background: 'rgba(10,10,16,0.92)', border: `1px solid ${ev.color}40`, borderTop: `2px solid ${ev.color}`, borderRadius: '8px', padding: '0.6rem 0.8rem', backdropFilter: 'blur(8px)' }}>
                                            <div style={{ fontSize: '0.55rem', fontWeight: 800, color: ev.color, textTransform: 'uppercase', letterSpacing: '0.12em', background: `${ev.color}18`, padding: '0.12rem 0.5rem', borderRadius: '20px', display: 'inline-block', marginBottom: '0.35rem' }}>{ev.month} {ev.year}</div>
                                            <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.72rem', lineHeight: 1.35 }}>{ev.title}</div>
                                        </div>
                                    )}
                                    {!ev.above && <div style={{ height: '80px' }} />}
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: ev.color, boxShadow: `0 0 0 3px rgba(0,0,0,0.9), 0 0 10px ${ev.color}99`, flexShrink: 0, zIndex: 2 }} />
                                    {!ev.above && (
                                        <div style={{ marginTop: '1rem', width: '130px', background: 'rgba(10,10,16,0.92)', border: `1px solid ${ev.color}40`, borderBottom: `2px solid ${ev.color}`, borderRadius: '8px', padding: '0.6rem 0.8rem', backdropFilter: 'blur(8px)' }}>
                                            <div style={{ fontSize: '0.55rem', fontWeight: 800, color: ev.color, textTransform: 'uppercase', letterSpacing: '0.12em', background: `${ev.color}18`, padding: '0.12rem 0.5rem', borderRadius: '20px', display: 'inline-block', marginBottom: '0.35rem' }}>{ev.month} {ev.year}</div>
                                            <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.72rem', lineHeight: 1.35 }}>{ev.title}</div>
                                        </div>
                                    )}
                                    {ev.above && <div style={{ height: '80px' }} />}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* War Statistics */}
                <div style={{ marginBottom: '4rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <div style={{ display: 'inline-block', fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#c0392b', fontWeight: '700', marginBottom: '1rem', padding: '0.4rem 1.2rem', border: '1px solid rgba(163,22,33,0.35)', borderRadius: '100px', background: 'rgba(163,22,33,0.08)' }}>The Human Cost</div>
                        <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: '#fff', fontWeight: 900, margin: '0 0 0.8rem', letterSpacing: '-0.02em' }}>War by the Numbers</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                        {[
                            { num: '17M+', label: 'Total Deaths', sub: 'Military & civilian combined', color: '#c0392b' },
                            { num: '21M+', label: 'Wounded', sub: 'Surviving casualties', color: '#e67e22' },
                            { num: '65M', label: 'Mobilised', sub: 'Total soldiers deployed', color: '#6ea8d8' },
                            { num: '4 yrs', label: 'Duration', sub: 'Jul 1914 – Nov 1918', color: '#3d8c46' },
                        ].map(stat => (
                            <div key={stat.label} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${stat.color}33`, borderTop: `3px solid ${stat.color}`, borderRadius: '12px', padding: '1.8rem 1.4rem', textAlign: 'center' }}>
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
                                    <div style={{ height: '100%', width: `${(row.dead / row.max) * 100}%`, background: `linear-gradient(90deg, ${row.color}, ${row.color}99)`, borderRadius: '5px' }} />
                                </div>
                                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', flexShrink: 0, minWidth: '80px', textAlign: 'right' }}>{row.dead.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <style>{`
                @keyframes shimmer { 0% { left: -75%; } 100% { left: 125%; } }
            `}</style>
        </div>
    );
};

export default Home;
