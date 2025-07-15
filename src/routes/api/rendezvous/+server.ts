import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
	getRendezVousByUserIdModel,
	createRendezVousModel,
	getRendezVousByOffreIdModel,
	getProchainRendezVousModel,
	findOffreById
} from '$lib/models/rendezvous.model'; 
import { createRendezVousSchema } from '$lib/schemas/rendezvous.schema';
import { authenticateUser } from "$lib/server/auth.helpers";

export const GET: RequestHandler = async ({ url, locals }) => {
	console.log('GET /api/rendezvous - Requête reçue pour les rendez-vous');
	const { error, userId } = await authenticateUser(locals);
  if (error) {
    return error;
  }

	try {
		const offreId = url.searchParams.get('offreId');
		const upcoming = url.searchParams.get('upcoming') === 'true';
		const limit = parseInt(url.searchParams.get('limit') || '50');
		console.log(`GET /api/rendezvous - Utilisateur ${userId}, Offre ID: ${offreId || 'Non spécifié'}, Prochains: ${upcoming}, Limite: ${limit}`);

		let data: { rendezVous: any[]; total: number };

		if (offreId) {
			data = await getRendezVousByOffreIdModel(offreId);
			console.log(`GET /api/rendezvous - ${data.rendezVous.length} rendez-vous récupérés pour l'offre ${offreId}`);
		} else if (upcoming) {
			data = await getProchainRendezVousModel(userId, limit);
			console.log(`GET /api/rendezvous - ${data.rendezVous.length} prochains rendez-vous récupérés pour l'utilisateur ${userId}`);
		} else {
			data = await getRendezVousByUserIdModel(userId);
			console.log(`GET /api/rendezvous - ${data.rendezVous.length} rendez-vous récupérés pour l'utilisateur ${userId}`);
		}
		console.log('GET /api/rendezvous - Rendez-vous récupérés avec succès');
		return json({ rendezVous: data.rendezVous, total: data.total });

	} catch (error: any) {
		console.error('Erreur lors de la récupération des rendez-vous:', error);
		return json({ error: 'Erreur serveur' }, { status: 500 });
	}
};

export const POST: RequestHandler = async ({ request, locals }) => {
	console.log('POST /api/rendezvous - Requête reçue pour la création d\'un rendez-vous');
	const { error, userId } = await authenticateUser(locals);
  if (error) {
    return error;
  }
  console.log(`POST /api/rendezvous - Utilisateur authentifié (ID: ${userId})`);

	try {
		const data = await request.json();
		console.log(`POST /api/rendezvous - Données reçues: ${JSON.stringify(data)}`);
		const validatedData = createRendezVousSchema.parse(data);
		console.log('POST /api/rendezvous - Données du rendez-vous validées');
		
		const offre = await findOffreById(validatedData.offreId); 
		if (!offre) {
			console.warn(`POST /api/rendezvous - Offre introuvable pour l'ID ${validatedData.offreId}`);
			throw new Error('Offre introuvable');
		}
		if (offre.userId === userId) {
			console.warn(`POST /api/rendezvous - L'utilisateur ${userId} tente de créer un rendez-vous pour sa propre offre ${offre.id}`);
			throw new Error('Vous ne pouvez pas créer un rendez-vous pour votre propre offre');
		}

		const rendezVous = await createRendezVousModel({
			offreId: validatedData.offreId,
			userId: userId,
			date: new Date(validatedData.date),
			message: validatedData.message
		});

		console.log(`POST /api/rendezvous - Rendez-vous créé avec succès (ID: ${rendezVous.id})`);
		return json(rendezVous, { status: 201 });
	} catch (error: any) {
		console.error('Erreur lors de la création du rendez-vous:', error);
		
		if (error.message.includes('propre offre')) {
			console.warn('POST /api/rendezvous - Erreur: Impossible de créer un rendez-vous pour sa propre offre');
			return json({ error: error.message }, { status: 400 });
		}
		
		if (error.message.includes('futur')) {
			console.warn('POST /api/rendezvous - Erreur: Date de rendez-vous invalide (doit être future)');
			return json({ error: error.message }, { status: 400 });
		}

		if (error.issues) {
			const validationError = error.issues[0]?.message || 'Données invalides';
			console.error('POST /api/rendezvous - Erreur de validation Zod:', error.issues);
			return json({ error: validationError }, { status: 400 });
		}
		console.error('POST /api/rendezvous - Erreur serveur inattendue lors de la création du rendez-vous:', error);
		return json({ error: 'Erreur serveur' }, { status: 500 });
	}
}; 