import type { Offre } from '../types/offres';
import { ONE_WEEK_IN_MS } from '../constants';
 
export function isRecentOffre(offre: Offre): boolean {
    let result = false;
    if (offre && offre.createdAt) {
        const createdAtDate = new Date(offre.createdAt);
        result = !isNaN(createdAtDate.getTime()) && createdAtDate > new Date(Date.now() - ONE_WEEK_IN_MS);
    }
    return result;
} 