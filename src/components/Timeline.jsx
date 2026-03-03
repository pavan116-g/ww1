import React, { useState } from 'react';

const events = [
    { year: '1914', title: 'Assassination of Archduke Franz Ferdinand', desc: 'The spark that ignited the powder keg of Europe, leading to declarations of war.' },
    { year: '1915', title: 'Gallipoli Campaign', desc: 'A major Allied offensive against the Ottoman Empire that ended in a costly withdrawal.' },
    { year: '1916', title: 'Battle of the Somme', desc: 'One of the bloodiest battles in human history, with over a million casualties.' },
    { year: '1917', title: 'US Enters the War', desc: 'The United States declares war on Germany, shifting the balance of power.' },
    { year: '1918', title: 'Armistice', desc: 'An armistice goes into effect on November 11th, ending major hostilities.' },
];

const Timeline = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 1rem' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '6rem' }}>Crucial <span className="text-crimson">Timeline</span></h2>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    height: '350px',
                    width: '100%',
                    position: 'relative',
                    alignItems: 'center'
                }}
                onMouseLeave={() => setHoveredIndex(null)}
            >
                {/* The Innovative Power Line */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '0',
                    right: '0',
                    height: '4px',
                    background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, var(--accent-crimson) 50%, rgba(255,255,255,0.05) 100%)',
                    transform: 'translateY(-50%)',
                    zIndex: 0,
                    borderRadius: '2px',
                    boxShadow: '0 0 15px rgba(220, 38, 38, 0.4)'
                }}></div>

                {events.map((event, index) => {
                    const isHovered = hoveredIndex === index;
                    const flexValue = isHovered ? 3 : 1;

                    return (
                        <div
                            key={index}
                            onMouseEnter={() => setHoveredIndex(index)}
                            style={{
                                flex: flexValue,
                                transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                                cursor: 'pointer',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                                zIndex: isHovered ? 10 : 1
                            }}
                        >
                            {/* The Timeline Node/Dot */}
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: `translate(-50%, -50%) scale(${isHovered ? 1.5 : 1})`,
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                backgroundColor: isHovered ? 'var(--accent-crimson)' : 'var(--bg-panel)',
                                border: `3px solid ${isHovered ? '#fff' : 'var(--accent-crimson)'}`,
                                transition: 'all 0.4s ease',
                                boxShadow: isHovered ? '0 0 20px var(--accent-crimson)' : 'none',
                                zIndex: 2
                            }}></div>

                            {/* Year (Above the line) */}
                            <h3 style={{
                                position: 'absolute',
                                top: isHovered ? '5%' : '30%',
                                transition: 'all 0.5s ease',
                                fontSize: isHovered ? '3.5rem' : '1.5rem',
                                color: isHovered ? 'var(--text-primary)' : 'var(--text-secondary)',
                                fontWeight: 'bold',
                                textShadow: isHovered ? '0 0 15px rgba(255,255,255,0.4)' : 'none'
                            }}>
                                {event.year}
                            </h3>

                            {/* Details Panel (Below the line) */}
                            <div
                                className="glass-panel"
                                style={{
                                    position: 'absolute',
                                    top: '60%',
                                    width: isHovered ? '360px' : '0px',
                                    opacity: isHovered ? 1 : 0,
                                    transform: isHovered ? 'translateY(0)' : 'translateY(-20px)',
                                    transition: 'all 0.5s ease',
                                    padding: isHovered ? '2rem' : '0',
                                    overflow: 'hidden',
                                    textAlign: 'center',
                                    borderTop: '3px solid var(--accent-crimson)',
                                    pointerEvents: 'none',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    zIndex: 5
                                }}>
                                <h4 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '1rem', whiteSpace: 'normal', lineHeight: '1.3' }}>{event.title}</h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0, minWidth: '300px' }}>{event.desc}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Timeline;
