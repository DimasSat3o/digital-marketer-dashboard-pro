
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

type ContentReport = Tables<'content_reports'>;

export const useContentReports = (cafeId?: string, month?: number, year?: number) => {
  const [reports, setReports] = useState<ContentReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = async () => {
    try {
      setLoading(true);
      let query = supabase.from('content_reports').select('*');
      
      if (cafeId) query = query.eq('cafe_id', cafeId);
      if (month) query = query.eq('month', month);
      if (year) query = query.eq('year', year);
      
      const { data, error } = await query.order('post_date', { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching content reports');
    } finally {
      setLoading(false);
    }
  };

  const createReport = async (reportData: Omit<ContentReport, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('content_reports')
        .insert(reportData)
        .select()
        .single();

      if (error) throw error;
      setReports(prev => [data, ...prev]);
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Error creating content report');
    }
  };

  const updateReport = async (id: string, updates: Partial<ContentReport>) => {
    try {
      const { data, error } = await supabase
        .from('content_reports')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setReports(prev => prev.map(report => report.id === id ? data : report));
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Error updating content report');
    }
  };

  const deleteReport = async (id: string) => {
    try {
      const { error } = await supabase
        .from('content_reports')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setReports(prev => prev.filter(report => report.id !== id));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Error deleting content report');
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
