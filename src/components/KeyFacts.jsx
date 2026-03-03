// src/components/KeyFacts.jsx
import React from 'react';

const facts = [
    { title: "Duration", value: "1914 - 1918", desc: "Four years of unyielding global conflict." },
    { title: "Casualties", value: "40M+", desc: "Estimated military and civilian casualties." },
    { title: "Nations", value: "30+", desc: "Countries involved across multiple continents." }
];

const KeyFacts = () => {
    return (
        <section>
            <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>The Devastation in <span className="text-crimson">Numbers</span></h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem'
            }}>
                {facts.map((fact, index) => (
                    <div key={index} className="glass-panel glow-hover" style={{ padding: '2rem', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--accent-crimson)' }}>{fact.title}</h3>
                        <div className="text-white" style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>{fact.value}</div>
                        <p style={{ margin: 0 }}>{fact.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default KeyFacts;
