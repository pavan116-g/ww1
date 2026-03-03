import React, { useState } from 'react';

const PreWW1Context = () => {
    const [hoveredConcept, setHoveredConcept] = useState(null);

    return (
        <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '6rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '4rem' }}>The <span className="text-crimson">Powder Keg</span> of Europe</h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(300px, 1fr) auto minmax(400px, 1.5fr)',
                gap: '2rem',
                alignItems: 'center',
                width: '100%',
                position: 'relative'
            }}>

                {/* Left Side: Definitions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Imperialism Card */}
                    <div
                        className="glass-panel"
                        onMouseEnter={() => setHoveredConcept('imperialism')}
                        onMouseLeave={() => setHoveredConcept(null)}
                        style={{
                            padding: '2rem',
                            borderLeft: '4px solid #E6192B',
                            background: hoveredConcept === 'imperialism' ? 'rgba(230, 25, 43, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                            transform: hoveredConcept === 'imperialism' ? 'translateX(10px)' : 'translateX(0)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <div>
                                <h3 style={{ color: '#E6192B', fontSize: '1.5rem', marginBottom: '0.2rem' }}>imperialism</h3>
                                <p style={{ color: '#E6192B', fontSize: '0.9rem', opacity: 0.8, fontFamily: 'monospace' }}>/ɪmˈpɪərɪəlɪz(ə)m/</p>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontStyle: 'italic', marginTop: '0.2rem' }}>noun</p>
                            </div>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E6192B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 'auto', opacity: 0.8 }}>
                                <path d="M2 17L4 4l6 4 2-6 2 6 6-4 2 13z"></path>
                            </svg>
                        </div>
                        <p style={{ color: 'var(--text-primary)', lineHeight: '1.6', fontSize: '1.05rem' }}>
                            A policy of extending a country's power and influence through <span style={{ textDecoration: 'underline' }}>colonization</span>, use of military force, or other means.
                        </p>
                    </div>

                    {/* Nationalism Card */}
                    <div
                        className="glass-panel"
                        onMouseEnter={() => setHoveredConcept('nationalism')}
                        onMouseLeave={() => setHoveredConcept(null)}
                        style={{
                            padding: '2rem',
                            borderLeft: '4px solid #004D25',
                            background: hoveredConcept === 'nationalism' ? 'rgba(0, 77, 37, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                            transform: hoveredConcept === 'nationalism' ? 'translateX(10px)' : 'translateX(0)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <div>
                                <h3 style={{ color: '#004D25', fontSize: '1.5rem', marginBottom: '0.2rem' }}>nationalism</h3>
                                <p style={{ color: '#004D25', fontSize: '0.9rem', opacity: 0.8, fontFamily: 'monospace' }}>/ˈnaʃənəlɪz(ə)m/</p>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontStyle: 'italic', marginTop: '0.2rem' }}>noun</p>
                            </div>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#004D25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 'auto', opacity: 0.8 }}>
                                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                                <line x1="4" y1="22" x2="4" y2="15"></line>
                            </svg>
                        </div>
                        <p style={{ color: 'var(--text-primary)', lineHeight: '1.6', fontSize: '1.05rem' }}>
                            Identification with one's own nation and support for its interests, especially to the <span style={{ textDecoration: 'underline' }}>exclusion</span> or detriment of the interests of other nations.
                        </p>
                    </div>
                </div>

                {/* Center: Animated Arrow */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 2rem' }}>
                    <h3 style={{ fontSize: '2rem', fontFamily: 'monospace', fontWeight: 'bold', letterSpacing: '2px', textShadow: '0 0 10px rgba(255,255,255,0.5)', marginBottom: '1rem', transform: 'rotate(-5deg)' }}>
                        PRE-WW1
                    </h3>
                    <svg width="200" height="100" viewBox="0 0 200 100" style={{ overflow: 'visible' }}>
                        <defs>
                            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill="var(--text-primary)" />
                            </marker>
                            <linearGradient id="arrowFade" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                                <stop offset="100%" stopColor="var(--text-primary)" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M 10 50 Q 100 0 190 70"
                            fill="none"
                            stroke="url(#arrowFade)"
                            strokeWidth="4"
                            strokeDasharray="5,5"
                            markerEnd="url(#arrowhead)"
                            style={{ animation: 'dash 20s linear infinite' }}
                        />
                    </svg>
                </div>

                {/* Right Side: Map & Legend */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}>

                    {/* Legend Overlay */}
                    <div className="glass-panel" style={{
                        position: 'absolute',
                        top: '1rem', left: '1rem',
                        padding: '1rem', zIndex: 20,
                        background: 'rgba(10,10,12,0.8)',
                        backdropFilter: 'blur(10px)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
                            <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#E6192B' }}></div>
                            <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Imperial Powers</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
                            <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#389BCA' }}></div>
                            <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Under Imperial Rule</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#004D25' }}></div>
                            <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Nationalist Tensions</span>
                        </div>
                    </div>

                    {/* Highly Stylized SVG Map of Pre-WW1 Europe */}
                    <svg viewBox="0 0 800 600" style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.5))' }}>
                        {/* Background Ocean/Map Area */}
                        <rect width="800" height="600" fill="#E2E8F0" rx="16" />

                        {/* Hover Overlay Logic */}
                        <g opacity={hoveredConcept === 'imperialism' ? 0.3 : 1} style={{ transition: 'opacity 0.3s outline' }}>
                            {/* Great Britain (Red - Imperial) */}
                            <path className={`map-region ${hoveredConcept === 'nationalism' ? 'opacity-30' : ''}`} fill="#E6192B" stroke="#fff" strokeWidth="2" d="M180 200 Q200 150 220 180 T200 250 Q180 260 180 200 Z" />
                            {/* France (Red - Imperial) */}
                            <path className={`map-region ${hoveredConcept === 'nationalism' ? 'opacity-30' : ''}`} fill="#E6192B" stroke="#fff" strokeWidth="2" d="M220 300 Q280 280 300 340 T240 400 Q200 350 220 300 Z" />
                            {/* Russian Empire (Red - Imperial) */}
                            <path className={`map-region ${hoveredConcept === 'nationalism' ? 'opacity-30' : ''}`} fill="#E6192B" stroke="#fff" strokeWidth="2" d="M500 50 Q750 20 780 200 T750 400 Q650 350 550 250 T500 50 Z" />
                        </g>

                        <g opacity={hoveredConcept === 'imperialism' ? 1 : (hoveredConcept === 'nationalism' ? 0.3 : 1)} style={{ transition: 'opacity 0.3s' }}>
                            {/* Ottoman Empire (Red - Imperial) */}
                            <path className="map-region" fill="#E6192B" stroke="#fff" strokeWidth="2" d="M600 450 Q650 400 750 420 T700 550 Q600 500 600 450 Z" />
                        </g>

                        <g opacity={hoveredConcept === 'imperialism' ? 1 : (hoveredConcept === 'nationalism' ? 0.3 : 1)} style={{ transition: 'opacity 0.3s' }}>
                            {/* Africa Colonies (Blue - Under Rule) */}
                            <path className="map-region" fill="#389BCA" stroke="#fff" strokeWidth="2" d="M200 450 Q300 450 400 550 T250 600 Q150 550 200 450 Z" />
                            {/* Eastern Europe/Balkans (Blue - Under Rule) */}
                            <path className={`map-region ${hoveredConcept === 'nationalism' ? '' : ''}`} fill="#389BCA" stroke="#fff" strokeWidth="2" d="M450 300 Q550 300 550 400 T450 450 Q400 350 450 300 Z" />
                        </g>

                        <g opacity={hoveredConcept === 'nationalism' ? 1 : (hoveredConcept === 'imperialism' ? 0.3 : 1)} style={{ transition: 'opacity 0.3s' }}>
                            {/* Germany/Austria-Hungary/Italy (Green - Nationalism/Central Powers core) */}
                            {/* Germany */}
                            <path className="map-region" fill="#004D25" stroke="#fff" strokeWidth="2" d="M320 250 Q380 220 420 280 T370 330 Q300 300 320 250 Z" />
                            {/* Austria Hungary */}
                            <path className="map-region" fill="#004D25" stroke="#fff" strokeWidth="2" d="M370 330 Q450 280 480 320 T420 380 Q350 360 370 330 Z" />
                            {/* Italy */}
                            <path className="map-region" fill="#004D25" stroke="#fff" strokeWidth="2" d="M350 370 Q400 400 420 450 T380 500 Q330 420 350 370 Z" />
                        </g>

                        {/* Neutral/Other landmasses (Light Grey) */}
                        <path fill="#CBD5E1" d="M100 500 Q150 480 180 550 Q120 580 100 500 Z" />
                        <path fill="#CBD5E1" d="M350 100 Q400 50 450 150 Q400 200 350 100 Z" />

                    </svg>

                </div>
            </div>
        </section>
    );
};

export default PreWW1Context;
