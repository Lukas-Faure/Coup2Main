import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getRendezVousByUserIdModel } from '$lib/models/rendezvous.model';
import { authenticateUser } from "$lib/server/auth.helpers";

export const GET: RequestHandler = async ({ locals }) => {
	const { error, userId } = await authenticateUser(locals);
  if (error) {
    return error;
  }

	try {
		const rendezVous = await getRendezVousByUserIdModel(userId);

		return json(rendezVous);
	} catch (error) {
		console.error('Erreur lors de la récupération des rendez-vous:', error);
		return json({ error: 'Erreur serveur' }, { status: 500 });
	}
}; 