import React, { useState, useEffect, useRef } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { supabase } from '../supabaseClient';

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';

const alliedPowers = [
    'United Kingdom', 'France', 'Russia', 'Belgium', 'Serbia', 'Montenegro',
    'Italy', 'Portugal', 'Romania', 'Greece', 'United States of America', 'Japan',
    'Australia', 'Canada', 'New Zealand', 'South Africa',
];
const centralPowers = [
    'Germany', 'Austria', 'Hungary', 'Czechia', 'Slovakia',
    'Croatia', 'Slovenia', 'Bosnia and Herz.', 'Turkey', 'Bulgaria',
];

const battleMapData = {
    'Battle of the Frontiers': { allies: ['France', 'United Kingdom', 'Belgium'], central: ['Germany'], momentum: 85 },
    'Battle of the Marne': { allies: ['France', 'United Kingdom'], central: ['Germany'], momentum: 35 },
    'Race to the Sea': { allies: ['France', 'United Kingdom', 'Belgium'], central: ['Germany'], momentum: 50 },
    'First Battle of Ypres': { allies: ['United Kingdom', 'France', 'Belgium'], central: ['Germany'], momentum: 50 },
    'Second Battle of Ypres': { allies: ['United Kingdom', 'France', 'Belgium', 'Canada'], central: ['Germany'], momentum: 55 },
    'Battle of Verdun': { allies: ['France'], central: ['Germany'], momentum: 48 },
    'Battle of the Somme': { allies: ['United Kingdom', 'France'], central: ['Germany'], momentum: 45 },
    'Battle of Arras': { allies: ['United Kingdom', 'Canada'], central: ['Germany'], momentum: 40 },
    'Third Battle of Ypres (Passchendaele)': { allies: ['United Kingdom', 'Canada', 'Australia', 'New Zealand', 'France'], central: ['Germany'], momentum: 42 },
    'Battle of Cambrai': { allies: ['United Kingdom'], central: ['Germany'], momentum: 50 },
    'Spring Offensive (Kaiserschlacht)': { allies: ['United Kingdom', 'France', 'United States of America', 'Portugal'], central: ['Germany'], momentum: 75 },
    'Hundred Days Offensive': { allies: ['United Kingdom', 'France', 'United States of America', 'Canada', 'Australia', 'New Zealand', 'Belgium'], central: ['Germany'], momentum: 10 },
    'Battle of Tannenberg': { allies: ['Russia'], central: ['Germany'], momentum: 85 },
    'Battle of Masurian Lakes I': { allies: ['Russia'], central: ['Germany'], momentum: 70 },
    'Battle of Masurian Lakes II': { allies: ['Russia'], central: ['Germany'], momentum: 75 },
    'Gorlice–Tarnów Offensive': { allies: ['Russia'], central: ['Germany', 'Austria', 'Hungary', 'Czechia', 'Slovakia', 'Croatia', 'Slovenia', 'Bosnia and Herz.'], momentum: 90 },
    'The Great Retreat': { allies: ['Russia'], central: ['Germany', 'Austria', 'Hungary', 'Czechia', 'Slovakia', 'Croatia', 'Slovenia', 'Bosnia and Herz.'], momentum: 95 },
    'Lake Naroch Offensive': { allies: ['Russia'], central: ['Germany'], momentum: 55 },
    'Brusilov Offensive': { allies: ['Russia'], central: ['Austria', 'Hungary', 'Czechia', 'Slovakia', 'Croatia', 'Slovenia', 'Bosnia and Herz.', 'Germany'], momentum: 20 },
    'Kerensky Offensive': { allies: ['Russia'], central: ['Germany', 'Austria', 'Hungary', 'Czechia', 'Slovakia', 'Croatia', 'Slovenia', 'Bosnia and Herz.'], momentum: 80 },
    'Treaty of Brest-Litovsk': { allies: ['Russia'], central: ['Germany', 'Austria', 'Hungary', 'Czechia', 'Slovakia', 'Croatia', 'Slovenia', 'Bosnia and Herz.', 'Turkey', 'Bulgaria'], momentum: 100 },
    'Gallipoli Campaign': { allies: ['United Kingdom', 'France', 'Australia', 'New Zealand'], central: ['Turkey', 'Germany'], momentum: 65 },
    'Sinai and Palestine Campaign': { allies: ['United Kingdom', 'Australia', 'New Zealand', 'France'], central: ['Turkey', 'Germany'], momentum: 20 },
    'Mesopotamian Campaign': { allies: ['United Kingdom'], central: ['Turkey', 'Germany'], momentum: 30 },
    'Arab Revolt': { allies: ['United Kingdom'], central: ['Turkey'], momentum: 15 },
    'Battle of Heligoland Bight': { allies: ['United Kingdom'], central: ['Germany'], momentum: 30 },
    'Battle of Jutland': { allies: ['United Kingdom'], central: ['Germany'], momentum: 50 },
    'U-boat Campaign': { allies: ['United Kingdom', 'United States of America', 'France'], central: ['Germany'], momentum: 50 },
    'Battles of the Isonzo': { allies: ['Italy'], central: ['Austria', 'Hungary', 'Czechia', 'Slovakia', 'Croatia', 'Slovenia', 'Bosnia and Herz.'], momentum: 55 },
    'Battle of Caporetto': { allies: ['Italy'], central: ['Germany', 'Austria', 'Hungary', 'Czechia', 'Slovakia', 'Croatia', 'Slovenia', 'Bosnia and Herz.'], momentum: 85 },
    'Battle of Vittorio Veneto': { allies: ['Italy', 'United Kingdom', 'France', 'United States of America'], central: ['Austria', 'Hungary', 'Czechia', 'Slovakia', 'Croatia', 'Slovenia', 'Bosnia and Herz.'], momentum: 10 },
};

