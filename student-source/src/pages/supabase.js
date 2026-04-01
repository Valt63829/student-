import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cqsihaaisgvbbebchzog.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxc2loYWFpc2d2YmJlYmNoem9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5MzcyMjYsImV4cCI6MjA5MDUxMzIyNn0.5dNSlCFT0H-Dcy_puBDF6LJxew-_2ZdwxcF9SSY-Jfg";

export const supabase = createClient(supabaseUrl, supabaseKey);