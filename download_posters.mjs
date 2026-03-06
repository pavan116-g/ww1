import fs from 'fs';

const posters = [
    { name: "1917.jpg", url: "https://upload.wikimedia.org/wikipedia/en/f/fe/1917_%282019%29_Film_Poster.jpeg" },
    { name: "all_quiet.jpg", url: "https://upload.wikimedia.org/wikipedia/en/8/87/All_Quiet_on_the_Western_Front_%282022_film%29_poster.jpg" },
    { name: "paths_of_glory.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Paths_of_Glory_%281957_poster%29.jpeg" },
    { name: "war_horse.jpg", url: "https://upload.wikimedia.org/wikipedia/en/9/90/War_Horse_poster.jpg" },
    { name: "grow_old.jpg", url: "https://upload.wikimedia.org/wikipedia/en/f/f3/They_Shall_Not_Grow_Old_poster.jpg" },
    { name: "gallipoli.jpg", url: "https://upload.wikimedia.org/wikipedia/en/b/b5/Gallipoli_poster.jpg" }
];

if (!fs.existsSync('public/movies')) fs.mkdirSync('public/movies', { recursive: true });

async function download() {
    for (const p of posters) {
        console.log(`Downloading ${p.name}...`);
        try {
            const res = await fetch(p.url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } });
            if (res.ok) {
                const buffer = await res.arrayBuffer();
                fs.writeFileSync(`public/movies/${p.name}`, Buffer.from(buffer));
                console.log(`Saved ${p.name}`);
            } else {
                console.error(`Failed ${p.name}: ${res.statusText}`);
            }
        } catch (e) {
            console.error(`Error ${p.name}:`, e);
        }
    }
}

download();
