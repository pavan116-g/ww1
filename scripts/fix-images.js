import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const imageCorrections = {
    // Western Front
    "Battle of the Frontiers": "/Battle of Frontiers.png",
    "First Battle of the Marne": "/Marne 1.png",
    "Battle of the Marne": "/Marne 1.png", // Just in case
    "Race to the Sea": "/Race to the Sea 1.png",
    "First Battle of Ypres": "/Ypres.jpg",
    "Second Battle of Ypres": "/Chlorine Gas.png",
    "Battle of Verdun": "/Battle of Verdun 1.png",
    "Battle of the Somme": "/Somme.png",
    "Battle of Arras": "/Ypres 2.png",
    "Battle of Vimy Ridge": "/Ypres 2.png", // Doesn't have one in original, but using Ypres 2 as fallback similar to Arras
    "Passchendaele (Third Ypres)": "/Ypres 2.png",
    "Third Battle of Ypres (Passchendaele)": "/Ypres 2.png",
    "Battle of Cambrai": "/Tanker.png",
    "Spring Offensive": "/Spring offensive.png",
    "Spring Offensive (Kaiserschlacht)": "/Spring offensive.png",
    "Hundred Days Offensive": "/Spring offensive 1.png",

    // Eastern Front
    "Battle of Tannenberg": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Bundesarchiv_Bild_183-R04034%2C_Tannenberg%2C_russische_Gefangene.jpg/640px-Bundesarchiv_Bild_183-R04034%2C_Tannenberg%2C_russische_Gefangene.jpg",
    "Brusilov Offensive": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Brusilov-Alexei.jpg/480px-Brusilov-Alexei.jpg",

    // Note: Most Eastern Front battles actually had "img: null" in the original battleData.js, 
    // so if they don't have images now, that's actually faithful to the original data.
};

async function fixImages() {
    console.log('Fixing image paths for existing battles...');

    // 1. Fetch ALL records
    const { data: allBattles, error: fetchError } = await supabase.from('battles').select('id, name');

    if (fetchError) {
        console.error('Error fetching battles:', fetchError);
        return;
    }

    let updateCount = 0;

    // 2. Loop through and update if a correction exists
    for (const battle of allBattles) {
        if (imageCorrections[battle.name]) {
            const correctImage = imageCorrections[battle.name];

            const { error: updateError } = await supabase
                .from('battles')
                .update({ img: correctImage })
                .eq('id', battle.id);

            if (updateError) {
                console.error(`Error updating image for ${battle.name}:`, updateError);
            } else {
                console.log(`✅ Fixed image for ${battle.name}`);
                updateCount++;
            }
        }
    }

    console.log(`\n🎉 Finished! Fixed image paths for ${updateCount} battles.`);
}

fixImages();
