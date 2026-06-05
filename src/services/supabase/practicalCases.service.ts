import { supabase } from '../../config/supabaseClient';

class PracticalCasesService {
  async markAsViewed(userId: string, caseId: string): Promise<void> {
    const { error } = await supabase
      .from('user_practical_cases')
      .upsert(
        {
          user_id: userId,
          case_id: caseId,
          viewed_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,case_id', ignoreDuplicates: true }
      );

    if (error) throw error;
  }

  async getViewedCaseIds(userId: string): Promise<string[]> {
    const { data, error } = await supabase
      .from('user_practical_cases')
      .select('case_id')
      .eq('user_id', userId);

    if (error) throw error;
    return (data || []).map((row: any) => row.case_id);
  }

  async getViewedCount(userId: string): Promise<number> {
    const { count, error } = await supabase
      .from('user_practical_cases')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    if (error) throw error;
    return count ?? 0;
  }
}

export const practicalCasesService = new PracticalCasesService();
