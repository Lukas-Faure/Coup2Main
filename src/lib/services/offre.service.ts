import { offresStore } from '$lib/stores/offres.store';
import type { Offre } from '$lib/types/offres';

export async function getOffreById(id: string): Promise<Offre> {
	const response = await fetch(`/api/offres/${id}`);
	if (!response.ok) {
		throw new Error('Offre introuvable');
	}
	return await response.json();
}

export class OffreServiceClient {
	static async loadInitialOffres() {
		offresStore.setLoading(true);
		try {
			const response = await fetch('/api/offres?limit=1000');
			if (response.ok) {
				const data = await response.json();
				if (data.offres) {
					offresStore.setOffres(data);
				} else {
					offresStore.setOffresArray(data);
				}
			} else {
				offresStore.setError('Erreur lors du chargement des offres');
			}
		} catch {
			offresStore.setError('Erreur de connexion');
		}
	}

	static applyFilters(filters: { type?: string; search?: string; location?: string; category?: string }) {
		offresStore.setFilter('type', filters.type || 'all');
		offresStore.setFilter('search', filters.search || '');
		offresStore.setFilter('location', filters.location || '');
		offresStore.setFilter('category', filters.category || '');
	}

	static checkCreationSuccess(): boolean {
		if (typeof window !== 'undefined') {
			const urlParams = new URLSearchParams(window.location.search);
			return urlParams.get('success') === 'offre-creee';
		}
		return false;
	}

	static checkUpdateSuccess(): boolean {
		if (typeof window !== 'undefined') {
			const urlParams = new URLSearchParams(window.location.search);
			return urlParams.get('success') === 'offre-modifiee';
		}
		return false;
	}

	static async deleteOffre(offreId: string): Promise<Response> {
		return await fetch(`/api/offres/${offreId}`, {
			method: 'DELETE'
		});
	}
} 