/**
 * API Configuration utility to detect if AI API is properly configured
 */

export interface ApiConfig {
  isConfigured: boolean;
  supabaseUrl: string | null;
  supabaseKey: string | null;
}

export const getApiConfig = (): ApiConfig => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  return {
    isConfigured: Boolean(supabaseUrl && supabaseKey),
    supabaseUrl: supabaseUrl || null,
    supabaseKey: supabaseKey || null,
  };
};

export const isApiConfigured = (): boolean => {
  const config = getApiConfig();
  return config.isConfigured;
};
