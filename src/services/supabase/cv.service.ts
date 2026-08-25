import { supabase } from '../../config/supabaseClient';
import { CVData, CVStatus } from '../../types/index';

class CVService {
    async getCVData(userId: string) {
        const { data, error } = await supabase
            .from('cv_data')
            .select('*')
            .eq('user_id', userId)
            .maybeSingle();

        if (error) throw error;
        return data ? this.mapFromDB(data) : null;
    }

    async uploadCV(userId: string, file: File): Promise<CVData> {
        const safeName = file.name
            .normalize('NFD').replace(/[̀-ͯ]/g, '')  // supprime les accents
            .replace(/[^a-zA-Z0-9._-]/g, '_');                  // remplace tout caractère non-safe
        const filePath = `${userId}/${Date.now()}_${safeName}`;
        const { error: uploadError } = await supabase.storage
            .from('cv-uploads')
            .upload(filePath, file, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
            .from('cv-uploads')
            .getPublicUrl(filePath);

        // Sauvegarder les infos dans la base de données
        const savedCV = await this.saveCVData(userId, {
            fileName: file.name,
            fileUrl: urlData.publicUrl,
            filePath: filePath,
            status: 'uploaded',
            uploadedAt: new Date().toISOString(),
        });

        return savedCV;
    }

    async saveCVData(userId: string, cvData: Partial<CVData>): Promise<CVData> {
        const dbUpdates: Record<string, any> = {
            updated_at: new Date().toISOString(),
        };

        if (cvData.fileName !== undefined) dbUpdates.file_name = cvData.fileName;
        if (cvData.fileUrl !== undefined) dbUpdates.file_url = cvData.fileUrl;
        if (cvData.status !== undefined) dbUpdates.status = cvData.status;
        if (cvData.adminFeedback !== undefined) dbUpdates.admin_feedback = cvData.adminFeedback;
        if (cvData.uploadedAt !== undefined) dbUpdates.uploaded_at = cvData.uploadedAt;
        if (cvData.filePath !== undefined) dbUpdates.file_path = cvData.filePath;

        // Utiliser upsert avec retour
        const { data, error } = await supabase
            .from('cv_data')
            .upsert({
                user_id: userId,
                ...dbUpdates,
                uploaded_at: cvData.uploadedAt || (cvData.status === 'uploaded' ? new Date().toISOString() : undefined)
            }, { onConflict: 'user_id' })
            .select()
            .single();

        if (error) throw error;

        return this.mapFromDB(data);
    }

    async getAllCVSubmissions() {
        const { data, error } = await supabase
            .from('cv_data')
            .select('*, profiles(first_name, last_name, email)')
            .neq('status', 'not_uploaded')
            .order('uploaded_at', { ascending: false });

        if (error) throw error;
        return data || [];
    }

    async reviewCV(cvId: string, status: CVStatus, feedback: string, score?: number) {
        const { error } = await supabase
            .from('cv_data')
            .update({
                status,
                admin_feedback: feedback,
                score,
                reviewed_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            })
            .eq('id', cvId);

        if (error) throw error;
    }

    async deleteCv(cvId: string, filePath: string) {
        const { error: dbError } = await supabase
            .from('cv_data')
            .delete()
            .eq('id', cvId);

        if (dbError) throw dbError;

        const { error: deleteError } = await supabase.storage
            .from('cv-uploads')
            .remove([filePath]);

        if (deleteError) throw dbError;
    }

    private mapFromDB(raw: any): CVData {
        return {
            id: raw.id,
            userId: raw.user_id,
            cvContent: raw.cv_content,
            filePath: raw.file_path,
            isValidated: raw.is_validated,
            createdAt: raw.created_at,
            updatedAt: raw.updated_at,
            fileName: raw.file_name,
            fileUrl: raw.file_url,
            adminFeedback: raw.admin_feedback,
            uploadedAt: raw.uploaded_at,
            status: raw.status
        };
    }
}

export const cvService = new CVService();