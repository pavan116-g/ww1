// Script to print all battle names from Supabase to check against battleMapData keys
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// Read from env or hardcode the project URL/key if you know them
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    // Try to read from the src/supabaseClient.js if env not set
    console.error("Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY env vars, or paste them directly in this script.");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const { data, error } = await supabase.from('battles').select('name, front').order('front');
if (error) {
    console.error(error);
} else {
    console.log("All battle names in Supabase DB:\n");
    data.forEach(b => console.log(`[${b.front}] "${b.name}"`));
}
