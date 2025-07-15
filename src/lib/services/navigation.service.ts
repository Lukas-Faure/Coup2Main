import { goto } from '$app/navigation';
import type { NavigationPath, NavigationOptions } from '$lib/types/navigation';

export function navigateTo(path: NavigationPath | string, options: NavigationOptions = {}): Promise<void> {
	return goto(path, options);
}

export function navigateToWithParams(basePath: string, params: Record<string, string | undefined>, options: NavigationOptions = {}): Promise<void> {
	const url = new URL(basePath, 'http://localhost');
	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined) {
			url.searchParams.set(key, value);
		}
	});
	return goto(url.pathname + url.search, options);
}

export const navigation = {
	goToLogin: (callbackUrl?: string) => {
		const params = callbackUrl ? { callbackUrl } : {};
		return navigateToWithParams('/auth/signin', params);
	},

	goToDashboard: () => navigateTo('/dashboard'),
	goToFavoris: () => navigateTo('/favoris'),

	goToOffres: () => navigateTo('/offres'),
	goToOffre: (offreId: string) => navigateTo(`/offres/${offreId}`),
	goToNewOffer: () => navigateTo('/offres/nouvelle'),
	goToEditOffer: (offreId: string) => navigateTo(`/offres/${offreId}/editer`),
	getOffreDetailPath: (offreId: string) => `/offres/${offreId}`,

	goToMessages: () => navigateTo('/messages'),
	goToConversation: (userId: string, offreId?: string) => {
		const params = offreId ? { offre: offreId } : {};
		return navigateToWithParams(`/messages/${userId}`, params);
	},

	goToRendezVous: () => navigateTo('/rendezvous'),
	goToRendezVousDetail: (id: string) => navigateTo(`/rendezvous/${id}`),
	getRendezVousDetailPath: (id: string) => `/rendezvous/${id}`,

	goToNotImplemented: () => navigateTo('/not-implemented'),

	goToHome: () => navigateTo('/')
};

export function goToRendezVous(): void {
	navigation.goToRendezVous();
}

export function goToOffre(offreId: string): void {
	navigation.goToOffre(offreId);
}

export function goToMessages(): void {
	navigation.goToMessages();
}

export function goToLogin(): void {
	navigation.goToLogin();
}

export function goToNewOffer(): void {
	navigation.goToNewOffer();
}

export function isPathActive(itemPath: string, currentPath: string): boolean {
	if (itemPath === '/') {
		return currentPath === '/';
	} else if (itemPath === '/offres') {
		const isOffresBase = currentPath === '/offres';
		const isOffreDetails = currentPath.startsWith('/offres/') &&
							   !currentPath.startsWith('/offres/nouvelle') &&
							   !currentPath.includes('/editer');
		return isOffresBase || isOffreDetails;
	} else if (itemPath === '/offres/nouvelle') {
		return currentPath === '/offres/nouvelle' || currentPath.includes('/editer');
	}
	return currentPath.startsWith(itemPath);
}

export default navigation; 