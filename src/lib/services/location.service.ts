import type { LocationSuggestion } from '$lib/types/offres';

type ApiType = 'adresse' | 'geo';
export class LocationService {
	static async getSuggestions(query: string): Promise<LocationSuggestion[]> {
		if (query.length < 2) return [];

		let apiUrl: string;
		let apiType: ApiType = 'adresse';

		const isDeptCodeOnly = /^\d{2}$/.test(query);
		const isPostalCodeOnly = /^\d{5}$/.test(query);

		if (isDeptCodeOnly) {
			apiType = 'geo';
			apiUrl = `https://geo.api.gouv.fr/departements/${query}/communes?fields=nom,codesPostaux,codeDepartement,population,centre`;
		} else if (isPostalCodeOnly) {
			apiType = 'geo';
			apiUrl = `https://geo.api.gouv.fr/communes?codePostal=${query}&fields=nom,codesPostaux,codeDepartement,population,centre&limit=10`;
		} else {
			apiType = 'adresse';
			apiUrl = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(
				query
			)}&limit=7`;
		}

		try {
			const response = await fetch(apiUrl);
			if (!response.ok) throw new Error('API Géo indisponible');
			const data = await response.json();

			if (apiType === 'geo' && Array.isArray(data)) {
				let communes = data;
				if (isDeptCodeOnly) {
					communes.sort((a, b) => (b.population || 0) - (a.population || 0));
					communes = communes.slice(0, 20);
				}
				return communes.map(
					(commune: any): LocationSuggestion => ({
						label: `${commune.nom} (${(commune.codesPostaux || [])[0] || ''})`,
						latitude: commune.centre.coordinates[1],
						longitude: commune.centre.coordinates[0]
					})
				);
			} else if (apiType === 'adresse' && data.features) {
				return data.features.map(
					(feat: any): LocationSuggestion => ({
						label: feat.properties.label,
						latitude: feat.geometry.coordinates[1],
						longitude: feat.geometry.coordinates[0]
					})
				);
			}
			return [];
		} catch (err) {
			console.error(err);
			return [];
		}
	}
} 