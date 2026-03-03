import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('YOUR_SUPABASE')) {
    console.error("❌ ERROR: Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env.local file first!");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

import { WESTERN_BATTLES, EASTERN_BATTLES } from '../src/data/battleData.js';

async function migrate() {
    console.log('Starting migration...');

    const battlesToInsert = [];

    WESTERN_BATTLES.forEach(battle => {
        battlesToInsert.push({
            name: battle.name,
            date: battle.date,
            dateRange: battle.dateRange, // Supabase column matches json key if casing aligns or we map
            victor: battle.victor,
            note: battle.note,
            facts: battle.facts,
            result: battle.result,
            img: battle.img,
            front: 'western'
        });
    });

    EASTERN_BATTLES.forEach(battle => {
        battlesToInsert.push({
            name: battle.name,
            date: battle.date,
            dateRange: battle.dateRange,
            victor: battle.victor,
            note: battle.note,
            facts: battle.facts,
            result: battle.result,
            img: battle.img,
            front: 'eastern'
        });
    });

    const { data, error } = await supabase
        .from('battles')
        .insert(battlesToInsert);

    if (error) {
        console.error('Migration failed:', error);
    } else {
        console.log(`✅ Successfully migrated ${battlesToInsert.length} battles to Supabase!`);
    }
}

migrate();
