import config from '@/lib/config'
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = config.env.supabase.urlEndpoint
const supabaseKey = config.env.supabase.privateKey

const supabaseClient = createClient(
	'https://qgesgofxdyogpmcgiaiq.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnZXNnb2Z4ZHlvZ3BtY2dpYWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3OTYyODksImV4cCI6MjA3MDM3MjI4OX0.pyebT_X1Ld_R_SPAcbcE3C5vDWoizlH4P7CrIpEsIvM'
)

export default supabaseClient
