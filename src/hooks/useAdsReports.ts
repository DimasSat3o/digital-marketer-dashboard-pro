
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

type AdsReport = Tables<'ads_reports'>;

export const useAdsReports = (cafeId?: string, month?: number, year?: number) => {
  const [reports, setReports] = useState<AdsReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = async () => {
    try {
      setLoading(true);
      let query = supabase.from('ads_reports').select('*');
      
      if (cafeId) query = query.eq('cafe_id', cafeId);
      if (month) query = query.eq('month', month);
      if (year) query = query.eq('year', year);
      
      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching ads reports');
    } finally {
      setLoading(false);
    }
  };

  const createReport = async (reportData: Omit<AdsReport, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('ads_reports')
        .insert(reportData)
        .select()
        .single();

      if (error) throw error;
      setReports(prev => [data, ...prev]);
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Error creating ads report');
    }
  };

  const updateReport = async (id: string, updates: Partial<AdsReport>) => {
    try {
      const { data, error } = await supabase
        .from('ads_reports')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setReports(prev => prev.map(report => report.id === id ? data : report));
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Error updating ads report');
    }
  };

  const deleteReport = async (id: string) => {
    try {
      const { error } = await supabase
        .from('ads_reports')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setReports(prev => prev.filter(report => report.id !== id));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Error deleting ads report');
    }
  };

  useEffect(() => {
    fetchReports();
  }, [cafeId, month, year]);

  return {
    reports,
    loading,
    error,
    createReport,
    updateReport,
    deleteReport,
    refetch: fetchReports
  };
};
