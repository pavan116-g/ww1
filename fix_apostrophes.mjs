import { readFileSync, writeFileSync } from 'fs';
const f = 'c:/Users/pavan/ww1/src/components/PreWW1.jsx';
let c = readFileSync(f, 'utf-8');

// Fix all problematic apostrophes inside single-quoted JS strings in fact/bio fields
// The issue: single-quoted strings containing apostrophes (war's, Germany's, etc.)
c = c.replace("'Led 2 million US troops to Europe by war's end'", "'Led 2 million US troops to Europe by war\\'s end'");
c = c.replace("Germanys Chief of Staff", "Germany's Chief of Staff");

writeFileSync(f, c, 'utf-8');
console.log('Apostrophe fixes applied.');
