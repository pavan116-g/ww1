import fs from 'fs';

async function getWikiImage(title) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=800`;
    const res = await fetch(url, { headers: { 'User-Agent': 'CoolBot/1.0 (https://example.org/)' } });
    const data = await res.json();
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pageId === '-1' || !pages[pageId].thumbnail) return null;
    return pages[pageId].thumbnail.source;
}

const movies = [
    { title: '1917 (2019 film)', name: '1917.jpg' },
    { title: 'All Quiet on the Western Front (2022 film)', name: 'all_quiet.jpg' },
    { title: 'Paths of Glory', name: 'paths_of_glory.jpg' },
    { title: 'War Horse (film)', name: 'war_horse.jpg' },
    { title: 'They Shall Not Grow Old', name: 'grow_old.jpg' },
    { title: 'Gallipoli (1981 film)', name: 'gallipoli.jpg' }
];

async function download() {
    if (!fs.existsSync('public/movies')) fs.mkdirSync('public/movies', { recursive: true });
    for (const m of movies) {
        console.log('Fetching image URL for', m.title);
        const url = await getWikiImage(m.title);
        if (!url) {
            console.log('No image found for:', m.title);
            continue;
        }

        console.log('Downloading', url);

        const res = await fetch(url, { headers: { 'User-Agent': 'CoolBot/1.0' } });
        if (res.ok) {
            const buffer = await res.arrayBuffer();
            fs.writeFileSync(`public/movies/${m.name}`, Buffer.from(buffer));
            console.log('Successfully saved', m.name);
        } else {
            console.log('Failed to download', url, res.status);
        }
    }
}
download();
