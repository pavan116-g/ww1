import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { supabase } from '../supabaseClient';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

const alliedPowers = [
    "United Kingdom", "France", "Russia", "Belgium", "Serbia", "Montenegro",
    "Italy", "Portugal", "Romania", "Greece", "United States", "Japan",
    "Australia", "Canada", "New Zealand", "South Africa",
];
const centralPowers = [
    "Germany", "Austria", "Hungary", "Czechia", "Slovakia",
    "Croatia", "Slovenia", "Bosnia and Herzegovina", "Turkey", "Bulgaria",
];

const battleMapData = {
    // Western Front
    // 50 = Stalemate. < 50 = Allied Push. > 50 = Central Push.
    "Battle of the Frontiers": { allies: ["France", "United Kingdom", "Belgium"], central: ["Germany"], momentum: 85 },
    "Battle of the Marne": { allies: ["France", "United Kingdom"], central: ["Germany"], momentum: 35 },
    "Race to the Sea": { allies: ["France", "United Kingdom", "Belgium"], central: ["Germany"], momentum: 50 },
    "First Battle of Ypres": { allies: ["United Kingdom", "France", "Belgium"], central: ["Germany"], momentum: 50 },
    "Second Battle of Ypres": { allies: ["United Kingdom", "France", "Belgium", "Canada"], central: ["Germany"], momentum: 55 },
    "Battle of Verdun": { allies: ["France"], central: ["Germany"], momentum: 48 },
    "Battle of the Somme": { allies: ["United Kingdom", "France"], central: ["Germany"], momentum: 45 },
    "Battle of Arras": { allies: ["United Kingdom", "Canada"], central: ["Germany"], momentum: 40 },
    "Third Battle of Ypres (Passchendaele)": { allies: ["United Kingdom", "Canada", "Australia", "New Zealand", "France"], central: ["Germany"], momentum: 42 },
    "Battle of Cambrai": { allies: ["United Kingdom"], central: ["Germany"], momentum: 50 },
    "Spring Offensive (Kaiserschlacht)": { allies: ["United Kingdom", "France", "United States", "Portugal"], central: ["Germany"], momentum: 75 },
    "Hundred Days Offensive": { allies: ["United Kingdom", "France", "United States", "Canada", "Australia", "New Zealand", "Belgium"], central: ["Germany"], momentum: 10 },

    // Eastern Front
    "Battle of Tannenberg": { allies: ["Russia"], central: ["Germany"], momentum: 85 },
    "Battle of Masurian Lakes I": { allies: ["Russia"], central: ["Germany"], momentum: 70 },
    "Battle of Masurian Lakes II": { allies: ["Russia"], central: ["Germany"], momentum: 75 },
    "Gorlice–Tarnów Offensive": { allies: ["Russia"], central: ["Germany", "Austria", "Hungary", "Czechia", "Slovakia", "Croatia", "Slovenia", "Bosnia and Herzegovina"], momentum: 90 },
    "The Great Retreat": { allies: ["Russia"], central: ["Germany", "Austria", "Hungary", "Czechia", "Slovakia", "Croatia", "Slovenia", "Bosnia and Herzegovina"], momentum: 95 },
    "Lake Naroch Offensive": { allies: ["Russia"], central: ["Germany"], momentum: 55 },
    "Brusilov Offensive": { allies: ["Russia"], central: ["Austria", "Hungary", "Czechia", "Slovakia", "Croatia", "Slovenia", "Bosnia and Herzegovina", "Germany"], momentum: 20 },
    "Kerensky Offensive": { allies: ["Russia"], central: ["Germany", "Austria", "Hungary", "Czechia", "Slovakia", "Croatia", "Slovenia", "Bosnia and Herzegovina"], momentum: 80 },
    "Treaty of Brest-Litovsk": { allies: ["Russia"], central: ["Germany", "Austria", "Hungary", "Czechia", "Slovakia", "Croatia", "Slovenia", "Bosnia and Herzegovina", "Turkey", "Bulgaria"], momentum: 100 },

    // Middle East
    "Gallipoli Campaign": { allies: ["United Kingdom", "France", "Australia", "New Zealand"], central: ["Turkey", "Germany"], momentum: 65 }, // Ottoman defensive victory
    "Sinai and Palestine Campaign": { allies: ["United Kingdom", "Australia", "New Zealand", "France"], central: ["Turkey", "Germany"], momentum: 20 },
    "Mesopotamian Campaign": { allies: ["United Kingdom"], central: ["Turkey", "Germany"], momentum: 30 },
    "Arab Revolt": { allies: ["United Kingdom"], central: ["Turkey"], momentum: 15 },

    // Naval
    "Battle of Heligoland Bight": { allies: ["United Kingdom"], central: ["Germany"], momentum: 30 },
    "Battle of Jutland": { allies: ["United Kingdom"], central: ["Germany"], momentum: 50 },
    "U-boat Campaign": { allies: ["United Kingdom", "United States", "France"], central: ["Germany"], momentum: 50 }, // Ebbed and flowed

    // Italian Front
    "Battles of the Isonzo": { allies: ["Italy"], central: ["Austria", "Hungary", "Czechia", "Slovakia", "Croatia", "Slovenia", "Bosnia and Herzegovina"], momentum: 55 },
    "Battle of Caporetto": { allies: ["Italy"], central: ["Germany", "Austria", "Hungary", "Czechia", "Slovakia", "Croatia", "Slovenia", "Bosnia and Herzegovina"], momentum: 85 },
    "Battle of Vittorio Veneto": { allies: ["Italy", "United Kingdom", "France", "United States"], central: ["Austria", "Hungary", "Czechia", "Slovakia", "Croatia", "Slovenia", "Bosnia and Herzegovina"], momentum: 10 },
};

