import config from '@/lib/config';
import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = config.env.supabase.urlEndpoint;
const supabaseKey = config.env.supabase.anonKey;

const supabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabaseClient;
