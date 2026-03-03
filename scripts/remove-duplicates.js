import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function removeDuplicates() {
    console.log('Fetching all battles to identify duplicates...');

    // 1. Fetch ALL records
    const { data: allBattles, error: fetchError } = await supabase.from('battles').select('id, name');

    if (fetchError) {
        console.error('Error fetching battles:', fetchError);
        return;
    }

    // 2. Identify duplicates by name
    const seenNames = new Set();
    const idsToDelete = [];

    for (const battle of allBattles) {
        if (seenNames.has(battle.name)) {
            // This is a duplicate, mark its ID for deletion
            idsToDelete.push(battle.id);
        } else {
            // This is the first time we've seen this name, keep it
            seenNames.add(battle.name);
        }
    }

    console.log(`Found ${idsToDelete.length} duplicate entries to delete.`);

    // 3. Delete the duplicates by ID
    if (idsToDelete.length > 0) {
        console.log('Deleting duplicates...');
        const { error: deleteError } = await supabase
            .from('battles')
            .delete()
            .in('id', idsToDelete);

        if (deleteError) {
            console.error('Error deleting duplicates:', deleteError);
        } else {
            console.log('✅ Successfully removed all duplicate battles from the database!');
        }
    } else {
        console.log('✅ No duplicates found.');
    }
}

removeDuplicates();
