import React, { useState } from 'react';

const Alliances = () => {
    const [hovered, setHovered] = useState(null); // 'allied', 'central', or null

    const baseStyle = {
        flex: 1,
        transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
        padding: '3rem',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    };

    const getFlexValue = (side) => {
        if (!hovered) return 1;
        return hovered === side ? 2.5 : 0.5;
    };

    const getOpacity = (side) => {
        if (!hovered) return 1;
        return hovered === side ? 1 : 0.3;
    };

    return (
        <section style={{ padding: '4rem 0' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>The Balance of <span className="text-crimson">Power</span></h2>

            <div style={{
                display: 'flex',
                height: '500px',
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: 'var(--bg-panel)',
                border: 'var(--glass-border)',
                boxShadow: 'var(--glass-shadow)',
                backdropFilter: 'var(--glass-backdrop)',
            }} onMouseLeave={() => setHovered(null)}>

                {/* Allied Powers */}
                <div
                    onMouseEnter={() => setHovered('allied')}
                    style={{
                        ...baseStyle,
                        flex: getFlexValue('allied'),
                        opacity: getOpacity('allied'),
                        borderRight: '2px solid rgba(255,255,255,0.1)',
                        background: hovered === 'allied' ? 'radial-gradient(circle at bottom left, rgba(59, 130, 246, 0.2) 0%, transparent 70%)' : 'transparent'
                    }}
                >
                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <h3 style={{ fontSize: hovered === 'allied' ? '3rem' : '2rem', marginBottom: '1.5rem', color: '#3b82f6', transition: 'font-size 0.4s ease' }}>
                            Allied Powers
                        </h3>
                        <ul style={{
                            listStyleType: 'none',
                            color: 'var(--text-primary)',
                            fontSize: '1.1rem',
                            opacity: hovered === 'central' ? 0 : 1,
                            transition: 'opacity 0.4s ease'
                        }}>
                            <li style={{ padding: '0.5rem 0' }}>🇬🇧 British Empire</li>
                            <li style={{ padding: '0.5rem 0' }}>🇫🇷 France</li>
                            <li style={{ padding: '0.5rem 0' }}>🇷🇺 Russian Empire (until 1917)</li>
                            <li style={{ padding: '0.5rem 0' }}>🇮🇹 Italy (from 1915)</li>
                            <li style={{ padding: '0.5rem 0' }}>🇺🇸 United States (from 1917)</li>
                        </ul>
                    </div>
                </div>

                {/* Central Powers */}
                <div
                    onMouseEnter={() => setHovered('central')}
                    style={{
                        ...baseStyle,
                        flex: getFlexValue('central'),
                        opacity: getOpacity('central'),
                        background: hovered === 'central' ? 'radial-gradient(circle at bottom right, rgba(163, 22, 33, 0.2) 0%, transparent 70%)' : 'transparent',
                        textAlign: 'right',
                        alignItems: 'flex-end'
                    }}
                >
                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <h3 style={{ fontSize: hovered === 'central' ? '3rem' : '2rem', marginBottom: '1.5rem', color: 'var(--accent-crimson)', transition: 'font-size 0.4s ease' }}>
                            Central Powers
                        </h3>
                        <ul style={{
                            listStyleType: 'none',
                            color: 'var(--text-primary)',
                            fontSize: '1.1rem',
                            opacity: hovered === 'allied' ? 0 : 1,
                            transition: 'opacity 0.4s ease'
                        }}>
                            <li style={{ padding: '0.5rem 0' }}>🇩🇪 German Empire</li>
                            <li style={{ padding: '0.5rem 0' }}>🇦🇹 Austria-Hungary</li>
                            <li style={{ padding: '0.5rem 0' }}>🇹🇷 Ottoman Empire</li>
                            <li style={{ padding: '0.5rem 0' }}>🇧🇬 Kingdom of Bulgaria</li>
                        </ul>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Alliances;
