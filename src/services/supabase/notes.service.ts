import { supabase } from '../../config/supabaseClient';

export interface AdminNote {
  id: string;
  studentId: string;
  adminId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

class NotesService {
  private mapFromDB(raw: any): AdminNote {
    return {
      id: raw.id,
      studentId: raw.student_id,
      adminId: raw.admin_id,
      content: raw.content,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
    };
  }

  async getStudentNotes(studentId: string): Promise<AdminNote[]> {
    const { data, error } = await supabase
      .from('admin_student_notes')
      .select('*')
      .eq('student_id', studentId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(this.mapFromDB.bind(this));
  }

  async addNote(studentId: string, adminId: string, content: string): Promise<AdminNote> {
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from('admin_student_notes')
      .insert({
        student_id: studentId,
        admin_id: adminId,
        content,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();

    if (error) throw error;
    return this.mapFromDB(data);
  }

  async deleteNote(noteId: string): Promise<void> {
    const { error } = await supabase
      .from('admin_student_notes')
      .delete()
      .eq('id', noteId);

    if (error) throw error;
  }
}

export const notesService = new NotesService();
