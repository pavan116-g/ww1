// Fix the broken Battles.jsx - remove the dead false && block and old front selector
import { readFileSync, writeFileSync } from 'fs';
const f = 'c:/Users/pavan/ww1/src/pages/Battles.jsx';
let c = readFileSync(f, 'utf-8');

// Find start of broken section (the comment before false &&)
const brokenStart = c.indexOf('{/* Removed old plain header, now integrated above */}');
// Find the {/* Main Panel */} that comes AFTER all the old stuff
// There are now TWO occurrences — find the second one (the real one inside the broken block)
const mainPanelStr = '\n                {/* Main Panel */}';
const idx1 = c.indexOf(mainPanelStr);
const idx2 = c.indexOf(mainPanelStr, idx1 + 1);
const realMainPanel = idx2 !== -1 ? idx2 : idx1;

if (brokenStart === -1 || realMainPanel === -1) {
    console.error('Anchors not found', { brokenStart, realMainPanel });
    process.exit(1);
}

// Replace everything from broken section start up to (but not including) the {/* Main Panel */}
c = c.slice(0, brokenStart) + c.slice(realMainPanel);

writeFileSync(f, c, 'utf-8');
console.log('Fixed! Removed dead code block. Lines now:', c.split('\n').length);
