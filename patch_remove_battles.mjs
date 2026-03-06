import fs from 'fs';

const file = 'src/components/WarOverviewTabs.jsx';
let text = fs.readFileSync(file, 'utf8');

// Removals
text = text.replace("import { supabase } from '../supabaseClient';\n", "");
text = text.replace("import React, { useState, useEffect }", "import React, { useState }");

const lines = text.split('\n');

// 1. Remove battleMapData
let start1 = lines.findIndex(l => l.startsWith('const battleMapData = {'));
let end1 = lines.findIndex((l, i) => i > start1 && l.startsWith('};'));
if (start1 !== -1 && end1 !== -1) {
    lines.splice(start1, end1 - start1 + 1);
}

// 2. Remove states and effect
let start2 = lines.findIndex(l => l.includes('const [activeFront, setActiveFront] = useState(null);'));
let end2 = lines.findIndex(l => l.includes('const borderColor = `${accent}4d`; // 30% opacity of accent'));
if (start2 !== -1 && end2 !== -1) {
    lines.splice(start2, end2 - start2 + 1);
}

// 3. Remove the Battle Section block at the bottom
let start3 = lines.findIndex(l => l.includes('{/* ── WF / EF Battle Detail Toggles ── */}'));
let end3 = lines.findIndex((l, i) => i > start3 && l.includes('        </div>') && lines[i + 1] === '    );');
if (start3 !== -1 && end3 !== -1) {
    // Keep the closing div of the main wrapper by stopping before `    </div>` that matches `    );`
    lines.splice(start3, end3 - start3);
}

fs.writeFileSync(file, lines.join('\n'));
console.log("Done modifying WarOverviewTabs.jsx");
