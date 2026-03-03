import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function revertToOriginal() {
    console.log('Clearing all battles from the database...');

    // A trick to delete all rows in Supabase without needing a specific ID match:
    // Using an inequality that matches everything
    const { error: delError } = await supabase.from('battles').delete().neq('name', 'impossible_string');

    if (delError) {
        console.error('Error clearing database:', delError);
        return;
    }

    console.log('✅ Database fully cleared. Now re-run `node scripts/migrate-data.js` to restore the original 21 Western/Eastern battles.');
}

revertToOriginal();
