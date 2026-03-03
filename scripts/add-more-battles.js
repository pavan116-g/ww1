import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const newBattles = [
    {
        name: "Gallipoli Campaign",
        date: "1915–1916",
        dateRange: "17 Feb 1915 → 9 Jan 1916",
        victor: "Ottoman Empire",
        note: "A disastrous Allied attempt to knock the Ottoman Empire out of the war and open a sea route to Russia.",
        facts: [
            "Brainchild of Winston Churchill, initially a purely naval operation to force the Dardanelles straits.",
            "After naval failure, Allied troops (including ANZAC forces) landed on the Gallipoli peninsula.",
            "Troops faced fierce Ottoman resistance led by Mustafa Kemal (later Atatürk).",
            "Ended in an evacuation after 8 months of trench stalemate and disease."
        ],
        result: [
            "Allies suffered ~250,000 casualties; Ottomans suffered similar losses.",
            "A defining moment of national identity for Australia and New Zealand (ANZAC Day).",
            "Winston Churchill resigned in disgrace and went to fight on the Western Front.",
            "The Ottoman capital, Constantinople, was saved."
        ],
        img: "/Gallipoli.png", // Assuming user might add this image later
        front: "middle-east"
    },
    {
        name: "Battle of Jutland",
        date: "31 May–1 Jun 1916",
        dateRange: "31 May 1916 → 1 Jun 1916",
        victor: "Stalemate / British Strategic",
        note: "The largest naval battle of World War I, involving 250 ships and 100,000 men.",
        facts: [
            "Fought between the British Grand Fleet and the German High Seas Fleet in the North Sea.",
            "Germany aimed to lure out and destroy a portion of the British fleet to break the blockade.",
            "The British lost more ships (14) and men (6,000) than Germany (11 ships, 2,500 men).",
            "Despite tactical losses, the British fleet remained intact and controlled the sea."
        ],
        result: [
            "The German High Seas Fleet rarely went to sea again in force for the rest of the war.",
            "The British naval blockade remained in place, slowly starving the German war economy.",
            "Germany shifted its strategy entirely to unrestricted submarine warfare."
        ],
        img: "/Jutland.png",
        front: "naval"
    },
    {
        name: "Battle of Caporetto",
        date: "24 Oct–19 Nov 1917",
        dateRange: "24 Oct 1917 → 19 Nov 1917",
        victor: "Central Powers",
        note: "A catastrophic Italian defeat where Austro-Hungarian and German forces advanced 100km.",
        facts: [
            "Germany sent troops and used new stormtrooper tactics and poison gas to break the Italian lines.",
            "The Italian Second Army completely collapsed, falling back in a chaotic retreat.",
            "A young Erwin Rommel highly distinguished himself executing infiltration tactics.",
            "Italian forces finally halted the advance at the Piave River."
        ],
        result: [
            "Over 300,000 Italian casualties, with ~265,000 taken prisoner.",
            "Sparked a political crisis in Italy, leading to the replacement of the military command.",
            "Britain and France had to rush divisions to Italy to prevent total collapse."
        ],
        img: "/Caporetto.png",
        front: "italian"
    },
    {
        name: "Battles of the Isonzo",
        date: "1915–1917",
        dateRange: "23 Jun 1915 → 24 Oct 1917",
        victor: "Stalemate",
        note: "A series of 12 battles fought between Italy and Austria-Hungary along the Isonzo River.",
        facts: [
            "Italy entered the war aiming to capture Austro-Hungarian lands populated by Italians.",
            "The terrain was brutal: alpine mountains and rocky plateaus where shelling caused deadly stone splinters.",
            "Italian General Cadorna launched repeated frontal assaults identical to those on the Western Front.",
            "The 12th Battle was actually Caporetto, where the Central Powers broke the stalemate."
        ],
        result: [
            "Half of all Italian war casualties (almost 1 million) occurred along this single river.",
            "Gains were measured in mere miles after years of fighting.",
            "The fighting physically altered the mountainous landscape due to massive explosive mines."
        ],
        img: "/Isonzo.png",
        front: "italian"
    },
    {
        name: "Arab Revolt",
        date: "1916–1918",
        dateRange: "5 Jun 1916 → 31 Oct 1918",
        victor: "Allies / Arab Rebels",
        note: "An uprising by Arab forces against the Ottoman Empire, aided by T.E. Lawrence.",
        facts: [
            "Sharif Hussein of Mecca sought independence from Ottoman rule in exchange for a unified Arab state.",
            "The British supplied weapons, gold, and military advisors, most notably T.E. Lawrence ('Lawrence of Arabia').",
            "Employed guerrilla tactics to sabotage the vital Hejaz Railway, tying down thousands of Ottoman troops.",
            "Culminated in the capture of Damascus in October 1918."
        ],
        result: [
            "Contributed significantly to the collapse of the Ottoman Empire.",
            "The British and French secretly divided the Middle East via the Sykes-Picot Agreement.",
            "The failure to grant full Arab independence laid the groundwork for modern Middle Eastern conflicts."
        ],
        img: "/ArabRevolt.png",
        front: "middle-east"
    },
    {
        name: "Sinai and Palestine Campaign",
        date: "1915–1918",
        dateRange: "28 Jan 1915 → 31 Oct 1918",
        victor: "Allies",
        note: "The British Empire's successful drive to push the Ottoman Empire out of the Levant.",
        facts: [
            "Began with an Ottoman repulse at the Suez Canal, threatening the lifeline of the British Empire.",
            "British forces, heavily reliant on Australian and New Zealand Light Horse, fought across the Sinai Desert.",
            "General Edmund Allenby captured Jerusalem in December 1917, fighting dismounted.",
            "Culminated in the decisive Battle of Megiddo in 1918."
        ],
        result: [
            "The Ottoman Empire lost control of the Levant (modern Israel, Palestine, Jordan, Lebanon, Syria).",
            "Resulted in the Armistice of Mudros, forcing the Ottomans out of the war.",
            "Led to the British Mandate for Palestine."
        ],
        img: "/Palestine.png",
        front: "middle-east"
    }
];

async function insertNewBattles() {
    console.log('Inserting new battles into Supabase...');

    const { data, error } = await supabase
        .from('battles')
        .insert(newBattles);

    if (error) {
        console.error('❌ Failed to insert battles:', error);
    } else {
        console.log(`✅ Successfully added ${newBattles.length} new historical events to the database!`);
    }
}

insertNewBattles();
