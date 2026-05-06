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

    async uploadCV(userId: string, file: File): Promise<{ fileUrl: string; fileName: string }> {
        const filePath = `${userId}/${Date.now()}_${file.name}`;
        const { error: uploadError } = await supabase.storage
            .from('cv-uploads')
            .upload(filePath, file, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
            .from('cv-uploads')
            .getPublicUrl(filePath);

        // Sauvegarder les infos dans la base de données
        await this.saveCVData(userId, {
            fileName: file.name,
            fileUrl: urlData.publicUrl,
            status: 'uploaded',
            uploadedAt: new Date().toISOString(),
        });

        return {
            fileUrl: urlData.publicUrl,
            fileName: file.name,
        };
    }

    async saveCVData(userId: string, cvData: Partial<CVData>): Promise<void> {
        const dbUpdates: Record<string, any> = {
            updated_at: new Date().toISOString(),
        };
        
        if (cvData.fileName !== undefined) dbUpdates.file_name = cvData.fileName;
        if (cvData.fileUrl !== undefined) dbUpdates.file_url = cvData.fileUrl;
        if (cvData.status !== undefined) dbUpdates.status = cvData.status;
        if (cvData.adminFeedback !== undefined) dbUpdates.admin_feedback = cvData.adminFeedback;
        if (cvData.uploadedAt !== undefined) dbUpdates.uploaded_at = cvData.uploadedAt;

        const { error } = await supabase
            .from('cv_data')
            .upsert({ 
                user_id: userId, 
                ...dbUpdates,
                // S'assurer que uploaded_at est défini si c'est un nouvel upload
                uploaded_at: cvData.uploadedAt || (cvData.status === 'uploaded' ? new Date().toISOString() : undefined)
            });

        if (error) throw error;
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

    private mapFromDB(raw: any): CVData {
        return {
            fileName: raw.file_name,
            fileUrl: raw.file_url,
            status: raw.status,
            adminFeedback: raw.admin_feedback,
            score: raw.score,
            uploadedAt: raw.uploaded_at,
            reviewedAt: raw.reviewed_at,
            reviewedBy: raw.reviewed_by,
            updatedAt: raw.updated_at,
        };
    }
}

export const cvService = new CVService();