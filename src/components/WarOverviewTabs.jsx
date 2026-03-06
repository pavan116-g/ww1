import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

const alliedPowers = [
    "United Kingdom", "France", "Russia", "Belgium", "Serbia", "Montenegro",
    "Italy", "Portugal", "Romania", "Greece", "United States of America", "Japan",
    "Australia", "Canada", "New Zealand", "South Africa",
];
const centralPowers = [
    "Germany", "Austria", "Hungary", "Czechia", "Slovakia",
    "Croatia", "Slovenia", "Bosnia and Herz.", "Turkey", "Bulgaria",
];



const WarOverviewTabs = () => {
    const [activePanel, setActivePanel] = useState(null);

    const togglePanel = (panel) => {
        setActivePanel(activePanel === panel ? null : panel);
    };

    return (
        <div>
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
                                {[{ flag: "🇬🇧", name: "United Kingdom", role: "Led naval blockade; fought on Western Front & colonies." }, { flag: "🇫🇷", name: "France", role: "Bore the brunt of trench warfare on the Western Front." }, { flag: "🇷🇺", name: "Russia", role: "Fought on Eastern Front; collapsed after the 1917 Revolution." }, { flag: "🇮🇹", name: "Italy", role: "Joined Allies in 1915; fought Austria-Hungary in the Alps." }, { flag: "🇺🇸", name: "United States of America", role: "Entered in 1917; tipped the balance with fresh troops & resources." }, { flag: "🇯🇵", name: "Japan", role: "Seized German colonies in the Pacific & Asia." }].map(({ flag, name, role }) => (
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



        </div>
    );
};

export default WarOverviewTabs;
