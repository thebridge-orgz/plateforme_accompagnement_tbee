import { useState, useEffect, useCallback } from 'react';
import { cvService } from '../services/supabase/cv.service';
import { useAuth } from './useAuth';
import { CVData, CVStatus } from '../types/index';

export function useCvs() {
    const { user } = useAuth();
    const [cvs, setCvs] = useState<CVData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    
    const loadCvs = useCallback(async () => {
        if (!user?.id) return;

        setLoading(true);
        try {
            const data = await cvService.getCVData(user.id);
            // Transformer le résultat en tableau
            setCvs(data ? [data] : []);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [user?.id]);

    useEffect(() => {
        loadCvs();
    }, [loadCvs]);

    const uploadCV = useCallback(async (file: File) => {
        if (!user?.id) throw new Error('Not authenticated');
        const newCV = await cvService.uploadCV(user.id, file);
        
        // Mettre à jour l'état local
        setCvs(prev => [{
            fileName: newCV.fileName,
            fileUrl: newCV.fileUrl,
            status: 'uploaded' as CVStatus,
            adminFeedback: null,
            uploadedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }, ...prev]);
        
        return newCV;
    }, [user?.id]);

    return {
        cvs,
        loading,
        error,
        uploadCV,
        refresh: loadCvs
    };
}