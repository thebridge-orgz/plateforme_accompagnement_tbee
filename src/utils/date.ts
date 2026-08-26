export const formatDateTime = (date: Date | string | number | null | undefined): string => {
    if (!date) return 'Non défini';

    try {
        const dateObj = typeof date === 'string' || typeof date === 'number'
            ? new Date(date)
            : date;

        if (isNaN(dateObj.getTime())) return 'Date invalide';

        return new Intl.DateTimeFormat('fr-FR', {
            timeZone: 'Europe/Paris',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).format(dateObj);
    } catch (error) {
        console.error('Erreur de formatage de date:', error);
        return 'Erreur format';
    }
};