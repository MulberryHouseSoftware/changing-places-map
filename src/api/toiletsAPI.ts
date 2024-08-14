import { createClient } from "@supabase/supabase-js"

import { Database } from '../database.types'

// Create a single supabase client for interacting with your database
const supabase = createClient<Database>(
  "https://acgqinkinrullsbkcihi.supabase.co",
  process.env.REACT_APP_SUPABASE_ANON_KEY!
);


export const readAll = async () => {
  const { data, error } = await supabase.from("toilets").select();

  if (error) {
    throw error;
  }

  return data
};
