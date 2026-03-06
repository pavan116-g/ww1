import React from 'react';

const Legacy = () => {
    return (
        <div style={{ backgroundColor: 'var(--bg-deep)', color: 'var(--text-primary)', minHeight: '100vh' }}>
            {/* Minimal Header (similar to Battles/People) */}
            <header style={{ position: 'relative', overflow: 'hidden', padding: '6rem 2rem 4rem', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at top, rgba(163,22,33,0.15) 0%, transparent 60%)', zIndex: 0 }} />
                <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ display: 'inline-block', fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--accent-crimson)', fontWeight: '700', marginBottom: '1.2rem', padding: '0.4rem 1.2rem', border: '1px solid rgba(163,22,33,0.3)', borderRadius: '100px', background: 'rgba(163,22,33,0.1)' }}>
                        Cinematic Echoes
                    </div>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: '900', color: 'var(--accent-white)', margin: '0 0 1.5rem', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
                        The War on <span style={{ color: 'var(--accent-crimson)' }}>Film</span>
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.7', margin: 0 }}>
                        Decades after the armistice, the Great War continues to haunt and inspire storytellers. These cinematic masterpieces attempt to capture the unimaginable reality of the trenches.
                    </p>
                </div>
            </header>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>
                    {[
                        { title: '1917', year: '2019', desc: 'A race against time to deliver a message that will save 1,600 men, filmed to look like one continuous shot.', img: 'https://m.media-amazon.com/images/M/MV5BYzkxZjg2NDQtMGVjMy00NWZkLTk0ZDEtZWE3NDYwYjAyMTg1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', url: 'https://www.imdb.com/title/tt8579674/', color: '#c0392b' },
                        { title: 'All Quiet on the Western Front', year: '2022', desc: "A young German soldier's terrifying experiences and distress on the western front.", img: 'https://m.media-amazon.com/images/M/MV5BMzM4ZDJhYjYtZGY5Ny00NTk0LWI4ZTYtNjczZDFiMGI2ZjEzXkEyXkFqcGdeQXVyNjc5NjEzNA@@._V1_.jpg', url: 'https://www.imdb.com/title/tt1016150/', color: '#6ea8d8' },
                        { title: 'Paths of Glory', year: '1957', desc: 'After refusing to attack an enemy position, three soldiers are tried for cowardice by their ambitious general.', img: 'https://m.media-amazon.com/images/M/MV5BNmQ2NmI2ODYtMDQzNS00NzQyLTkzZjgtZmZlYTQ5MTc1OWU3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', url: 'https://www.imdb.com/title/tt0050825/', color: '#c9a84c' },
                        { title: 'War Horse', year: '2011', desc: 'Young Albert enlists to serve in WWI after his beloved horse is sold to the cavalry.', img: '/movies/War-horse-poster.jpg', url: 'https://www.imdb.com/title/tt1568911/', color: '#3d8c46' },
                        { title: 'They Shall Not Grow Old', year: '2018', desc: 'A documentary featuring never-before-seen footage colorized and restored to bring the soldiers back to life.', img: 'https://m.media-amazon.com/images/M/MV5BOGMwNzc3NTQtY2QzZS00YzJmLTgyM2UtYjlkMjBjZTAwM2Y5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', url: 'https://www.imdb.com/title/tt7905466/', color: '#e67e22' },
                        { title: 'Gallipoli', year: '1981', desc: 'Two Australian sprinters face the brutal realities of war when they are sent to fight in the Gallipoli campaign in Turkey.', img: '/movies/Gallipoli_original_Australian_poster.jpg', url: 'https://www.imdb.com/title/tt0082432/', color: '#9b59b6' },
                    ].map(movie => (
                        <div key={movie.title} className="glass-panel" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderTop: `3px solid ${movie.color}`, borderRadius: '16px', overflow: 'hidden', transition: 'transform 0.4s ease, box-shadow 0.4s ease', display: 'flex', flexDirection: 'row', alignItems: 'stretch' }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = `0 15px 30px rgba(0,0,0,0.5), 0 0 20px ${movie.color}33`; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                        >
                            <div style={{ width: '140px', flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: `linear-gradient(to right, transparent, rgba(16,16,24,1))`, zIndex: 1, pointerEvents: 'none' }} />
                                <img src={movie.img} alt={movie.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: movie.color, marginBottom: '0.4rem' }}>{movie.year}</div>
                                <h3 style={{ margin: '0 0 0.8rem', fontSize: '1.25rem', fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>{movie.title}</h3>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, flex: 1 }}>{movie.desc}</p>
                                <a href={movie.url} target="_blank" rel="noopener noreferrer" style={{ marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: movie.color, fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', textDecoration: 'none', width: 'fit-content' }}>
                                    View Details <span style={{ fontSize: '1.1rem' }}>→</span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Legacy;
