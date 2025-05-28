// src/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pdtxoiydtklgtkzmlqoo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkdHhvaXlkdGtsZ3Rrem1scW9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzOTIzNDYsImV4cCI6MjA2Mzk2ODM0Nn0.GCq16-gKGjiOR0KCSo_aY-nD_vMm2TKHYPnNh8OMh18';
export const supabase = createClient(supabaseUrl, supabaseKey);