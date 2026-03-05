import fs from 'fs';

const file = 'src/components/WarOverviewTabs.jsx';
let code = fs.readFileSync(file, 'utf-8');

// 1. Remove battleMapData
code = code.replace(/const battleMapData = \{[\s\S]*?^\};\n/m, '');

// 2. Remove state and variables for battles
// From `const [activeFront` to `const borderColor = ...;`
code = code.replace(/    const \[activeFront[\s\S]*?const borderColor[^;]+;\s*\/\/ 30% opacity of accent\n/m, '');

// 3. Remove the entire WF/EF Battle Detail Toggles section
// From `{/* ── WF \/ EF Battle Detail Toggles ── */}` to just before `        </div>\n    );\n};`
const startIdx = code.indexOf('            {/* ── WF / EF Battle Detail Toggles ── */}');
if (startIdx !== -1) {
    const endStr = '        </div>\n    );\n};';
    const endBlockIdx = code.indexOf(endStr, startIdx);

    if (endBlockIdx !== -1) {
        code = code.substring(0, startIdx) + '\n' + code.substring(endBlockIdx);
    }
}

fs.writeFileSync(file, code, 'utf-8');
console.log('Patched WarOverviewTabs.jsx successfully');
