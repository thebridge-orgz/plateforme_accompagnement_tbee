import { supabase } from '../../config/supabaseClient';
import { TrackedOffer, ApplicationStatus } from '../../types/index';

class OfferService {
    async getUserTrackedOffers(userId: string): Promise<TrackedOffer[]> {
        const { data, error } = await supabase
            .from('user_tracked_offers')
            .select('*')
            .eq('user_id', userId)
            .order('updated_at', { ascending: false });

        if (error) throw error;
        return (data || []).map(this.mapFromDB);
    }

    async addTrackedOffer(userId: string, offer: TrackedOffer) {
        const now = new Date().toISOString();
        const { data, error } = await supabase
            .from('user_tracked_offers')
            .insert({
                user_id: userId,
                offer_id: offer.offerId,
                company_name: offer.companyName,
                position_title: offer.positionTitle,
                offer_url: offer.offerUrl,
                application_status: offer.applicationStatus,
                user_notes: offer.userNotes,
                application_date: offer.applicationDate,
                interview_date: offer.interviewDate,
                reminder_date: offer.reminderDate,
                tracked_at: now,
                updated_at: now,
            })
            .select()
            .single();

        if (error) throw error;
        return this.mapFromDB(data);
    }

    async updateTrackedOffer(offerId: string, updates: Partial<TrackedOffer>) {
        const dbUpdates: Record<string, any> = { updated_at: new Date().toISOString() };
        if (updates.applicationStatus !== undefined) dbUpdates.application_status = updates.applicationStatus;
        if (updates.userNotes !== undefined) dbUpdates.user_notes = updates.userNotes;
        if (updates.applicationDate !== undefined) dbUpdates.application_date = updates.applicationDate;
        if (updates.interviewDate !== undefined) dbUpdates.interview_date = updates.interviewDate;
        if (updates.reminderDate !== undefined) dbUpdates.reminder_date = updates.reminderDate;
        if (updates.companyName !== undefined) dbUpdates.company_name = updates.companyName;
        if (updates.positionTitle !== undefined) dbUpdates.position_title = updates.positionTitle;
        if (updates.offerUrl !== undefined) dbUpdates.offer_url = updates.offerUrl;

        const { error } = await supabase
            .from('user_tracked_offers')
            .update(dbUpdates)
            .eq('id', offerId);

        if (error) throw error;
    }

    async removeTrackedOffer(offerId: string) {
        const { error } = await supabase
            .from('user_tracked_offers')
            .delete()
            .eq('id', offerId);

        if (error) throw error;
    }

    async getAllTrackedOffers() {
        const { data, error } = await supabase
            .from('user_tracked_offers')
            .select('*, profiles(first_name, last_name, email)')
            .order('updated_at', { ascending: false });

        if (error) throw error;
        return data || [];
    }

    private mapFromDB(raw: any): TrackedOffer {
        return {
            id: raw.id,
            userId: raw.user_id,
            offerId: raw.offer_id,
            companyName: raw.company_name,
            positionTitle: raw.position_title,
            offerUrl: raw.offer_url,
            applicationStatus: raw.application_status,
            userNotes: raw.user_notes,
            applicationDate: raw.application_date,
            interviewDate: raw.interview_date,
            reminderDate: raw.reminder_date,
            trackedAt: raw.tracked_at,
            updatedAt: raw.updated_at,
        };
    }
}

export const offerService = new OfferService();