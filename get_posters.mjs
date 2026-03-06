import fs from 'fs';

const movies = [
    { id: '1917', title: '1917', url: 'https://www.imdb.com/title/tt8579674/' },
    { id: 'all_quiet', title: 'All Quiet on the Western Front', url: 'https://www.imdb.com/title/tt1016150/' },
    { id: 'paths', title: 'Paths of Glory', url: 'https://www.imdb.com/title/tt0050825/' },
    { id: 'war_horse', title: 'War Horse', url: 'https://www.imdb.com/title/tt1568911/' },
    { id: 'grow_old', title: 'They Shall Not Grow Old', url: 'https://www.imdb.com/title/tt7905466/' },
    { id: 'gallipoli', title: 'Gallipoli', url: 'https://www.imdb.com/title/tt0082432/' }
];

async function run() {
    const results = [];
    for (let m of movies) {
        try {
            let res = await fetch(m.url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36', 'Accept-Language': 'en-US,en;q=0.9' } });
            let text = await res.text();
            let match = text.match(/<meta property="og:image" content="([^"]+)"/);
            if (match) {
                results.push({ ...m, img: match[1] });
            } else {
                console.log('NO IMAGE FOR', m.title);
            }
        } catch (e) {
            console.error(e);
        }
    }
    fs.writeFileSync('imdb_images.json', JSON.stringify(results, null, 2));
    console.log('Done');
}
run();
