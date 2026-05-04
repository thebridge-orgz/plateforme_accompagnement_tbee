import { useState, useEffect, useCallback } from 'react';
import { statisticsService } from '../services/supabase/statistics.service';
import { UserStatistics } from '../types/index';
import { useAuth } from './useAuth';

export function useStatistics() {
    const { user } = useAuth();
    const [statistics, setStatistics] = useState<UserStatistics[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const loadStatistics = useCallback(async () => {
        if (!user?.id) return;

        setLoading(true);
        try {
            const data = await statisticsService.getStatistics(user.id);
            setStatistics(data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [user?.id]);

    useEffect(() => {
        loadStatistics();
    }, [loadStatistics]);

    const updateStatistics = useCallback(async (userId: string, updates: Partial<UserStatistics>) => {
        await statisticsService.updateStatistics(userId, updates);
        setStatistics(prev => prev.map(statistic =>
            statistic.userId === userId ? { ...statistic, ...updates, updatedAt: new Date().toISOString() } : statistic
        ));
    }, []);

    return {
        statistics,
        loading,
        error,
        updateStatistics,
        refresh: loadStatistics,
    };
}