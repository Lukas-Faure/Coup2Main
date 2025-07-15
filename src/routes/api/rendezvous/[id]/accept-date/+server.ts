import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
	getRendezVousByIdModel,
	accepterRendezVousModel
} from '$lib/models/rendezvous.model';
import { authenticateUser } from "$lib/server/auth.helpers";

export const POST: RequestHandler = async ({ params, locals }) => {
	console.log(`POST /api/rendezvous/${params.id}/accept-date - Requête reçue pour accepter la date`);
	const { error, userId } = await authenticateUser(locals);
  if (error) {
    console.warn(`POST /api/rendezvous/${params.id}/accept-date - Erreur d'authentification: ${error.status}`);
    return error;
  }
  console.log(`POST /api/rendezvous/${params.id}/accept-date - Utilisateur authentifié (ID: ${userId})`);

	try {
		const rendezVous = await getRendezVousByIdModel(params.id);

		if (!rendezVous) {
			console.warn(`POST /api/rendezvous/${params.id}/accept-date - Rendez-vous introuvable`);
			return json({ error: 'Rendez-vous introuvable' }, { status: 404 });
		}

		const isOffreOwner = rendezVous.offre.user.id === userId;
		const isDemandeur = rendezVous.userId === userId;

		if (!isOffreOwner && !isDemandeur) {
			console.warn(`POST /api/rendezvous/${params.id}/accept-date - Non autorisé pour l'utilisateur ${userId}`);
			return json({ error: 'Non autorisé' }, { status: 403 });
		}
    console.log(`POST /api/rendezvous/${params.id}/accept-date - Rendez-vous trouvé et autorisé pour l'utilisateur ${userId}`);

		const updateData: any = {
			lastModifiedBy: userId
		};

		let finalDemandeurAccepte = rendezVous.demandeurAccepte;
		let finalOffreurAccepte = rendezVous.offreurAccepte;

		if (isOffreOwner) {
			finalOffreurAccepte = true;
			updateData.offreurAccepte = true;
			console.log(`POST /api/rendezvous/${params.id}/accept-date - Propriétaire de l'offre accepte`);
		}
		if (isDemandeur) {
			finalDemandeurAccepte = true;
			updateData.demandeurAccepte = true;
			console.log(`POST /api/rendezvous/${params.id}/accept-date - Demandeur accepte`);
		}
		
		if (finalDemandeurAccepte && finalOffreurAccepte) {
			updateData.statut = 'confirme';
			console.log(`POST /api/rendezvous/${params.id}/accept-date - Statut du rendez-vous mis à jour en 'confirme'`);
		} else if (finalDemandeurAccepte || finalOffreurAccepte) { 
			updateData.statut = 'accepte';
			console.log(`POST /api/rendezvous/${params.id}/accept-date - Statut du rendez-vous mis à jour en 'accepte'`);
		}

		const updatedRendezVous = await accepterRendezVousModel(params.id, updateData);
		console.log(`POST /api/rendezvous/${params.id}/accept-date - Rendez-vous accepté avec succès`);
		return json(updatedRendezVous);

	} catch (error: any) {
		console.error('Erreur lors de l\'acceptation du rendez-vous:', error);
		return json({ error: 'Erreur serveur' }, { status: 500 });
	}
}; 