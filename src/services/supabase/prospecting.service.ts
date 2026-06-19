import { supabase } from '../../config/supabaseClient';

export type ProspectingStatus = 'to_apply' | 'applied' | 'interview' | 'offer' | 'rejected' | 'accepted';

export interface ProspectingEntry {
  id: string;
  userId: string;
  companyName: string;
  positionTitle: string;
  offerUrl: string | null;
  status: ProspectingStatus;
  appliedAt: string | null;
  notes: string | null;
  needsHelp: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProspectingEntryWithStudent extends ProspectingEntry {
  studentName: string;
  studentEmail: string;
}

export interface CreateProspectingEntry {
  companyName: string;
  positionTitle: string;
  offerUrl?: string;
  status: ProspectingStatus;
  appliedAt?: string;
  notes?: string;
}

class ProspectingService {
  private mapFromDB(raw: any): ProspectingEntry {
    return {
      id: raw.id,
      userId: raw.user_id,
      companyName: raw.company_name,
      positionTitle: raw.position_title,
      offerUrl: raw.offer_url,
      status: raw.status,
      appliedAt: raw.applied_at,
      notes: raw.notes,
      needsHelp: raw.needs_help ?? false,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
    };
  }

  async getEntries(userId: string): Promise<ProspectingEntry[]> {
    const { data, error } = await supabase
      .from('prospecting_entries')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(this.mapFromDB.bind(this));
  }

  async createEntry(userId: string, input: CreateProspectingEntry): Promise<ProspectingEntry> {
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from('prospecting_entries')
      .insert({
        user_id: userId,
        company_name: input.companyName,
        position_title: input.positionTitle,
        offer_url: input.offerUrl ?? null,
        status: input.status,
        applied_at: input.appliedAt ?? null,
        notes: input.notes ?? null,
        needs_help: false,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();

    if (error) throw error;
    return this.mapFromDB(data);
  }

  async updateEntry(entryId: string, input: Partial<CreateProspectingEntry>): Promise<ProspectingEntry> {
    const updates: Record<string, any> = { updated_at: new Date().toISOString() };
    if (input.companyName !== undefined) updates.company_name = input.companyName;
    if (input.positionTitle !== undefined) updates.position_title = input.positionTitle;
    if (input.offerUrl !== undefined) updates.offer_url = input.offerUrl;
    if (input.status !== undefined) updates.status = input.status;
    if (input.appliedAt !== undefined) updates.applied_at = input.appliedAt;
    if (input.notes !== undefined) updates.notes = input.notes;

    const { data, error } = await supabase
      .from('prospecting_entries')
      .update(updates)
      .eq('id', entryId)
      .select()
      .single();

    if (error) throw error;
    return this.mapFromDB(data);
  }

  async toggleNeedsHelp(entryId: string, needsHelp: boolean): Promise<ProspectingEntry> {
    const { data, error } = await supabase
      .from('prospecting_entries')
      .update({ needs_help: needsHelp, updated_at: new Date().toISOString() })
      .eq('id', entryId)
      .select()
      .single();

    if (error) throw error;
    return this.mapFromDB(data);
  }

  async deleteEntry(entryId: string): Promise<void> {
    const { error } = await supabase
      .from('prospecting_entries')
      .delete()
      .eq('id', entryId);

    if (error) throw error;
  }

  async getNeedingHelp(): Promise<ProspectingEntryWithStudent[]> {
    const { data, error } = await supabase
      .from('prospecting_entries')
      .select('*')
      .eq('needs_help', true)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    if (!data || data.length === 0) return [];

    const userIds = [...new Set(data.map((e: any) => e.user_id))];
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, first_name, last_name, email')
      .in('id', userIds);

    const profileMap = new Map((profiles || []).map((p: any) => [p.id, p]));

    return data.map((raw: any) => {
      const profile = profileMap.get(raw.user_id);
      return {
        ...this.mapFromDB(raw),
        studentName: profile ? [profile.first_name, profile.last_name].filter(Boolean).join(' ') : '—',
        studentEmail: profile?.email || '—',
      };
    });
  }
}

export const prospectingService = new ProspectingService();
