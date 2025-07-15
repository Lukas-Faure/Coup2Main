import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getOffres as getOffresModel } from '$lib/models/offre.model';
import { getRendezVousByUserIdModel } from '$lib/models/rendezvous.model'; 
import { authenticateUser } from "$lib/server/auth.helpers";		

export const GET: RequestHandler = async ({ locals }) => {
	console.log('GET /api/dashboard - Requête reçue');
	const { error, userId } = await authenticateUser(locals);
  if (error) {
    return error;
  }


	try {
		const [lastOffres, lastRendezvousData] = await Promise.all([
			getOffresModel(5, 0, { userId: userId }), 
			getRendezVousByUserIdModel(userId) 
		]);
		console.log('GET /api/dashboard - Données du tableau de bord chargées avec succès');
		return json({
			lastOffres,
			lastRendezvous: lastRendezvousData.rendezVous 
		});
	} catch (error) {
		console.error('Erreur chargement dashboard:', error);
		return json({ 
			error: 'Impossible de charger les données du tableau de bord.' 
		}, { status: 500 });
	}
}; 