const FRONTS = [
    { id: 'west', label: '⚔️ Western Front', color: '#6ea8d8', border: '#3a6090' },
    { id: 'east', label: '🛡️ Eastern Front', color: '#E6192B', border: '#9b1a1a' },
    { id: 'middle-east', label: '🌙 Middle East', color: '#c9a84c', border: '#8a7131' },
    { id: 'italian', label: '🏔️ Italian Front', color: '#3d8c46', border: '#205426' },
    { id: 'naval', label: '⚓ Naval', color: '#4c9bc9', border: '#2a5f7e' },
];

// Animated tug-of-war momentum bar
const MomentumBar = ({ alliedPct, centralPct, battleKey }) => {
    const alliedRef = useRef(null);
    const centralRef = useRef(null);

    useEffect(() => {
        // Start at 0, then animate to target on next frames
        if (alliedRef.current) alliedRef.current.style.width = '0%';
        if (centralRef.current) centralRef.current.style.width = '0%';
        const raf1 = requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                if (alliedRef.current) alliedRef.current.style.width = `${alliedPct}%`;
                if (centralRef.current) centralRef.current.style.width = `${centralPct}%`;
            });
        });
        return () => cancelAnimationFrame(raf1);
    }, [battleKey]);

    return (
        <div style={{ padding: '0.8rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontWeight: 700, flexShrink: 0 }}>Momentum</span>
            <div style={{ flex: 1, display: 'flex', borderRadius: '4px', overflow: 'hidden', height: '22px' }}>
                <div ref={alliedRef} style={{ width: '0%', transition: 'width 0.85s cubic-bezier(0.34,1.2,0.64,1)', background: 'linear-gradient(90deg,#4682b4,#6ea8d8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    {alliedPct > 14 ? `${alliedPct}%` : ''}
                </div>
                <div ref={centralRef} style={{ width: '0%', transition: 'width 0.85s cubic-bezier(0.34,1.2,0.64,1)', background: 'linear-gradient(90deg,#b41e1e,#e74c3c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    {centralPct > 14 ? `${centralPct}%` : ''}
                </div>
            </div>
            <div style={{ display: 'flex', gap: '0.8rem', fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', flexShrink: 0 }}>
                <span>🔵 Allied</span><span>🔴 Central</span>
            </div>
        </div>
    );
};

const QUOTES = [
    { quote: "Dulce et decorum est pro patria mori. \u2014 Sweet and honourable it is to die for one\u2019s country.", author: 'Wilfred Owen', role: 'War Poet, 1917', color: '#6ea8d8' },
    { quote: 'I died in hell \u2014 they called it Passchendaele.', author: 'Siegfried Sassoon', role: 'British Officer & Poet', color: '#c0392b' },
    { quote: 'The war to end all wars has proved to be a war to end peace.', author: 'Woodrow Wilson', role: 'US President, 1918', color: '#c9a84c' },
];

const QuoteSlideshow = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % QUOTES.length);
        }, 6000); // 6 seconds per slide
        return () => clearInterval(timer);
    }, []);

    const q = QUOTES[currentIndex];

    return (
        <div style={{ position: 'relative', overflow: 'hidden', padding: '2.5rem 3rem', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: `1px solid ${q.color}25`, borderLeft: `4px solid ${q.color}`, textAlign: 'center', transition: 'all 0.8s ease', minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '4rem', color: q.color, opacity: 0.15, lineHeight: 1, position: 'absolute', top: '1rem', left: '2rem', fontFamily: 'Georgia, serif', transition: 'color 0.8s ease' }}>❝</div>

            <p key={`text-${currentIndex}`} style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.25rem', lineHeight: 1.6, fontStyle: 'italic', margin: '0 0 1.5rem', maxWidth: '800px', zIndex: 1, animation: 'fadeIn 0.8s ease' }}>
                {q.quote}
            </p>

            <div key={`author-${currentIndex}`} style={{ zIndex: 1, animation: 'fadeIn 0.8s ease 0.15s both' }}>
                <div style={{ color: q.color, fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{q.author}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginTop: '0.3rem' }}>{q.role}</div>
            </div>

            <div style={{ position: 'absolute', bottom: '1.2rem', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '0.6rem', zIndex: 2 }}>
                {QUOTES.map((_, i) => (
                    <div key={i} onClick={() => setCurrentIndex(i)} style={{ width: i === currentIndex ? '24px' : '8px', height: '8px', borderRadius: '4px', background: i === currentIndex ? q.color : 'rgba(255,255,255,0.2)', cursor: 'pointer', transition: 'all 0.4s ease' }} />
                ))}
            </div>
        </div>
    );
};

const Battles = () => {
    const [activeFront, setActiveFront] = useState('west');
    const [expandedBattle, setExpandedBattle] = useState(null);
    const [westernBattles, setWesternBattles] = useState([]);
    const [easternBattles, setEasternBattles] = useState([]);
    const [middleEastBattles, setMiddleEastBattles] = useState([]);
    const [navalBattles, setNavalBattles] = useState([]);
    const [italianBattles, setItalianBattles] = useState([]);

    useEffect(() => {
        async function fetchBattles() {
            const { data, error } = await supabase.from('battles').select('*');
            if (error) { console.error('Error fetching battles:', error); }
            else if (data) {
                setWesternBattles(data.filter(b => b.front === 'western'));
                setEasternBattles(data.filter(b => b.front === 'eastern'));
                setMiddleEastBattles(data.filter(b => b.front === 'middle-east'));
                setNavalBattles(data.filter(b => b.front === 'naval'));
                setItalianBattles(data.filter(b => b.front === 'italian'));
            }
        }
        fetchBattles();
    }, []);

    const isWest = activeFront === 'west';
    const isEast = activeFront === 'east';
    const isMidEast = activeFront === 'middle-east';
    const isNaval = activeFront === 'naval';
    const isItalian = activeFront === 'italian';

    const battles = isWest ? westernBattles : isEast ? easternBattles : isMidEast ? middleEastBattles : isNaval ? navalBattles : italianBattles;

    let accent = '#6ea8d8'; let topBorder = '#3a6090';
    if (isEast) { accent = '#E6192B'; topBorder = '#9b1a1a'; }
    else if (isMidEast) { accent = '#c9a84c'; topBorder = '#8a7131'; }
    else if (isNaval) { accent = '#4c9bc9'; topBorder = '#2a5f7e'; }
    else if (isItalian) { accent = '#3d8c46'; topBorder = '#205426'; }

    const borderColor = `${accent}4d`;

    const mapCfg =
        activeFront === 'west' ? { rotate: [-5, -48, 0], scale: 2800 } :
            activeFront === 'east' ? { rotate: [-28, -52, 0], scale: 1900 } :
                activeFront === 'middle-east' ? { rotate: [-22, -42, 0], scale: 1050 } :
                    activeFront === 'italian' ? { rotate: [-13, -45, 0], scale: 3200 } :
                        { rotate: [-15, -52, 0], scale: 1400 };

    // Use b.name (correct Supabase field)
    const displayBattle = (expandedBattle ? battles.find(b => b.name === expandedBattle) : null) || battles[0];

    const getCountryFill = (geoName) => {
        const mapEntry = displayBattle ? battleMapData[displayBattle.name] : null;
        if (!mapEntry) {
            if (alliedPowers.includes(geoName)) return `${accent}55`;
            if (centralPowers.includes(geoName)) return 'rgba(180,30,30,0.35)';
            return 'rgba(255,255,255,0.04)';
        }
        // Use the front's accent color for allied participants, crimson for central
        if (mapEntry.allies.includes(geoName)) return accent;
        if (mapEntry.central.includes(geoName)) return '#c0392b';
        return 'rgba(255,255,255,0.04)';
    };

    return (
        <div style={{ backgroundColor: 'var(--bg-deep)', color: 'var(--text-primary)', minHeight: '100vh' }}>
            <Tooltip id="my-tooltip" style={{ zIndex: 9999, fontSize: '0.85rem', borderRadius: '6px', padding: '6px 12px' }} />

            <div style={{ width: '100%', padding: '1.5rem 1.5rem' }}>

                {/* ── Hero Banner ── */}
                <div style={{ position: 'relative', marginBottom: '2.5rem', borderRadius: '16px', overflow: 'hidden', background: 'linear-gradient(135deg, rgba(8,8,14,0.96) 0%, rgba(20,8,8,0.96) 100%)', border: '1px solid rgba(192,57,43,0.2)', padding: '3.5rem 5rem 3rem' }}>
                    {/* Ambient numbers watermark */}
                    {['1914', '1915', '1916', '1917', '1918'].map((yr, i) => (
                        <div key={yr} style={{ position: 'absolute', top: i % 2 === 0 ? '10%' : '45%', left: `${10 + i * 18}%`, fontSize: '8rem', fontWeight: 900, color: 'rgba(192,57,43,0.04)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none', letterSpacing: '-0.04em' }}>{yr}</div>
                    ))}
                    <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
                        <div>
                            <div style={{ fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#c0392b', fontWeight: 700, marginBottom: '0.8rem', opacity: 0.85 }}>1914 – 1918 · All Fronts</div>
                            <h1 style={{ fontSize: 'clamp(2rem,4vw,3.2rem)', color: '#fff', fontWeight: 900, margin: '0 0 1rem', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                                The War's<br />
                                <span style={{ background: 'linear-gradient(135deg,#c0392b,#e74c3c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Defining Battles</span>
                            </h1>
                            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem', margin: 0, maxWidth: '500px', lineHeight: 1.75, fontStyle: 'italic' }}>
                                "The war that was supposed to end by Christmas lasted 1,561 days and claimed the lives of 17 million people."
                            </p>
                        </div>
                        {/* Quick totals */}
                        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                            {[
                                { num: '30+', label: 'Major Battles' },
                                { num: '5', label: 'War Fronts' },
                                { num: '65M', label: 'Soldiers' },
                            ].map(s => (
                                <div key={s.label} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(192,57,43,0.2)', borderRadius: '10px', padding: '1rem 1.4rem' }}>
                                    <div style={{ fontSize: '2rem', fontWeight: 900, color: '#c0392b', lineHeight: 1 }}>{s.num}</div>
                                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.3rem' }}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Front Overview Cards ── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
                    {[
                        { id: 'west', icon: '⚔️', label: 'Western Front', color: '#6ea8d8', battles: '12', note: 'Trench stalemate' },
                        { id: 'east', icon: '🛡️', label: 'Eastern Front', color: '#E6192B', battles: '9', note: 'Mobile warfare' },
                        { id: 'middle-east', icon: '🌙', label: 'Middle East', color: '#c9a84c', battles: '4', note: 'Desert campaigns' },
                        { id: 'italian', icon: '🏔️', label: 'Italian Front', color: '#3d8c46', battles: '3', note: 'Alpine warfare' },
                        { id: 'naval', icon: '⚓', label: 'Naval', color: '#4c9bc9', battles: '3', note: 'Atlantic & North Sea' },
                    ].map(fr => (
                        <button key={fr.id} onClick={() => { setActiveFront(fr.id); setExpandedBattle(null); }}
                            style={{ background: activeFront === fr.id ? `${fr.color}18` : 'rgba(255,255,255,0.02)', border: `1px solid ${activeFront === fr.id ? fr.color : 'rgba(255,255,255,0.07)'}`, borderTop: `3px solid ${fr.color}`, borderRadius: '10px', padding: '1rem 0.8rem', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s ease' }}>
                            <div style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>{fr.icon}</div>
                            <div style={{ color: activeFront === fr.id ? '#fff' : 'rgba(255,255,255,0.6)', fontWeight: 700, fontSize: '0.78rem', lineHeight: 1.2, marginBottom: '0.2rem' }}>{fr.label}</div>
                            <div style={{ color: fr.color, fontSize: '0.65rem', fontWeight: 800 }}>{fr.battles} Battles</div>
                            <div style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.62rem', marginTop: '0.2rem' }}>{fr.note}</div>
                        </button>
                    ))}
                </div>


                {/* Main Panel */}
                <div style={{ background: 'rgba(255,255,255,0.015)', border: `1px solid ${borderColor}`, borderTop: `4px solid ${topBorder}`, borderRadius: '12px', overflow: 'hidden', display: 'flex', minHeight: 'calc(100vh - 430px)' }}>

                    {/* Left: Battle List */}
                    <div style={{ width: '320px', flexShrink: 0, borderRight: `1px solid ${borderColor}`, overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: `${accent}33 transparent` }}>
                        <div style={{ padding: '1rem 1.4rem 0.7rem', borderBottom: `1px solid ${accent}18` }}>
                            <div style={{ fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: accent, fontWeight: 700, opacity: 0.65 }}>
                                {activeFront === 'west' ? 'Western Front' : activeFront === 'east' ? 'Eastern Front' : activeFront === 'middle-east' ? 'Middle East' : activeFront === 'naval' ? 'Naval Warfare' : 'Italian Front'} · {battles.length} Battles
                            </div>
                        </div>
                        {battles.length === 0 && (
                            <div style={{ padding: '2rem', textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '0.85rem' }}>Loading…</div>
                        )}
                        {battles.map((battle, idx) => {
                            const isActive = displayBattle?.name === battle.name;
                            return (
                                <div key={battle.name}
                                    onClick={() => setExpandedBattle(battle.name)}
                                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = `${accent}09`; }}
                                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                                    style={{ padding: '0.8rem 1.4rem', cursor: 'pointer', transition: 'background 0.15s ease', display: 'flex', alignItems: 'center', gap: '0.85rem', borderBottom: `1px solid ${accent}0d`, position: 'relative', background: isActive ? `${accent}14` : 'transparent' }}>
                                    <div style={{ position: 'absolute', left: 0, top: '18%', bottom: '18%', width: isActive ? '3px' : '0', background: accent, borderRadius: '0 2px 2px 0', transition: 'width 0.2s ease' }} />
                                    <span style={{ color: accent, opacity: isActive ? 0.55 : 0.18, fontWeight: 900, fontSize: '0.9rem', width: '1.5rem', flexShrink: 0, textAlign: 'right' }}>{String(idx + 1).padStart(2, '0')}</span>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.65)', fontWeight: isActive ? 700 : 400, fontSize: '0.84rem', lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{battle.name}</div>
                                        <div style={{ color: accent, fontSize: '0.67rem', opacity: isActive ? 0.75 : 0.35, marginTop: '0.12rem' }}>{battle.date}</div>
                                    </div>
                                    {isActive && <span style={{ color: accent, fontSize: '0.85rem', flexShrink: 0 }}>›</span>}
                                </div>
                            );
                        })}
                    </div>

                    {/* Right: Detail + Map */}
                    {displayBattle && (() => {
                        const b = displayBattle;
                        const bIdx = battles.findIndex(x => x.name === b.name);
                        const mapData = battleMapData[b.name];
                        const momentum = mapData?.momentum ?? 50;
                        const alliedPct = 100 - momentum;
                        const centralPct = momentum;
                        return (
                            <div style={{ flex: 1, position: 'relative', overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: `${accent}33 transparent`, padding: '2rem 2.5rem' }}>
                                {/* Ambient glow */}
                                <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '350px', height: '350px', background: `radial-gradient(circle, ${accent}0f 0%, transparent 65%)`, pointerEvents: 'none' }} />
                                {/* Watermark number */}
                                <div style={{ position: 'absolute', top: '0.5rem', right: '1.5rem', fontSize: '9rem', fontWeight: 900, color: `${accent}07`, lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>{String(bIdx + 1).padStart(2, '0')}</div>

                                <div style={{ position: 'relative', zIndex: 1 }}>
                                    {/* Title */}
                                    <div style={{ marginBottom: '1.6rem' }}>
                                        <h2 style={{ color: '#fff', fontSize: 'clamp(1.3rem, 2.2vw, 1.9rem)', fontWeight: 900, margin: '0 0 0.5rem', lineHeight: 1.15, letterSpacing: '-0.02em' }}>{b.name}</h2>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
                                            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem' }}>{b.dateRange}</span>
                                            {b.victor && <>
                                                <span style={{ width: '1px', height: '12px', background: 'rgba(255,255,255,0.1)' }} />
                                                <span style={{ background: `${accent}1e`, border: `1px solid ${accent}44`, color: accent, fontSize: '0.72rem', fontWeight: 800, padding: '0.18rem 0.85rem', borderRadius: '20px' }}>Victory: {b.victor}</span>
                                            </>}
                                        </div>
                                    </div>

                                    <div style={{ height: '1px', background: `linear-gradient(to right, ${accent}30, transparent)`, marginBottom: '1.6rem' }} />

                                    {/* Facts + Results */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '1.8rem' }}>
                                        <div>
                                            <div style={{ fontSize: '0.58rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', fontWeight: 700, marginBottom: '1rem' }}>Key Facts</div>
                                            {(b.facts || [b.note]).filter(Boolean).map((f, i) => (
                                                <div key={i} style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                                                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: accent, flexShrink: 0, marginTop: '0.5rem', opacity: 0.55 }} />
                                                    <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.88rem', lineHeight: 1.7 }}>{f}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.58rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: accent, fontWeight: 700, marginBottom: '1rem', opacity: 0.7 }}>Result</div>
                                            {(b.result || []).map((r, i) => (
                                                <div key={i} style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                                                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: accent, flexShrink: 0, marginTop: '0.5rem' }} />
                                                    <span style={{ color: `${accent}c0`, fontSize: '0.88rem', lineHeight: 1.7 }}>{r}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Map — always shown; MomentumBar always shown (50/50 fallback when no data) */}
                                    <div style={{ marginBottom: '1.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: `1px solid ${accent}22`, overflow: 'hidden' }}>
                                        <MomentumBar
                                            alliedPct={alliedPct}
                                            centralPct={centralPct}
                                            battleKey={b.name}
                                        />
                                        <ComposableMap projection="geoAzimuthalEqualArea"
                                            projectionConfig={{ rotate: mapCfg.rotate, scale: mapCfg.scale }}
                                            style={{ width: '100%', height: 'calc(100vh - 520px)', minHeight: '380px', background: 'rgba(10,20,40,0.6)' }}>
                                            <Geographies geography={geoUrl}>
                                                {({ geographies }) =>
                                                    geographies.map(geo => {
                                                        const name = geo.properties.name;
                                                        const fill = getCountryFill(name);
                                                        return (
                                                            <Geography key={geo.rsmKey} geography={geo}
                                                                data-tooltip-id="my-tooltip" data-tooltip-content={name}
                                                                style={{ default: { fill, stroke: 'rgba(255,255,255,0.12)', strokeWidth: 0.4, outline: 'none' }, hover: { fill: `${accent}55`, stroke: accent, strokeWidth: 0.8, outline: 'none', cursor: 'default' }, pressed: { outline: 'none' } }} />
                                                        );
                                                    })
                                                }
                                            </Geographies>
                                        </ComposableMap>
                                    </div>

                                    {/* Battle image if available */}
                                    {b.img && (
                                        <img src={b.img} alt={b.name} style={{ width: '100%', borderRadius: '8px', border: `1px solid ${accent}22`, marginBottom: '1rem', maxHeight: '220px', objectFit: 'cover' }} />
                                    )}
                                </div>
                            </div>
                        );
                    })()}
                </div>

                {/* ── Bottom: Casualty Stats ── */}
                <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: '1rem', marginBottom: '2rem' }}>
                    {[
                        { label: 'Western Front Deaths', val: '3.2M+', color: '#6ea8d8', icon: '⚔️' },
                        { label: 'Eastern Front Deaths', val: '4.5M+', color: '#E6192B', icon: '🛡️' },
                        { label: 'Gallipoli Casualties', val: '473K', color: '#c9a84c', icon: '🌙' },
                        { label: 'Isonzo Battles', val: '11 Battles', color: '#3d8c46', icon: '🏔️' },
                        { label: 'Ships Sunk by U-boats', val: '5,000+', color: '#4c9bc9', icon: '⚓' },
                        { label: 'Days of War', val: '1,561', color: '#c0392b', icon: '📅' },
                    ].map(s => (
                        <div key={s.label} style={{ background: `${s.color}0c`, border: `1px solid ${s.color}30`, borderTop: `2px solid ${s.color}`, borderRadius: '10px', padding: '1.2rem 1rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>{s.icon}</div>
                            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: s.color, lineHeight: 1, marginBottom: '0.3rem' }}>{s.val}</div>
                            <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.05em', lineHeight: 1.4 }}>{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* ── Bottom: Famous Quotes Slideshow ── */}
                <QuoteSlideshow />

            </div>

            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes growAllied { from { width: 0%; } to { width: var(--target); } }
                @keyframes growCentral { from { width: 0%; } to { width: var(--target); } }
                .momentum-allied {
                    width: var(--target);
                    animation: growAllied 0.85s cubic-bezier(0.34,1.2,0.64,1) forwards;
                    overflow: hidden;
                    white-space: nowrap;
                }
                .momentum-central {
                    width: var(--target);
                    animation: growCentral 0.85s cubic-bezier(0.34,1.2,0.64,1) forwards;
                    overflow: hidden;
                    white-space: nowrap;
                }
            `}</style>
        </div>
    );
};

export default Battles;
