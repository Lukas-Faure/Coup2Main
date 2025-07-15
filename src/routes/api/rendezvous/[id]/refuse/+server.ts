import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
	getRendezVousByIdModel,
	updateRendezVousModel
} from '$lib/models/rendezvous.model';
import { authenticateUser } from "$lib/server/auth.helpers";

export const POST: RequestHandler = async ({ params, locals }) => {
	console.log(`POST /api/rendezvous/${params.id}/refuse - Requête reçue pour refuser un rendez-vous`);
	const { error, userId } = await authenticateUser(locals);
  if (error) {
    console.warn(`POST /api/rendezvous/${params.id}/refuse - Erreur d'authentification: ${error.status}`);
    return error;
  }
  console.log(`POST /api/rendezvous/${params.id}/refuse - Utilisateur authentifié (ID: ${userId})`);

	try {
		const rendezvous = await getRendezVousByIdModel(params.id);

		if (!rendezvous) {
			console.warn(`POST /api/rendezvous/${params.id}/refuse - Rendez-vous introuvable`);
			return json({ error: 'Rendez-vous introuvable' }, { status: 404 });
		}

		const isOffreOwner = rendezvous.offre.user.id === userId;
		const isCreator = rendezvous.userId === userId;

		if (!isOffreOwner && !isCreator) {
			console.warn(`POST /api/rendezvous/${params.id}/refuse - Non autorisé pour l'utilisateur ${userId}`);
			return json({ error: 'Non autorisé' }, { status: 403 });
		}
    console.log(`POST /api/rendezvous/${params.id}/refuse - Rendez-vous trouvé et autorisé pour l'utilisateur ${userId}`);

		const updateData: any = {
			statut: 'refuse',
			lastModifiedBy: userId,
			demandeurAccepte: false,
			offreurAccepte: false
		};
    console.log(`POST /api/rendezvous/${params.id}/refuse - Mise à jour du statut en 'refuse'`);

		const updatedRendezVous = await updateRendezVousModel(params.id, updateData);
		console.log(`POST /api/rendezvous/${params.id}/refuse - Rendez-vous refusé avec succès`);
		return json(updatedRendezVous);

	} catch (error: any) {
		console.error(`Erreur lors du refus du rendez-vous ${params.id}:`, error);
		return json({ error: 'Erreur serveur' }, { status: 500 });
	}
}; 