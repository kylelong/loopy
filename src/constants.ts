import {createClient} from "@supabase/supabase-js";

const SUPABASE_URL: string = process.env.REACT_APP_SUPABASE_URL || "";
const PUBLIC_KEY: string = process.env.REACT_APP_PUBLIC_ANON_KEY || "";

export const SUPABASE = createClient(SUPABASE_URL, PUBLIC_KEY);
