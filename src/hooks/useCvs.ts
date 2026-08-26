import { useState, useEffect, useCallback } from 'react';
import { cvService } from '../services/supabase/cv.service';
import { useAuth } from './useAuth';
import { CVData, CVStatus } from '../types/index';

const MAX_SIZE = 5 * 1024 * 1024; // 5MB en bytes

const ALLOWED_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

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
        setCvs(prev => [newCV, ...prev]);
        return newCV;
    }, [user?.id]);

    const deleteCV = useCallback(async (cvId: string, filePath: string) => {
        await cvService.deleteCv(cvId, filePath);
        setCvs(prev => prev.filter(cv => cv.id !== cvId));
    }, []);

    return {
        MAX_SIZE,
        ALLOWED_TYPES,
        cvs,
        loading,
        error,
        uploadCV,
        deleteCV,
        refresh: loadCvs
    };
}