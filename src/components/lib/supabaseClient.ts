import { createClient } from '@supabase/supabase-js';
/* const dbURL = import.meta.env.SUPABASE_URL;
const dbKEY = import.meta.env.SUPABASE_KEY; */
export const supabase = createClient("https://tvsrgpgyhxqxyucfxstc.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2c3JncGd5aHhxeHl1Y2Z4c3RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2OTYwNTUsImV4cCI6MjA2NzI3MjA1NX0.jk8kGJWOOzzKazZhEqDnfqoF9nnBBKpckMuAEbABwBE");
