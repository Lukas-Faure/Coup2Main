import { writable, derived } from 'svelte/store';
import type { Offre, OffresState } from '$lib/types/offres';

function createOffresStore() {
	const initialState: OffresState = {
		offres: [],
		allOffers: [],
		loading: false,
		error: null,
		filters: {
			type: 'all',
			search: '',
			location: '',
			category: ''
		},
		pagination: {
			total: 0,
			pages: 0,
			currentPage: 1
		}
	};

	const { subscribe, update, set } = writable<OffresState>(initialState);

	const filteredOffres = derived({ subscribe }, ($store) => {
		let filtered = $store.allOffers;
		if ($store.filters.type && $store.filters.type !== 'all') {
			filtered = filtered.filter((offre: Offre) => offre.type === $store.filters.type);
		}
		if ($store.filters.search) {
			const search = $store.filters.search.toLowerCase();
			filtered = filtered.filter((offre: Offre) => 
				offre.title.toLowerCase().includes(search) ||
				offre.description.toLowerCase().includes(search)
			);
		}
		if ($store.filters.location) {
			const searchLocation = $store.filters.location.toLowerCase().split('(')[0].trim();
			filtered = filtered.filter((offre: Offre) => 
				offre.location.toLowerCase().includes(searchLocation)
			);
		}
		if ($store.filters.category) {
			filtered = filtered.filter((offre: Offre) => offre.category === $store.filters.category);
		}
		return filtered;
	});

	return {
		subscribe,
		filtered: filteredOffres,

		setOffres: (apiResponse: { offres: Offre[], total: number, pages: number, currentPage: number }) => {
			update(state => ({
				...state,
				offres: apiResponse.offres,
				allOffers: apiResponse.offres,
				pagination: {
					total: apiResponse.total,
					pages: apiResponse.pages,
					currentPage: apiResponse.currentPage
				},
				loading: false,
				error: null
			}));
		},

		setOffresArray: (offres: Offre[]) => {
			update(state => ({
				...state,
				offres,
				allOffers: offres,
				loading: false,
				error: null
			}));
		},

		setLoading: (loading: boolean) => {
			update(state => ({ ...state, loading }));
		},

		setError: (error: string | null) => {
			update(state => ({ ...state, error, loading: false }));
		},

		addOffre: (offre: Offre) => {
			update(state => ({
				...state,
				offres: [offre, ...state.offres],
				allOffers: [offre, ...state.allOffers],
				pagination: { ...state.pagination, total: state.pagination.total + 1 }
			}));
		},

		updateOffre: (updatedOffre: Offre) => {
			update(state => ({
				...state,
				offres: state.offres.map((o: Offre) => o.id === updatedOffre.id ? updatedOffre : o),
				allOffers: state.allOffers.map((o: Offre) => o.id === updatedOffre.id ? updatedOffre : o),
			}));
		},

		removeOffre: (offreId: string) => {
			update(state => ({
				...state,
				offres: state.offres.filter((o: Offre) => o.id !== offreId),
				allOffers: state.allOffers.filter((o: Offre) => o.id !== offreId),
				pagination: { ...state.pagination, total: Math.max(0, state.pagination.total - 1) }
			}));
		},

		setFilter: (key: keyof OffresState['filters'], value: string) => {
			update(state => ({
				...state,
				filters: { ...state.filters, [key]: value }
			}));
		},

		resetFilters: () => {
			update(state => ({ ...state, filters: initialState.filters }));
		},

		reset: () => set(initialState)
	};
}

export const offresStore = createOffresStore(); 