import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getOffreById } from '$lib/models/offre.model';

export const load: PageServerLoad = async ({ params, locals }) => {
	const session = await locals.auth();
	if (!session?.user?.id) {
		throw redirect(303, '/auth/signin');
	}

	const offreId = params.id;

	if (!offreId) {
		throw error(404, 'ID de l\'offre manquant.');
	}

	const offre = await getOffreById(offreId);

	if (!offre) {
		throw error(404, 'Offre introuvable.');
	}

	if (offre.userId !== session.user.id) {
		throw error(403, 'Non autorisé à modifier cette offre.');
	}

	return {
		offre: JSON.parse(JSON.stringify(offre)) 
	};
}; 