import { useState, useEffect, useCallback } from 'react';
import { offerService } from '../services/supabase/offer.service';
import { TrackedOffer, ApplicationStatus } from '../types/index';
import { useAuth } from './useAuth';

const MAX_TRACKED_OFFERS = 15;

export function useOffers() {
    const { user } = useAuth();
    const [offers, setOffers] = useState<TrackedOffer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const loadOffers = useCallback(async () => {
        if (!user?.id) return;
        
        setLoading(true);
        try {
            const data = await offerService.getUserTrackedOffers(user.id);
            setOffers(data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [user?.id]);

    useEffect(() => {
        loadOffers();
    }, [loadOffers]);

    const addOffer = useCallback(async (offer: Omit<TrackedOffer, 'id' | 'userId' | 'trackedAt' | 'updatedAt'>) => {
        if (!user?.id) throw new Error('Not authenticated');
        if (offers.length >= MAX_TRACKED_OFFERS) {
            throw new Error(`Maximum de ${MAX_TRACKED_OFFERS} offres atteint`);
        }
        const newOffer = await offerService.addTrackedOffer(user.id, offer);
        setOffers(prev => [newOffer, ...prev]);
        return newOffer;
    }, [user?.id, offers.length]);

    const updateOffer = useCallback(async (offerId: string, updates: Partial<TrackedOffer>) => {
        await offerService.updateTrackedOffer(offerId, updates);
        setOffers(prev => prev.map(offer =>
            offer.id === offerId ? { ...offer, ...updates, updatedAt: new Date().toISOString() } : offer
        ));
    }, []);

    const removeOffer = useCallback(async (offerId: string) => {
        await offerService.removeTrackedOffer(offerId);
        setOffers(prev => prev.filter(offer => offer.id !== offerId));
    }, []);

    return {
        offers,
        loading,
        error,
        addOffer,
        updateOffer,
        removeOffer,
        refresh: loadOffers,
        canAddMore: offers.length < MAX_TRACKED_OFFERS,
    };
}