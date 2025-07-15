import { favoris } from '$lib/stores/favoris.store';
import type { Offre } from '$lib/types/offres';

export async function loadFavorisOffres(): Promise<Offre[]> {
	const response = await fetch('/api/favoris');
	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.error || 'Erreur lors du chargement des favoris');
	}
	const favorisData = await response.json();
	const offres = favorisData.map((fav: any) => fav.offre).filter(Boolean);
	const offreIds = offres.map((o: Offre) => o.id);
	favoris.set(offreIds);
	return offres;
} 