import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function usePortfolioData(tableName: string) {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        let query = supabase.from(tableName).select('*');
        
        // Add ordering based on table
        if (tableName !== 'hero_content' && tableName !== 'about_content') {
          query = query.order('order_index', { ascending: true });
        }

        const { data: result, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        setData(result);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [tableName]);

  return { data, loading, error };
}