const PreWW1 = () => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const [activePanel, setActivePanel] = useState(null);
    const [activeFront, setActiveFront] = useState(null);
    const [expandedBattle, setExpandedBattle] = useState(null);
    const togglePanel = (name) => setActivePanel(p => p === name ? null : name);

    const [westernBattles, setWesternBattles] = useState([]);
    const [easternBattles, setEasternBattles] = useState([]);
    const [middleEastBattles, setMiddleEastBattles] = useState([]);
    const [navalBattles, setNavalBattles] = useState([]);
    const [italianBattles, setItalianBattles] = useState([]);

    useEffect(() => {
        async function fetchBattles() {
            const { data, error } = await supabase.from('battles').select('*');
            if (error) {
                console.error("Error fetching battles:", error);
            } else if (data) {
                // Sort by date/name or whatever preferred order, currently assuming natural order
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

    const battles = isWest ? westernBattles :
        isEast ? easternBattles :
            isMidEast ? middleEastBattles :
                isNaval ? navalBattles :
                    isItalian ? italianBattles : [];

    let accent = "#6ea8d8";
    let topBorder = "#3a6090";
    if (isEast) { accent = "#E6192B"; topBorder = "#9b1a1a"; }
    else if (isMidEast) { accent = "#c9a84c"; topBorder = "#8a7131"; }
    else if (isNaval) { accent = "#4c9bc9"; topBorder = "#2a5f7e"; }
    else if (isItalian) { accent = "#3d8c46"; topBorder = "#205426"; }

    const borderColor = `${accent}4d`; // 30% opacity of accent

    return (
        <div style={{ backgroundColor: "var(--bg-deep)", color: "var(--text-primary)", minHeight: "100vh", position: "relative" }}>

            <Tooltip id="my-tooltip" style={{ zIndex: 9999, fontSize: "0.85rem", borderRadius: "6px", padding: "6px 12px" }} />

            {/* ── Intro & Cards ── */}
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "5rem 2rem 3rem" }}>
                <div style={{ textAlign: "center", marginBottom: "5rem" }}>
                    <div style={{ display: "inline-block", fontSize: "0.7rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--accent-crimson)", fontWeight: "700", marginBottom: "1.2rem", padding: "0.4rem 1.2rem", border: "1px solid rgba(163,22,33,0.35)", borderRadius: "100px", background: "rgba(163,22,33,0.08)" }}>
                        Pre-War Context · 1871 – 1914
                    </div>
                    <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", marginBottom: "0", color: "var(--accent-white)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                        The <span style={{ background: "linear-gradient(135deg, #c0392b, #e74c3c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Powder Keg</span> of Europe
                    </h1>
                    <div style={{ width: "60px", height: "3px", background: "linear-gradient(90deg, transparent, var(--accent-crimson), transparent)", margin: "1.5rem auto" }} />
                    <p style={{ fontSize: "1.15rem", maxWidth: "680px", margin: "0 auto", color: "var(--text-secondary)", lineHeight: 1.8 }}>
                        In the years leading up to 1914, Europe was driven by two powerful and volatile forces, ultimately setting the stage for the Great War.
                    </p>
                </div>

                {/* Definition Cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginBottom: "4rem" }}>

                    {/* Imperialism Card */}
                    <div className="glass-panel" onMouseEnter={() => setHoveredCard('imperialism')} onMouseLeave={() => setHoveredCard(null)}
                        style={{ padding: "2.5rem", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", border: "1px solid rgba(163,22,33,0.2)", borderTop: "3px solid #c0392b", borderRadius: "16px", transition: "all 0.4s cubic-bezier(0.175,0.885,0.32,1.275)", transform: hoveredCard === 'imperialism' ? "translateY(-8px) scale(1.01)" : "translateY(0) scale(1)", boxShadow: hoveredCard === 'imperialism' ? "0 24px 48px rgba(192,57,43,0.18),0 0 0 1px rgba(192,57,43,0.15)" : "var(--glass-shadow)", background: hoveredCard === 'imperialism' ? "linear-gradient(145deg,rgba(40,10,10,0.85),rgba(20,5,5,0.9))" : "rgba(18,18,22,0.6)", cursor: "pointer" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                            <div>
                                <h2 style={{ color: hoveredCard === 'imperialism' ? "#e74c3c" : "#c0392b", margin: 0, fontSize: "2.4rem", fontWeight: "800", textTransform: "lowercase", letterSpacing: "-0.02em", transition: "color 0.3s ease", textShadow: hoveredCard === 'imperialism' ? "0 0 30px rgba(231,76,60,0.4)" : "none" }}>imperialism</h2>
                                <div style={{ color: "var(--text-muted)", fontSize: "0.95rem", fontStyle: "italic", marginTop: "0.3rem" }}>/ɪmˈpɪəriəlɪz(ə)m/ • noun</div>
                            </div>
                            <div style={{ background: hoveredCard === 'imperialism' ? "rgba(192,57,43,0.2)" : "rgba(255,255,255,0.04)", border: hoveredCard === 'imperialism' ? "1px solid rgba(192,57,43,0.3)" : "1px solid rgba(255,255,255,0.06)", padding: "12px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease", transform: hoveredCard === 'imperialism' ? "scale(1.1) rotate(-5deg)" : "scale(1) rotate(0)" }}>
                                <svg width="28" height="28" viewBox="0 0 24 24" fill={hoveredCard === 'imperialism' ? "#e74c3c" : "rgba(255,255,255,0.5)"} style={{ transition: "fill 0.3s ease" }}><path d="M2 21H22V19H2V21ZM2 17L4.5 9L9 12L12 4L15 12L19.5 9L22 17H2Z" /></svg>
                            </div>
                        </div>
                        <p style={{ fontSize: "1.1rem", lineHeight: "1.75", color: hoveredCard === 'imperialism' ? "rgba(255,255,255,0.85)" : "var(--text-secondary)", margin: 0, transition: "color 0.3s ease,opacity 0.3s ease", opacity: hoveredCard && hoveredCard !== 'imperialism' ? 0.4 : 1 }}>
                            A policy of extending a country's power and influence through{" "}
                            <span style={{ color: "#e74c3c", fontWeight: hoveredCard === 'imperialism' ? "700" : "600" }}>colonization</span>, use of military force, or other means.
                        </p>
                        <div style={{ maxHeight: hoveredCard === 'imperialism' ? "600px" : "0", opacity: hoveredCard === 'imperialism' ? 1 : 0, overflow: "hidden", transition: "max-height 0.5s ease,opacity 0.4s ease", marginTop: hoveredCard === 'imperialism' ? "1.4rem" : "0" }}>
                            <div style={{ borderTop: "1px solid rgba(192,57,43,0.2)", paddingTop: "1.2rem" }}>
                                <div style={{ fontSize: "0.68rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(192,57,43,0.7)", marginBottom: "0.8rem", fontWeight: "700" }}>Major Imperial Powers c. 1910</div>
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                                    {[
                                        { flag: "🇬🇧", name: "United Kingdom", note: "Ruled ~25% of the world's land mass" },
                                        { flag: "🇫🇷", name: "France", note: "2nd largest empire — Africa, Indochina, Pacific" },
                                        { flag: "🇩🇪", name: "Germany", note: "Colonies in Africa (Cameroon, Namibia, Tanzania)" },
                                        { flag: "🇷🇺", name: "Russia", note: "Vast land empire across Central Asia & Siberia" },
                                        { flag: "🇳🇱", name: "Netherlands", note: "Dutch East Indies (modern Indonesia)" },
                                        { flag: "🇧🇪", name: "Belgium", note: "Congo Free State — 76× Belgium's own size" },
                                        { flag: "🇵🇹", name: "Portugal", note: "Angola, Mozambique, Goa, Macau, Timor" },
                                        { flag: "🇮🇹", name: "Italy", note: "Libya, Eritrea, Italian Somaliland" },
                                        { flag: "🇺🇸", name: "United States", note: "Philippines, Puerto Rico, Guam (post-1898)" },
                                        { flag: "🇯🇵", name: "Japan", note: "Korea, Taiwan, Manchuria (expanding rapidly)" },
                                    ].map(({ flag, name, note }) => (
                                        <div key={name} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                                            <span style={{ fontSize: "1rem", flexShrink: 0 }}>{flag}</span>
                                            <div><span style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.82rem", fontWeight: "600" }}>{name}</span><span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.78rem" }}> — {note}</span></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div style={{ position: "absolute", bottom: "-30%", right: "-10%", width: "200px", height: "200px", background: "radial-gradient(circle,rgba(192,57,43,0.12) 0%,transparent 70%)", opacity: hoveredCard === 'imperialism' ? 1 : 0, transition: "opacity 0.6s ease", pointerEvents: "none" }} />
                    </div>

                    {/* Nationalism Card */}
                    <div className="glass-panel" onMouseEnter={() => setHoveredCard('nationalism')} onMouseLeave={() => setHoveredCard(null)}
                        style={{ padding: "2.5rem", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", border: "1px solid rgba(59,130,246,0.2)", borderTop: "3px solid #3b82f6", borderRadius: "16px", transition: "all 0.4s cubic-bezier(0.175,0.885,0.32,1.275)", transform: hoveredCard === 'nationalism' ? "translateY(-8px) scale(1.01)" : "translateY(0) scale(1)", boxShadow: hoveredCard === 'nationalism' ? "0 24px 48px rgba(59,130,246,0.15),0 0 0 1px rgba(59,130,246,0.12)" : "var(--glass-shadow)", background: hoveredCard === 'nationalism' ? "linear-gradient(145deg,rgba(8,18,36,0.85),rgba(4,10,20,0.9))" : "rgba(18,18,22,0.6)", cursor: "pointer" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                            <div>
                                <h2 style={{ color: hoveredCard === 'nationalism' ? "#60a5fa" : "#3b82f6", margin: 0, fontSize: "2.4rem", fontWeight: "800", textTransform: "lowercase", letterSpacing: "-0.02em", transition: "color 0.3s ease", textShadow: hoveredCard === 'nationalism' ? "0 0 30px rgba(96,165,250,0.4)" : "none" }}>nationalism</h2>
                                <div style={{ color: "var(--text-muted)", fontSize: "0.95rem", fontStyle: "italic", marginTop: "0.3rem" }}>/ˈnæʃənəlɪz(ə)m/ • noun</div>
                            </div>
                            <div style={{ background: hoveredCard === 'nationalism' ? "rgba(59,130,246,0.2)" : "rgba(255,255,255,0.04)", border: hoveredCard === 'nationalism' ? "1px solid rgba(59,130,246,0.3)" : "1px solid rgba(255,255,255,0.06)", padding: "12px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease", transform: hoveredCard === 'nationalism' ? "scale(1.1) rotate(90deg)" : "scale(1) rotate(0deg)" }}>
                                <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
                                    <path d="M40 10 H60 V90 H40 Z" fill={hoveredCard === 'nationalism' ? "#60a5fa" : "#3b82f6"} />
                                    <path d="M10 40 H90 V60 H10 Z" fill={hoveredCard === 'nationalism' ? "#60a5fa" : "#3b82f6"} />
                                    <path d="M45 15 H55 V85 H45 Z" fill={hoveredCard === 'nationalism' ? "rgba(8,18,36,0.9)" : "rgba(18,18,22,0.8)"} />
                                    <path d="M15 45 H85 V55 H15 Z" fill={hoveredCard === 'nationalism' ? "rgba(8,18,36,0.9)" : "rgba(18,18,22,0.8)"} />
                                </svg>
                            </div>
                        </div>
                        <p style={{ fontSize: "1.1rem", lineHeight: "1.75", color: hoveredCard === 'nationalism' ? "rgba(255,255,255,0.85)" : "var(--text-secondary)", margin: 0, transition: "color 0.3s ease,opacity 0.3s ease", opacity: hoveredCard && hoveredCard !== 'nationalism' ? 0.4 : 1 }}>
                            Identification with one's own nation and support for its interests, especially to the{" "}
                            <span style={{ color: hoveredCard === 'nationalism' ? "#60a5fa" : "#3b82f6", fontWeight: hoveredCard === 'nationalism' ? "700" : "600" }}>exclusion</span>{" "}or{" "}
                            <span style={{ color: hoveredCard === 'nationalism' ? "#60a5fa" : "#3b82f6", fontWeight: hoveredCard === 'nationalism' ? "700" : "600" }}>detriment</span>{" "}of the interests of other nations.
                        </p>
                        <div style={{ maxHeight: hoveredCard === 'nationalism' ? "600px" : "0", opacity: hoveredCard === 'nationalism' ? 1 : 0, overflow: "hidden", transition: "max-height 0.5s ease,opacity 0.4s ease", marginTop: hoveredCard === 'nationalism' ? "1.4rem" : "0" }}>
                            <div style={{ borderTop: "1px solid rgba(59,130,246,0.2)", paddingTop: "1.2rem" }}>
                                <div style={{ fontSize: "0.68rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(59,130,246,0.7)", marginBottom: "0.8rem", fontWeight: "700" }}>Major Nationalist Movements c. 1910</div>
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                                    {[
                                        { flag: "🇷🇸", name: "Serbia", note: "Pan-Slavic nationalism — wanted to unite South Slavs" },
                                        { flag: "🇩🇪", name: "Germany", note: "Pan-Germanism — racial & cultural supremacy ideology" },
                                        { flag: "🇮🇹", name: "Italy", note: "Irredentism — reclaim Italian-speaking Habsburg lands" },
                                        { flag: "🇵🇱", name: "Poland", note: "Sought independence split across 3 empires" },
                                        { flag: "🇦🇹", name: "Austria-Hungary", note: "Suppressed Czech, Slovak, Croat & Slovene movements" },
                                        { flag: "🇬🇷", name: "Greece", note: "Megali Idea — reclaim Byzantine territories from Ottomans" },
                                        { flag: "🇹🇷", name: "Ottoman Empire", note: "Turkish nationalism rising within a multi-ethnic empire" },
                                        { flag: "🇮🇪", name: "Ireland", note: "Irish independence movement against British rule" },
                                        { flag: "🇧🇬", name: "Bulgaria", note: "Sought Macedonia and Thrace — lost in 2nd Balkan War" },
                                        { flag: "🇷🇴", name: "Romania", note: "Wanted Transylvania (Austro-Hungarian territory)" },
                                    ].map(({ flag, name, note }) => (
                                        <div key={name} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                                            <span style={{ fontSize: "1rem", flexShrink: 0 }}>{flag}</span>
                                            <div><span style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.82rem", fontWeight: "600" }}>{name}</span><span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.78rem" }}> — {note}</span></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div style={{ position: "absolute", bottom: "-30%", right: "-10%", width: "200px", height: "200px", background: "radial-gradient(circle,rgba(59,130,246,0.1) 0%,transparent 70%)", opacity: hoveredCard === 'nationalism' ? 1 : 0, transition: "opacity 0.6s ease", pointerEvents: "none" }} />
                    </div>

                </div>
            </div>

            {/* ── Tab Bar ── */}
            <div style={{ textAlign: "center", padding: "0 2rem 0" }}>
                <div style={{ display: "inline-flex", alignItems: "center", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "0.5rem 1rem", gap: 0, backdropFilter: "blur(12px)", flexWrap: "wrap", justifyContent: "center" }}>
                    <button onClick={() => togglePanel('initiation')} style={{ position: "relative", padding: "0.8rem 2rem", fontSize: "0.88rem", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", color: activePanel === 'initiation' ? "#1a1209" : "#c9a84c", background: activePanel === 'initiation' ? "linear-gradient(135deg,#c9a84c,#e8c96a)" : "transparent", border: "none", borderRadius: "8px", cursor: "pointer", boxShadow: activePanel === 'initiation' ? "0 4px 20px rgba(201,168,76,0.4)" : "none", overflow: "hidden", transition: "all 0.25s ease", flexShrink: 0 }}>
                        <span style={{ position: "relative", zIndex: 1 }}>⚡ Initiation</span>
                        {activePanel === 'initiation' && <span style={{ position: "absolute", top: 0, left: "-75%", width: "50%", height: "100%", background: "linear-gradient(120deg,transparent,rgba(255,255,255,0.3),transparent)", animation: "shimmer 2s infinite" }} />}
                    </button>
                    <div style={{ width: "32px", height: "1px", background: "linear-gradient(90deg,rgba(201,168,76,0.4),rgba(61,140,70,0.4))", flexShrink: 0 }} />
                    <button onClick={() => togglePanel('powers')} style={{ position: "relative", padding: "0.8rem 2rem", fontSize: "0.88rem", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", color: activePanel === 'powers' ? "#0a1a0c" : "#6fcf84", background: activePanel === 'powers' ? "linear-gradient(135deg,#3d8c46,#6fcf84)" : "transparent", border: "none", borderRadius: "8px", cursor: "pointer", boxShadow: activePanel === 'powers' ? "0 4px 20px rgba(61,140,70,0.4)" : "none", overflow: "hidden", transition: "all 0.25s ease", flexShrink: 0 }}>
                        <span style={{ position: "relative", zIndex: 1 }}>🌐 Allied & Axis</span>
                        {activePanel === 'powers' && <span style={{ position: "absolute", top: 0, left: "-75%", width: "50%", height: "100%", background: "linear-gradient(120deg,transparent,rgba(255,255,255,0.25),transparent)", animation: "shimmer 2s infinite" }} />}
                    </button>
                    <div style={{ width: "32px", height: "1px", background: "linear-gradient(90deg,rgba(61,140,70,0.4),rgba(58,96,144,0.4))", flexShrink: 0 }} />
                    <button onClick={() => togglePanel('fronts')} style={{ position: "relative", padding: "0.8rem 2rem", fontSize: "0.88rem", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", color: activePanel === 'fronts' ? "#0a1220" : "#6ea8d8", background: activePanel === 'fronts' ? "linear-gradient(135deg,#3a6090,#6ea8d8)" : "transparent", border: "none", borderRadius: "8px", cursor: "pointer", boxShadow: activePanel === 'fronts' ? "0 4px 20px rgba(58,96,144,0.4)" : "none", overflow: "hidden", transition: "all 0.25s ease", flexShrink: 0 }}>
                        <span style={{ position: "relative", zIndex: 1 }}>⚔️ The Fronts</span>
                        {activePanel === 'fronts' && <span style={{ position: "absolute", top: 0, left: "-75%", width: "50%", height: "100%", background: "linear-gradient(120deg,transparent,rgba(255,255,255,0.25),transparent)", animation: "shimmer 2s infinite" }} />}
                    </button>
                </div>
            </div>

            {/* ── Shared Dropdown ── */}
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem 5rem", overflow: "hidden", maxHeight: activePanel ? "1200px" : "0", opacity: activePanel ? 1 : 0, transition: "max-height 0.65s cubic-bezier(0.4,0,0.2,1),opacity 0.45s ease" }}>

                {/* Initiation */}
                {activePanel === 'initiation' && (
                    <div style={{ display: "flex", gap: "2.5rem", alignItems: "flex-start", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.2)", borderLeft: "4px solid #c9a84c", borderRadius: "10px", padding: "2rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
                        <div style={{ flexShrink: 0, textAlign: "center" }}>
                            <img src="\ASSASINATION.png" alt="Assassination of Archduke Franz Ferdinand, 28 June 1914" style={{ width: "280px", borderRadius: "8px", boxShadow: "0 8px 30px rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.1)", display: "block" }} />
                            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem", marginTop: "0.6rem", fontStyle: "italic" }}>Contemporary illustration, 1914</p>
                        </div>
                        <div style={{ flex: 1, minWidth: "260px" }}>
                            <div style={{ fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a84c", marginBottom: "0.5rem", fontWeight: "700" }}>28 June 1914 · Sarajevo, Bosnia</div>
                            <h3 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: "800", margin: "0 0 1rem" }}>The Assassination of Archduke Franz Ferdinand</h3>
                            <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "1.05rem", lineHeight: "1.8", margin: 0 }}>
                                On <strong style={{ color: "#fff" }}>28 June 1914</strong>, Archduke Franz Ferdinand — heir to the Austro-Hungarian throne — arrived in Sarajevo with his wife, Sophie. The city was tense: Bosnia had been annexed by Austria-Hungary in 1908, and Serbian nationalists resented the occupation deeply. A group of conspirators from the <strong style={{ color: "#fff" }}>Black Hand</strong>, a Serbian secret society, positioned themselves along the motorcade route. An initial bomb attack failed, but as the Archduke's car took a <strong style={{ color: "#c9a84c" }}>wrong turn</strong> near a delicatessen, the vehicle stalled directly in front of <strong style={{ color: "#fff" }}>Gavrilo Princip</strong>, one of the conspirators. He fired two shots. Both the Archduke and Sophie were fatally wounded. Within weeks, a chain of alliances and ultimatums plunged the whole of Europe into war.
                            </p>
                        </div>
                    </div>
                )}

                {/* Allied & Axis */}
                {activePanel === 'powers' && (
                    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(61,140,70,0.2)", borderTop: "4px solid #3d8c46", borderRadius: "10px", padding: "2rem", marginTop: "1.5rem" }}>
                        <div style={{ position: "relative", width: "100%", background: "#0d1117", borderRadius: "8px", overflow: "hidden", marginBottom: "2rem", border: "1px solid rgba(255,255,255,0.06)" }}>
                            <div style={{ position: "absolute", top: "1rem", left: "1rem", zIndex: 10, background: "rgba(10,10,14,0.85)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "0.8rem 1rem", backdropFilter: "blur(8px)" }}>
                                <div style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.6rem", fontWeight: "700" }}>Map Key</div>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}><div style={{ width: "12px", height: "12px", borderRadius: "3px", background: "#22863a" }} /><span style={{ color: "#6fcf84", fontSize: "0.8rem", fontWeight: "600" }}>Allied Powers</span></div>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}><div style={{ width: "12px", height: "12px", borderRadius: "3px", background: "#E6192B" }} /><span style={{ color: "#f0716e", fontSize: "0.8rem", fontWeight: "600" }}>Central Powers</span></div>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><div style={{ width: "12px", height: "12px", borderRadius: "3px", background: "#2a2a35" }} /><span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem" }}>Neutral</span></div>
                            </div>
                            <ComposableMap projection="geoAzimuthalEqualArea" projectionConfig={{ rotate: [-15.0, -52.0, 0], scale: 1200 }} style={{ width: "100%", height: "420px", outline: "none", display: "block" }}>
                                <Geographies geography={geoUrl}>
                                    {({ geographies }) => geographies.map((geo) => {
                                        const name = geo.properties.name;
                                        const isAllied = alliedPowers.includes(name);
                                        const isCentral = centralPowers.includes(name);
                                        return (
                                            <Geography key={geo.rsmKey} geography={geo}
                                                fill={isAllied ? "#22863a" : isCentral ? "#9b1a1a" : "#1e1e2a"}
                                                stroke={isAllied ? "#1a5e2a" : isCentral ? "#6b1111" : "#2a2a38"}
                                                strokeWidth={0.5}
                                                data-tooltip-id="my-tooltip" data-tooltip-content={name}
                                                style={{ default: { outline: "none", transition: "fill 0.2s ease" }, hover: { fill: isAllied ? "#34a853" : isCentral ? "#E6192B" : "#2e2e40", outline: "none", cursor: "pointer" }, pressed: { outline: "none" } }}
                                            />
                                        );
                                    })}
                                </Geographies>
                            </ComposableMap>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                            <div>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "1.2rem" }}><div style={{ width: "4px", height: "2rem", background: "#3d8c46", borderRadius: "2px" }} /><h3 style={{ color: "#6fcf84", margin: 0, fontSize: "1.3rem", fontWeight: "800" }}>Allied Powers</h3></div>
                                {[{ flag: "🇬🇧", name: "United Kingdom", role: "Led naval blockade; fought on Western Front & colonies." }, { flag: "🇫🇷", name: "France", role: "Bore the brunt of trench warfare on the Western Front." }, { flag: "🇷🇺", name: "Russia", role: "Fought on Eastern Front; collapsed after the 1917 Revolution." }, { flag: "🇮🇹", name: "Italy", role: "Joined Allies in 1915; fought Austria-Hungary in the Alps." }, { flag: "🇺🇸", name: "United States", role: "Entered in 1917; tipped the balance with fresh troops & resources." }, { flag: "🇯🇵", name: "Japan", role: "Seized German colonies in the Pacific & Asia." }].map(({ flag, name, role }) => (
                                    <div key={name} style={{ display: "flex", gap: "0.8rem", marginBottom: "0.9rem", alignItems: "flex-start" }}><span style={{ fontSize: "1.3rem", flexShrink: 0 }}>{flag}</span><div><div style={{ color: "#6fcf84", fontWeight: "700", fontSize: "0.9rem" }}>{name}</div><div style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.85rem", lineHeight: "1.5" }}>{role}</div></div></div>
                                ))}
                            </div>
                            <div>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "1.2rem" }}><div style={{ width: "4px", height: "2rem", background: "#E6192B", borderRadius: "2px" }} /><h3 style={{ color: "#f0716e", margin: 0, fontSize: "1.3rem", fontWeight: "800" }}>Central Powers</h3></div>
                                {[{ flag: "🇩🇪", name: "Germany", role: "Military powerhouse; led offensives on both fronts." }, { flag: "🇦🇹", name: "Austria-Hungary", role: "Multi-ethnic empire; fought Russia, Serbia & Italy." }, { flag: "🇹🇷", name: "Ottoman Empire", role: "Controlled Middle East; opened southern & eastern fronts." }, { flag: "🇧🇬", name: "Bulgaria", role: "Joined in 1915; fought Serbia and the Macedonian front." }].map(({ flag, name, role }) => (
                                    <div key={name} style={{ display: "flex", gap: "0.8rem", marginBottom: "0.9rem", alignItems: "flex-start" }}><span style={{ fontSize: "1.3rem", flexShrink: 0 }}>{flag}</span><div><div style={{ color: "#f0716e", fontWeight: "700", fontSize: "0.9rem" }}>{name}</div><div style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.85rem", lineHeight: "1.5" }}>{role}</div></div></div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* The Fronts Timeline */}
                {activePanel === 'fronts' && (
                    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(58,96,144,0.25)", borderTop: "4px solid #3a6090", borderRadius: "10px", padding: "2rem", marginTop: "1.5rem" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", marginBottom: "0.5rem" }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem" }}>
                                <img src="\Western Front.png" alt="Western Front" style={{ width: "90%", maxWidth: "260px", borderRadius: "8px", boxShadow: "0 6px 24px rgba(0,0,0,0.5)", border: "2px solid rgba(110,168,216,0.5)" }} />
                                <span style={{ color: "#6ea8d8", fontWeight: "800", fontSize: "0.9rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>Western Front</span>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 1.5rem" }}>
                                <div style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", fontWeight: "700" }}>Timeline</div>
                                <div style={{ width: "2px", height: "24px", background: "linear-gradient(to bottom,rgba(110,168,216,0.6),rgba(230,25,43,0.6))", margin: "6px 0" }} />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem" }}>
                                <img src="\Eastern Front.png" alt="Eastern Front" style={{ width: "90%", maxWidth: "260px", borderRadius: "8px", boxShadow: "0 6px 24px rgba(0,0,0,0.5)", border: "2px solid rgba(230,25,43,0.5)" }} />
                                <span style={{ color: "#E6192B", fontWeight: "800", fontSize: "0.9rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>Eastern Front</span>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
                            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "2px", background: "linear-gradient(to bottom,rgba(110,168,216,0.4),rgba(230,25,43,0.4))", transform: "translateX(-50%)", zIndex: 0 }} />
                            {[
                                { year: "1914", events: [{ t: "Battle of the Frontiers (Aug) — France vs Germany → France defeated.", f: "west" }, { t: "Battle of Tannenberg (Aug) — Germany crushes Russia.", f: "east" }, { t: "Battle of Masurian Lakes I (Sep) — Another Russian defeat.", f: "east" }, { t: "Battle of the Marne (Sep) — France + Britain halt German advance.", f: "west" }, { t: "Race to the Sea (Sep–Oct) — Trenches extend to the North Sea.", f: "west" }, { t: "First Battle of Ypres (Oct–Nov) — Stalemate; trench warfare solidifies.", f: "west" }] },
                                { year: "1915", events: [{ t: "Battle of Masurian Lakes II (Feb) — More Russian defeats.", f: "east" }, { t: "Second Battle of Ypres (Apr–May) — First large-scale poison gas use.", f: "west" }, { t: "Gorlice–Tarnów Offensive (May) — Germany + Austria push Russia back 300 miles.", f: "east" }] },
                                { year: "1916", events: [{ t: "Battle of Verdun (Feb–Dec) — Longest battle of WWI, ~700,000 casualties.", f: "west" }, { t: "Battle of the Somme (Jul–Nov) — First use of tanks; 60,000 BEF lost day one.", f: "west" }, { t: "Brusilov Offensive (Jun–Sep) — Russia's greatest success; ~1.5M AH casualties.", f: "east" }] },
                                { year: "1917", events: [{ t: "Battle of Arras / Vimy Ridge (Apr) — Canadian Corps triumph.", f: "west" }, { t: "Passchendaele (Jul–Nov) — ~500,000 casualties; 8 km gained.", f: "west" }, { t: "Kerensky Offensive (Jul) — Russia's last offensive; army collapses.", f: "east" }, { t: "Russian Revolution (Nov) — Bolsheviks seize power.", f: "east" }] },
                                { year: "1918", events: [{ t: "Treaty of Brest-Litovsk (Mar) — Russia exits the war.", f: "east" }, { t: "Spring Offensive / Kaiserschlacht (Mar–Jul) — Germany's last push.", f: "west" }, { t: "Hundred Days Offensive (Aug–Nov) — Final Allied push; Germany collapses.", f: "west" }, { t: "Armistice — 11 November 1918 — The war ends.", f: "general" }] },
                            ].map(({ year, events }) => (
                                <div key={year} style={{ position: "relative", marginBottom: "0.5rem", zIndex: 1 }}>
                                    <div style={{ display: "flex", justifyContent: "center", margin: "1rem 0 0.6rem" }}>
                                        <div style={{ background: "linear-gradient(135deg,#1e2a3a,#0d1117)", border: "1px solid rgba(110,168,216,0.35)", borderRadius: "20px", padding: "0.25rem 1.1rem", fontSize: "0.8rem", fontWeight: "800", letterSpacing: "0.2em", color: "#6ea8d8", zIndex: 2 }}>{year}</div>
                                    </div>
                                    {events.map(({ t, f }, i) => {
                                        const isW = f === "west", isG = f === "general";
                                        const col = isW ? "#6ea8d8" : isG ? "rgba(255,255,255,0.6)" : "#E6192B";
                                        return (
                                            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 32px 1fr", alignItems: "center", marginBottom: "0.35rem" }}>
                                                <div style={{ textAlign: "right", paddingRight: "0.8rem", opacity: isW || isG ? 1 : 0.06 }}>
                                                    {(isW || isG) && <span style={{ color: col, fontSize: "0.82rem", lineHeight: "1.5" }}>{t}</span>}
                                                </div>
                                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
                                                    <div style={{ width: isG ? "10px" : "8px", height: isG ? "10px" : "8px", borderRadius: "50%", background: col, boxShadow: `0 0 8px ${col}`, border: "2px solid #0d1117", zIndex: 2, flexShrink: 0 }} />
                                                    {!isG && <div style={{ position: "absolute", [isW ? "right" : "left"]: "100%", width: "16px", height: "1px", background: col, opacity: 0.5 }} />}
                                                </div>
                                                <div style={{ textAlign: "left", paddingLeft: "0.8rem", opacity: !isW && !isG ? 1 : 0.06 }}>
                                                    {!isW && !isG && <span style={{ color: col, fontSize: "0.82rem", lineHeight: "1.5" }}>{t}</span>}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* ── WF / EF Battle Detail Toggles ── */}
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem 4rem" }}>
                {/* Sliding pill toggle */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
                    <div style={{ position: "relative", display: "inline-flex", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "50px", padding: "4px", backdropFilter: "blur(12px)" }}>
                        {/* Sliding pill */}
                        <div style={{
                            position: "absolute", top: "4px", bottom: "4px",
                            width: "calc(20% - 1.6px)",
                            left: activeFront === 'east' ? "calc(20% + 2.4px)" :
                                activeFront === 'middle-east' ? "calc(40% + 0.8px)" :
                                    activeFront === 'naval' ? "calc(60% - 0.8px)" :
                                        activeFront === 'italian' ? "calc(80% - 2.4px)" : "4px",
                            borderRadius: "46px",
                            background: activeFront === 'east' ? "linear-gradient(135deg,#9b1a1a,#E6192B)" :
                                activeFront === 'middle-east' ? "linear-gradient(135deg,#8a7131,#c9a84c)" :
                                    activeFront === 'naval' ? "linear-gradient(135deg,#2a5f7e,#4c9bc9)" :
                                        activeFront === 'italian' ? "linear-gradient(135deg,#205426,#3d8c46)" :
                                            "linear-gradient(135deg,#3a6090,#6ea8d8)",
                            boxShadow: `0 4px 16px ${accent}66`,
                            transition: "left 0.3s cubic-bezier(0.4,0,0.2,1), background 0.3s ease, box-shadow 0.3s ease",
                            zIndex: 0,
                        }} />
                        {/* Western option */}
                        <button onClick={() => setActiveFront(f => f === 'west' ? null : 'west')} style={{
                            position: "relative", zIndex: 1, padding: "0.6rem 1.8rem",
                            fontSize: "0.85rem", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase",
                            border: "none", borderRadius: "46px", cursor: "pointer", background: "transparent",
                            color: activeFront === 'west' ? "#fff" : "rgba(110,168,216,0.7)",
                            transition: "color 0.3s ease", whiteSpace: "nowrap", width: "20%" /* force equal width */
                        }}>🔵 Western</button>
                        {/* Eastern option */}
                        <button onClick={() => setActiveFront(f => f === 'east' ? null : 'east')} style={{
                            position: "relative", zIndex: 1, padding: "0.6rem 1.8rem",
                            fontSize: "0.85rem", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase",
                            border: "none", borderRadius: "46px", cursor: "pointer", background: "transparent",
                            color: activeFront === 'east' ? "#fff" : "rgba(230,25,43,0.7)",
                            transition: "color 0.3s ease", whiteSpace: "nowrap", width: "20%"
                        }}>🔴 Eastern</button>
                        {/* Middle East option */}
                        <button onClick={() => setActiveFront(f => f === 'middle-east' ? null : 'middle-east')} style={{
                            position: "relative", zIndex: 1, padding: "0.6rem 1.8rem",
                            fontSize: "0.85rem", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase",
                            border: "none", borderRadius: "46px", cursor: "pointer", background: "transparent",
                            color: activeFront === 'middle-east' ? "#fff" : "rgba(201,168,76,0.7)",
                            transition: "color 0.3s ease", whiteSpace: "nowrap", width: "20%"
                        }}>🟡 Mid-East</button>
                        {/* Naval option */}
                        <button onClick={() => setActiveFront(f => f === 'naval' ? null : 'naval')} style={{
                            position: "relative", zIndex: 1, padding: "0.6rem 1.8rem",
                            fontSize: "0.85rem", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase",
                            border: "none", borderRadius: "46px", cursor: "pointer", background: "transparent",
                            color: activeFront === 'naval' ? "#fff" : "rgba(76,155,201,0.7)",
                            transition: "color 0.3s ease", whiteSpace: "nowrap", width: "20%"
                        }}>🌊 Naval</button>
                        {/* Italian option */}
                        <button onClick={() => setActiveFront(f => f === 'italian' ? null : 'italian')} style={{
                            position: "relative", zIndex: 1, padding: "0.6rem 1.8rem",
                            fontSize: "0.85rem", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase",
                            border: "none", borderRadius: "46px", cursor: "pointer", background: "transparent",
                            color: activeFront === 'italian' ? "#fff" : "rgba(61,140,70,0.7)",
                            transition: "color 0.3s ease", whiteSpace: "nowrap", width: "20%"
                        }}>🟢 Italian</button>
                    </div>
                </div>

                {activeFront && (() => {
                    const displayBattle = (expandedBattle ? battles.find(b => b.name === expandedBattle) : null) || battles[0];
                    return (
                        <div style={{ background: "rgba(255,255,255,0.015)", border: `1px solid ${borderColor}`, borderTop: `4px solid ${topBorder}`, borderRadius: "12px", overflow: "hidden", display: 'flex', minHeight: '540px', marginTop: '1.5rem' }}>

                            {/* ── LEFT: Battle List ── */}
                            <div style={{ width: '290px', flexShrink: 0, borderRight: `1px solid ${borderColor}`, overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: `${accent}33 transparent` }}>
                                <div style={{ padding: '1rem 1.4rem 0.7rem', borderBottom: `1px solid ${accent}18` }}>
                                    <div style={{ fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: accent, fontWeight: 700, opacity: 0.65 }}>
                                        {activeFront === 'west' ? 'Western Front' :
                                            activeFront === 'east' ? 'Eastern Front' :
                                                activeFront === 'middle-east' ? 'Middle East' :
                                                    activeFront === 'naval' ? 'Naval Warfare' :
                                                        activeFront === 'italian' ? 'Italian Front' : ''} · {battles.length} Battles
                                    </div>
                                </div>
                                {battles.map((battle, idx) => {
                                    const isActive = displayBattle?.name === battle.name;
                                    return (
                                        <div key={battle.name}
                                            onClick={() => setExpandedBattle(battle.name)}
                                            onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = `${accent}09`; }}
                                            onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                                            style={{ padding: '0.8rem 1.4rem', cursor: 'pointer', transition: 'background 0.15s ease', display: 'flex', alignItems: 'center', gap: '0.85rem', borderBottom: `1px solid ${accent}0d`, position: 'relative', background: isActive ? `${accent}14` : 'transparent' }}
                                        >
                                            <div style={{ position: 'absolute', left: 0, top: '18%', bottom: '18%', width: isActive ? '3px' : '0', background: accent, borderRadius: '0 2px 2px 0', transition: 'width 0.2s ease' }} />
                                            <span style={{ color: accent, opacity: isActive ? 0.55 : 0.18, fontWeight: 900, fontSize: '0.92rem', width: '1.5rem', flexShrink: 0, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{String(idx + 1).padStart(2, '0')}</span>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.65)', fontWeight: isActive ? 700 : 400, fontSize: '0.84rem', lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', transition: 'color 0.15s' }}>{battle.name}</div>
                                                <div style={{ color: accent, fontSize: '0.67rem', opacity: isActive ? 0.75 : 0.35, marginTop: '0.12rem' }}>{battle.date}</div>
                                            </div>
                                            {isActive && <span style={{ color: accent, fontSize: '0.85rem', flexShrink: 0 }}>›</span>}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* ── RIGHT: Detail View ── */}
                            {displayBattle && (() => {
                                const b = displayBattle;
                                const bIdx = battles.findIndex(x => x.name === b.name);
                                return (
                                    <div style={{ flex: 1, position: 'relative', overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: `${accent}33 transparent` }}>
                                        {/* Ambient glow */}
                                        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '350px', height: '350px', background: `radial-gradient(circle, ${accent}0f 0%, transparent 65%)`, pointerEvents: 'none' }} />

                                        {/* Giant watermark number */}
                                        <div style={{ position: 'absolute', top: '0.5rem', right: '1.5rem', fontSize: '9rem', fontWeight: 900, color: `${accent}07`, lineHeight: 1, userSelect: 'none', fontVariantNumeric: 'tabular-nums', pointerEvents: 'none' }}>
                                            {String(bIdx + 1).padStart(2, '0')}
                                        </div>

                                        <div style={{ padding: '2rem 2.5rem', position: 'relative', zIndex: 1 }}>
                                            {/* Title block */}
                                            <div style={{ marginBottom: '1.6rem' }}>
                                                <h2 style={{ color: '#fff', fontSize: 'clamp(1.3rem, 2.2vw, 1.9rem)', fontWeight: 900, margin: '0 0 0.5rem', lineHeight: 1.15, letterSpacing: '-0.02em' }}>{b.name}</h2>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
                                                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', letterSpacing: '0.03em' }}>{b.dateRange}</span>
                                                    <span style={{ width: '1px', height: '12px', background: 'rgba(255,255,255,0.1)' }} />
                                                    <span style={{ background: `${accent}1e`, border: `1px solid ${accent}44`, color: accent, fontSize: '0.72rem', fontWeight: 800, padding: '0.18rem 0.85rem', borderRadius: '20px', letterSpacing: '0.04em' }}>Victory: {b.victor}</span>
                                                </div>
                                            </div>

                                            {/* Divider */}
                                            <div style={{ height: '1px', background: `linear-gradient(to right, ${accent}30, transparent)`, marginBottom: '1.6rem' }} />

                                            {/* Facts + Results grid */}
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: b.img || battleMapData[b.name] ? '1.8rem' : 0 }}>
                                                <div>
                                                    <div style={{ fontSize: '0.58rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', fontWeight: 700, marginBottom: '1rem' }}>Key Facts</div>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                                        {(b.facts || [b.note]).map((f, i) => (
                                                            <div key={i} style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start' }}>
                                                                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: accent, flexShrink: 0, marginTop: '0.5rem', opacity: 0.55 }} />
                                                                <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.88rem', lineHeight: 1.7 }}>{f}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: '0.58rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: accent, fontWeight: 700, marginBottom: '1rem', opacity: 0.7 }}>Result of the War</div>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                                        {(b.result || []).map((r, i) => (
                                                            <div key={i} style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start' }}>
                                                                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: accent, flexShrink: 0, marginTop: '0.5rem' }} />
                                                                <span style={{ color: `${accent}c0`, fontSize: '0.88rem', lineHeight: 1.7 }}>{r}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Battle Map */}
                                            {(() => {
                                                const mapData = battleMapData[b.name];
                                                if (!mapData) return null;

                                                const projConfig = activeFront === 'west' ? { rotate: [-5.0, -49.0, 0], scale: 2800 } :
                                                    activeFront === 'east' ? { rotate: [-24.0, -52.0, 0], scale: 1900 } :
                                                        activeFront === 'middle-east' ? { rotate: [-38.0, -35.0, 0], scale: 1600 } :
                                                            activeFront === 'italian' ? { rotate: [-12.0, -45.0, 0], scale: 3200 } :
                                                                { rotate: [-15.0, -52.0, 0], scale: 1200 }; // naval / default

                                                const centralColor = "#E6192B"; // Standard Central Powers Red

                                                return (
                                                    <div style={{ marginBottom: '1.8rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: `1px solid ${accent}22`, padding: '1rem', position: 'relative', overflow: 'hidden' }}>
                                                        <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 10, background: 'rgba(10,10,14,0.85)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '0.6rem 0.8rem', backdropFilter: 'blur(8px)' }}>
                                                            <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '0.6rem', fontWeight: 700 }}>Battle Theatre</div>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                                                                <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: accent }} />
                                                                <span style={{ color: accent, fontSize: '0.75rem', fontWeight: 600 }}>Allied Forces</span>
                                                            </div>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                                <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: centralColor }} />
                                                                <span style={{ color: centralColor, fontSize: '0.75rem', fontWeight: 600 }}>Central Powers</span>
                                                            </div>
                                                        </div>
                                                        <ComposableMap projection="geoAzimuthalEqualArea" projectionConfig={projConfig} style={{ width: '100%', height: '350px', outline: 'none' }}>
                                                            <Geographies geography={geoUrl}>
                                                                {({ geographies }) => geographies.map((geo) => {
                                                                    const name = geo.properties.name;
                                                                    const isAllied = mapData.allies.includes(name);
                                                                    const isCentral = mapData.central.includes(name);

                                                                    let fillColor = "#1e1e2a";
                                                                    let hoverColor = "#2e2e40";
                                                                    let strokeColor = "#2a2a38";

                                                                    if (isAllied) {
                                                                        fillColor = accent;
                                                                        hoverColor = `${accent}dd`;
                                                                        strokeColor = "#fff";
                                                                    } else if (isCentral) {
                                                                        fillColor = centralColor;
                                                                        hoverColor = `${centralColor}dd`;
                                                                        strokeColor = "#fff";
                                                                    }

                                                                    return (
                                                                        <Geography key={geo.rsmKey} geography={geo}
                                                                            fill={fillColor}
                                                                            stroke={strokeColor}
                                                                            strokeWidth={0.5}
                                                                            data-tooltip-id="my-tooltip" data-tooltip-content={name}
                                                                            style={{ default: { outline: "none", transition: "fill 0.2s ease" }, hover: { fill: hoverColor, outline: "none", cursor: "pointer" }, pressed: { outline: "none" } }}
                                                                        />
                                                                    );
                                                                })}
                                                            </Geographies>
                                                        </ComposableMap>

                                                        {/* Tug of War Momentum Bar */}
                                                        {mapData.momentum !== undefined && (
                                                            <div style={{ marginTop: '0.5rem', padding: '0 0.5rem' }}>
                                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', opacity: 0.8 }}>
                                                                    <span style={{ fontSize: '0.65rem', fontWeight: 800, color: accent, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Allied Control</span>
                                                                    <span style={{ fontSize: '0.65rem', fontWeight: 800, color: centralColor, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Central Control</span>
                                                                </div>

                                                                <div style={{ height: '10px', borderRadius: '5px', background: 'rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                                                                    {/* Allied Bar (Left) */}
                                                                    <div style={{
                                                                        position: 'absolute', left: 0, top: 0, bottom: 0,
                                                                        width: `${100 - mapData.momentum}%`,
                                                                        background: `linear-gradient(90deg, ${accent}, ${accent}dd)`,
                                                                        transition: 'width 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
                                                                        boxShadow: `inset -2px 0 5px rgba(0,0,0,0.3)`
                                                                    }} />

                                                                    {/* Central Bar (Right) */}
                                                                    <div style={{
                                                                        position: 'absolute', right: 0, top: 0, bottom: 0,
                                                                        width: `${mapData.momentum}%`,
                                                                        background: `linear-gradient(-90deg, ${centralColor}, ${centralColor}dd)`,
                                                                        transition: 'width 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
                                                                        boxShadow: `inset 2px 0 5px rgba(0,0,0,0.3)`
                                                                    }} />

                                                                    {/* Center 50% Marker */}
                                                                    <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'rgba(255,255,255,0.5)', zIndex: 5, transform: 'translateX(-50%)' }} />

                                                                    {/* Dynamic Engagement Indicator (Pill) */}
                                                                    <div style={{
                                                                        position: 'absolute',
                                                                        left: `${100 - mapData.momentum}%`,
                                                                        top: '50%',
                                                                        transform: 'translate(-50%, -50%)',
                                                                        width: '4px',
                                                                        height: '14px',
                                                                        background: '#fff',
                                                                        borderRadius: '2px',
                                                                        boxShadow: '0 0 10px rgba(0,0,0,0.8)',
                                                                        transition: 'left 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
                                                                        zIndex: 6
                                                                    }} />
                                                                </div>

                                                                {/* Helper text explaining the bar */}
                                                                <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                                                                    <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.35)', fontStyle: 'italic' }}>
                                                                        {mapData.momentum === 50 ? "Brutal stalemate - minimal territory gained." :
                                                                            mapData.momentum > 50 ? "Territorial shift favoring Central Powers." :
                                                                                "Territorial shift favoring Allied Forces."}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })()}

                                            {/* Image */}
                                            {b.img && (
                                                <div style={{ borderRadius: '8px', overflow: 'hidden', border: `1px solid ${accent}22`, marginTop: '1rem' }}>
                                                    <img
                                                        src={encodeURI(b.img)}
                                                        alt={b.name}
                                                        style={{ width: '100%', height: 'auto', display: 'block', filter: 'grayscale(10%) brightness(0.9)' }}
                                                        onError={e => { e.target.parentElement.style.display = 'none'; }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>
                    );
                })()}

            </div>

            <style>{`
                @keyframes shimmer { 0% { left: -75%; } 100% { left: 125%; } }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            `}</style>
        </div>
    );
};

export default PreWW1;
