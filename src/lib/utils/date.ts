import { formatTimeOfDay } from "./time";

export function formatDate(dateInput: string | Date, options?: Intl.DateTimeFormatOptions): string {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    const defaultOptions: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    };
    const result = new Intl.DateTimeFormat('fr-FR', options || defaultOptions).format(date);
    return result;
}


export function getRelativeDayString(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffMs = dateObj.getTime() - now.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    let result: string;
    if (diffDays === 0) {
        result = 'Aujourd\'hui';
    } else if (diffDays === 1) {
        result = 'Demain';
    } else if (diffDays === -1) {
        result = 'Hier';
    } else if (diffDays > 0) {
        result = `Dans ${diffDays} jours`;
    } else {
        result = `Il y a ${Math.abs(diffDays)} jours`;
    }
    return result;
}

export function formatConversationDate(date: string | Date): string {
    const d = new Date(date);
    const days = Math.floor((new Date().getTime() - d.getTime()) / (1000 * 60 * 60 * 24));

    let result: string;
    if (days === 0) {
        result = formatTimeOfDay(d);
    } else if (days === 1) {
        result = 'Hier';
    } else if (days < 7) {
        result = new Intl.DateTimeFormat('fr-FR', { weekday: 'long' }).format(d);
    } else {
        result = formatDate(d, { day: 'numeric', month: 'short' });
    }
    return result;
}

export function parseDateToSafeDate(dateInput: string | Date): Date | null {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    const result = isNaN(date.getTime()) ? null : date;
    return result;
}

export function getTimeAgo(date: string | Date): string {
    const d = new Date(date);
    const diffInMinutes = Math.floor((new Date().getTime() - d.getTime()) / (1000 * 60));

    let result: string;
    if (diffInMinutes < 1) {
        result = "À l'instant";
    } else if (diffInMinutes < 60) {
        result = `${diffInMinutes}min`;
    } else if (diffInMinutes < 1440) {
        result = `${Math.floor(diffInMinutes / 60)}h`;
    } else {
        result = formatConversationDate(date);
    }
    return result;
}

export { formatTimeOfDay }; 