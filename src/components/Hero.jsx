// src/components/Hero.jsx
import React, { useState, useEffect } from 'react';

const images = [
    '/image1.avif',
    '/image2.avif',
    '/image3.avif',
    '/image4.avif',
    '/image5.avif',
    '/image6.avif',
];

const Hero = () => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="fade-in" style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Background Slideshow */}
            {images.map((img, index) => (
                <div key={index} style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    opacity: index === currentImage ? 0.55 : 0,
                    transition: 'opacity 2.5s ease-in-out', zIndex: -1,
                }} />
            ))}

            {/* Vignettes for readability */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,12,1) 0%, rgba(10,10,12,0.5) 40%, rgba(10,10,12,0.1) 100%)', zIndex: 0 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,12,0.88) 0%, transparent 65%)', zIndex: 0 }} />

            {/* Main Content — bottom-left aligned like Netflix */}
            <div style={{
                position: 'absolute', zIndex: 1,
                width: '100%', maxWidth: '1200px',
                left: '50%', transform: 'translateX(-50%)',
                bottom: '12%', padding: '0 2.5rem',
                display: 'flex', flexDirection: 'column',
                alignItems: 'flex-start', textAlign: 'left',
                gap: '0.5rem',
            }}>



                {/* Giant WW1 Title */}
                <h1 style={{
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    fontSize: 'clamp(5rem, 12vw, 10rem)',
                    lineHeight: 1,
                    margin: 0,
                    fontWeight: '900',
                    background: 'linear-gradient(135deg, #ffffff 0%, #d0d0d0 45%, #a31621 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 6px 32px rgba(0,0,0,0.9))',
                }}>
                    WW<span style={{ WebkitTextFillColor: '#E6192B' }}>1</span>
                </h1>

                {/* Catchy tagline */}
                <p style={{
                    fontSize: 'clamp(1rem, 2.2vw, 1.6rem)',
                    fontWeight: '700',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.92)',
                    textShadow: '0 2px 14px rgba(0,0,0,1)',
                    margin: '0.2rem 0 0',
                }}>
                    The War That <span style={{ color: '#E6192B' }}>Broke</span> the World
                </p>

                {/* Sub description */}
                <p style={{
                    maxWidth: '520px',
                    fontSize: 'clamp(0.9rem, 1.6vw, 1.05rem)',
                    color: 'rgba(255,255,255,0.5)',
                    lineHeight: 1.75,
                    margin: '0.5rem 0 1.4rem',
                    textShadow: '0 1px 8px rgba(0,0,0,0.9)',
                }}>
                    1914 – 1918 &nbsp;·&nbsp; 40 nations &nbsp;·&nbsp; 20 million dead.
                    Four years of trenches, collapsing empires, and a world that would never be the same.
                </p>

                {/* CTA button */}
                <button
                    onClick={() => {
                        const next = document.querySelector('main section + *');
                        if (next) next.scrollIntoView({ behavior: 'smooth' });
                        else window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
                    }}
                    style={{
                        padding: '0.9rem 2.6rem',
                        fontSize: '0.82rem',
                        fontWeight: '700',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: '#fff',
                        background: 'rgba(230,25,43,0.88)',
                        border: '1px solid rgba(230,25,43,0.5)',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        boxShadow: '0 0 28px rgba(230,25,43,0.3)',
                        transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = '#E6192B';
                        e.currentTarget.style.boxShadow = '0 0 52px rgba(230,25,43,0.6)';
                        e.currentTarget.style.transform = 'scale(1.03)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(230,25,43,0.88)';
                        e.currentTarget.style.boxShadow = '0 0 28px rgba(230,25,43,0.3)';
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                >
                    ▶ &nbsp; Explore the History
                </button>
            </div>

            {/* Slide indicators */}
            <div style={{
                position: 'absolute', bottom: '2.5rem', right: '2.5rem',
                display: 'flex', gap: '7px', zIndex: 2,
            }}>
                {images.map((_, i) => (
                    <div
                        key={i}
                        onClick={() => setCurrentImage(i)}
                        style={{
                            width: i === currentImage ? '26px' : '6px',
                            height: '5px',
                            borderRadius: '3px',
                            background: i === currentImage ? '#E6192B' : 'rgba(255,255,255,0.28)',
                            transition: 'all 0.4s ease',
                            cursor: 'pointer',
                        }}
                    />
                ))}
            </div>

            <style>{`
                @keyframes heroPulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.25; transform: scale(0.8); }
                }
            `}</style>
        </section>
    );
};

export default Hero;
