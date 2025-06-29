
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

type Cafe = Tables<'cafes'>;

export const useCafes = () => {
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCafes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cafes')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setCafes(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching cafes');
    } finally {
      setLoading(false);
    }
  };

  const createCafe = async (cafeData: Omit<Cafe, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('cafes')
        .insert(cafeData)
        .select()
        .single();

      if (error) throw error;
      setCafes(prev => [...prev, data]);
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Error creating cafe');
    }
  };

  const updateCafe = async (id: string, updates: Partial<Cafe>) => {
    try {
      const { data, error } = await supabase
        .from('cafes')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setCafes(prev => prev.map(cafe => cafe.id === id ? data : cafe));
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Error updating cafe');
    }
  };

  const deleteCafe = async (id: string) => {
    try {
      const { error } = await supabase
        .from('cafes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setCafes(prev => prev.filter(cafe => cafe.id !== id));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Error deleting cafe');
    }
  };

  useEffect(() => {
    fetchCafes();
  }, []);

  return {
    cafes,
    loading,
    error,
    createCafe,
    updateCafe,
    deleteCafe,
    refetch: fetchCafes
  };
};
