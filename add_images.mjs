import { readFileSync, writeFileSync } from 'fs';

const f = 'c:/Users/pavan/ww1/src/components/PreWW1.jsx';
let c = readFileSync(f, 'utf-8');

// Add img field to each figure in the allied array
c = c.replace(
    `{ id: 'haig', name: 'Sir Douglas Haig', role: 'British Commander-in-Chief', flag: '🇬🇧',`,
    `{ id: 'haig', name: 'Sir Douglas Haig', role: 'British Commander-in-Chief', flag: '🇬🇧', img: '/Sir_Douglas_Haig.jpg',`
);
c = c.replace(
    `{ id: 'joffre', name: 'Joseph Joffre', role: 'French Commander-in-Chief', flag: '🇫🇷',`,
    `{ id: 'joffre', name: 'Joseph Joffre', role: 'French Commander-in-Chief', flag: '🇫🇷', img: '/Portrait_de_Joseph_Joffre_(cropped)(b).jpg',`
);
c = c.replace(
    `{ id: 'pershing', name: 'John J. Pershing', role: 'US Expeditionary Force Commander', flag: '🇺🇸',`,
    `{ id: 'pershing', name: 'John J. Pershing', role: 'US Expeditionary Force Commander', flag: '🇺🇸', img: '/250px-General_John_Joseph_Pershing_head_on_shoulders.jpg',`
);
c = c.replace(
    `{ id: 'brusilov', name: 'Aleksei Brusilov', role: 'Russian General', flag: '🇷🇺',`,
    `{ id: 'brusilov', name: 'Aleksei Brusilov', role: 'Russian General', flag: '🇷🇺', img: '/Брусилов_Алексей_Алексеевич.jpg',`
);
c = c.replace(
    `{ id: 'kaiser', name: 'Kaiser Wilhelm II', role: 'German Emperor & Supreme Warlord', flag: '🇩🇪',`,
    `{ id: 'kaiser', name: 'Kaiser Wilhelm II', role: 'German Emperor & Supreme Warlord', flag: '🇩🇪', img: '/Kaiser_Wilhelm_II_of_Germany_-_1902_(cropped).jpg',`
);
c = c.replace(
    `{ id: 'hindenburg', name: 'Paul von Hindenburg', role: 'German Field Marshal', flag: '🇩🇪',`,
    `{ id: 'hindenburg', name: 'Paul von Hindenburg', role: 'German Field Marshal', flag: '🇩🇪', img: '/Bundesarchiv_Bild_183-C06886,_Paul_v._Hindenburg_(cropped)(2).jpg',`
);
c = c.replace(
    `{ id: 'ludendorff', name: 'Erich Ludendorff', role: 'German Quartermaster General', flag: '🇩🇪',`,
    `{ id: 'ludendorff', name: 'Erich Ludendorff', role: 'German Quartermaster General', flag: '🇩🇪', img: '/Erich_Ludendorff_1924_Portrait_(3x4_cropped)(2).jpg',`
);
c = c.replace(
    `{ id: 'ataturk', name: 'Mustafa Kemal (Atatürk)', flag: '🇹🇷', role: 'Ottoman Commander — Gallipoli',`,
    `{ id: 'ataturk', name: 'Mustafa Kemal (Atatürk)', flag: '🇹🇷', img: '/Ataturk1930s.jpg', role: 'Ottoman Commander — Gallipoli',`
);

// Now update the card JSX: replace the flag avatar div to show photo if available
// Old: a div with flag emoji
const oldAvatar = `<div style={{ width: '48px', height: '48px', borderRadius: '50%', background: \`\${group.accent}22\`, border: \`2px solid \${group.accent}44\`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', flexShrink: 0 }}>{p.flag}</div>`;
const newAvatar = `(p.img
    ? <img src={p.img} alt={p.name} style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: \`2px solid \${group.accent}55\`, flexShrink: 0, filter: 'grayscale(20%)' }} onError={e => { e.target.style.display='none'; }} />
    : <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: \`\${group.accent}22\`, border: \`2px solid \${group.accent}44\`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', flexShrink: 0 }}>{p.flag}</div>
)`;

c = c.replace(oldAvatar, newAvatar);

writeFileSync(f, c, 'utf-8');
console.log('Done! Images added to key figures.');
