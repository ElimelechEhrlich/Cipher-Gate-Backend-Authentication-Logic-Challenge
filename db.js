import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
config()

const supabase = createClient(process.env.SUPABASE_DB_URL, process.env.SUPABASE_DB_PUBLIC_SECRET)

export default supabase;