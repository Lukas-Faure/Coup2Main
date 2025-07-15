import type { CreateRendezVous, PopulatedRendezVous } from '$lib/schemas/rendezvous.schema';

export async function fetchRendezVous(params: {
	limit?: number;
	offset?: number;
	upcoming?: boolean;
	offreId?: string;
	statut?: string;
	userId?: string;
}): Promise<{ rendezVous: PopulatedRendezVous[]; total: number }> {
	const url = new URL('/api/rendezvous', window.location.origin);

	if (params.limit) url.searchParams.set('limit', params.limit.toString());
	if (params.offset) url.searchParams.set('offset', params.offset.toString());
	if (params.upcoming) url.searchParams.set('upcoming', 'true');
	if (params.offreId) url.searchParams.set('offreId', params.offreId);
	if (params.statut) url.searchParams.set('statut', params.statut);
	if (params.userId) url.searchParams.set('userId', params.userId);

	try {
		const response = await fetch(url.toString());
		
		if (response.ok) {
			const data = await response.json();
			return data; 
		} else {
			const errorData = await response.json();
			throw new Error(errorData.error || 'Erreur lors du chargement des rendez-vous');
		}
	} catch {
		throw new Error('Erreur lors du chargement des rendez-vous');
	}
}

export async function loadRendezVousById(id: string): Promise<PopulatedRendezVous> {
    const response = await fetch(`/api/rendezvous/${id}`);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Rendez-vous introuvable');
    }
    return await response.json();
}

export async function proposeNewDate(id: string, newDate: Date, message?: string): Promise<Response> {
    return await fetch(`/api/rendezvous/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: newDate.toISOString(), message })
    });
}

export async function createRendezVous(data: CreateRendezVous): Promise<Response> {
	return await fetch('/api/rendezvous', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	});
}

export async function updateRendezVousDate(
	id: string,
	data: any	
): Promise<Response> {
	return await fetch(`/api/rendezvous/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	});
}

export async function acceptRendezVous(id: string): Promise<Response> {
	return await fetch(`/api/rendezvous/${id}/accept-date`, {
		method: 'POST'
	});
}

export async function refuseRendezVous(id: string): Promise<Response> {
	return await fetch(`/api/rendezvous/${id}/refuse`, {
		method: 'POST'
	});
}

export async function cancelRendezVous(id: string): Promise<Response> {
	return await fetch(`/api/rendezvous/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ statut: 'annule' })
	});
}

export async function deleteRendezVous(id: string): Promise<Response> {
	const response = await fetch(`/api/rendezvous/${id}`, {
		method: 'DELETE'
	});
	return response;
} 