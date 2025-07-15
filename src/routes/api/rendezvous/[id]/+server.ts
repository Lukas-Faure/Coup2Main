import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import {
  getRendezVousByIdModel,
  updateRendezVousModel,
  deleteRendezVousModel
} from "$lib/models/rendezvous.model";
import { authenticateUser } from "$lib/server/auth.helpers";

export const GET: RequestHandler = async ({ params, locals }) => {
  console.log(`GET /api/rendezvous/${params.id} - Requête reçue pour un rendez-vous spécifique`);
  const { error, userId: currentUserId } = await authenticateUser(locals);
  if (error) {
    console.warn(`GET /api/rendezvous/${params.id} - Erreur d'authentification: ${error.status}`);
    return error;
  }
  console.log(`GET /api/rendezvous/${params.id} - Utilisateur authentifié (ID: ${currentUserId})`);

  try {
    const rendezvousId = params.id;
    const rendezvous = await getRendezVousByIdModel(rendezvousId);

    if (!rendezvous) {
      console.warn(`GET /api/rendezvous/${rendezvousId} - Rendez-vous introuvable`);
      return json({ error: "Rendez-vous introuvable" }, { status: 404 });
    }

    if (rendezvous.user.id !== currentUserId && rendezvous.offre.user.id !== currentUserId) {
      console.warn(`GET /api/rendezvous/${rendezvousId} - Non autorisé pour l'utilisateur ${currentUserId}`);
      return json({ error: "Non autorisé" }, { status: 403 });
    }
    console.log(`GET /api/rendezvous/${rendezvousId} - Rendez-vous trouvé et autorisé pour l'utilisateur ${currentUserId}`);
    return json(rendezvous);
  } catch (error: any) {
    console.error(`Erreur lors de la récupération du rendez-vous ${params.id}:`, error);
    return json({ error: "Erreur serveur" }, { status: 500 });
  }
};

export const PATCH: RequestHandler = async ({ locals, params, request }) => {
	console.log(`PATCH /api/rendezvous/${params.id} - Requête reçue pour la modification d'un rendez-vous`);
	const { error, userId } = await authenticateUser(locals);
  if (error) {
    console.warn(`PATCH /api/rendezvous/${params.id} - Erreur d'authentification: ${error.status}`);
    return error;
  }
  console.log(`PATCH /api/rendezvous/${params.id} - Utilisateur authentifié (ID: ${userId})`);

	try {
		const { date, message, statut } = await request.json(); 
    console.log(`PATCH /api/rendezvous/${params.id} - Données reçues: ${JSON.stringify({ date, message, statut })}`);

		const rendezvous = await getRendezVousByIdModel(params.id);
		if (!rendezvous) {
			console.warn(`PATCH /api/rendezvous/${params.id} - Rendez-vous introuvable`);
			return json({ error: 'Rendez-vous introuvable' }, { status: 404 });
		}

		const isCreator = rendezvous.userId === userId;
		const isOffreOwner = rendezvous.offre.user.id === userId;

		if (!isCreator && !isOffreOwner) {
			console.warn(`PATCH /api/rendezvous/${params.id} - Non autorisé à modifier ce rendez-vous pour l'utilisateur ${userId}`);
			return json({ error: 'Non autorisé à modifier ce rendez-vous' }, { status: 403 });
		}

		const updateData: any = {};

		if (date) {
			updateData.date = new Date(date);
			updateData.statut = 'propose'; 
			updateData.demandeurAccepte = false;
			updateData.offreurAccepte = false;
			updateData.lastModifiedBy = userId;
			console.log(`PATCH /api/rendezvous/${params.id} - Nouvelle date proposée: ${date}, statut: 'propose'`);
		}

		if (message !== undefined) {
			updateData.message = message; 
			console.log(`PATCH /api/rendezvous/${params.id} - Message mis à jour`);
		}

		if (statut) {
			if (statut === 'annule') {
				if (rendezvous.statut !== 'termine' && new Date(rendezvous.date) > new Date()) {
					updateData.statut = 'annule';
					updateData.lastModifiedBy = userId;
					console.log(`PATCH /api/rendezvous/${params.id} - Statut changé en 'annule'`);
				} else {
					console.warn(`PATCH /api/rendezvous/${params.id} - Impossible d'annuler un rendez-vous terminé ou passé.`);
					return json({ error: 'Impossible d\'annuler un rendez-vous terminé ou passé.' }, { status: 400 });
				}
			} else {
				console.warn(`PATCH /api/rendezvous/${params.id} - Tentative de définir un statut invalide: ${statut}`);
				return json({ error: 'Ce statut ne peut pas être défini directement via cette API.' }, { status: 400 });
			}
		}

		if (Object.keys(updateData).length === 0) {
			console.warn(`PATCH /api/rendezvous/${params.id} - Aucune donnée fournie pour la mise à jour`);
			return json({ error: 'Aucune donnée fournie pour la mise à jour' }, { status: 400 });
		}

		const updatedRendezVous = await updateRendezVousModel(params.id, updateData);
		console.log(`PATCH /api/rendezvous/${params.id} - Rendez-vous mis à jour avec succès`);
		return json(updatedRendezVous);
	} catch (error: any) {
		console.error(`PATCH /api/rendezvous/${params.id} - Erreur lors de la modification du rendez-vous:`, error);
		return json({ error: error.message }, { status: 500 });
	}
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
	console.log(`DELETE /api/rendezvous/${params.id} - Requête reçue pour la suppression d'un rendez-vous`);
	const { error, userId } = await authenticateUser(locals);
  if (error) {
    console.error(`DELETE /api/rendezvous/${params.id}: Erreur d'authentification pour userId: ${userId}, erreur: ${error.status}`);
    return error;
  }
  console.log(`DELETE /api/rendezvous/${params.id} - Utilisateur authentifié (ID: ${userId})`);

	try {
		const rendezvous = await getRendezVousByIdModel(params.id);
		if (!rendezvous) {
			console.warn(`DELETE /api/rendezvous/${params.id} - Rendez-vous introuvable`);
			return json({ error: 'Rendez-vous introuvable' }, { status: 404 });
		}

		const isOwner = rendezvous.userId === userId;
		const isOffreOwner = rendezvous.offre.user.id === userId;

		if (!isOwner && !isOffreOwner) {
      	console.warn(`DELETE /api/rendezvous/${params.id} - Non autorisé à supprimer ce rendez-vous pour l'utilisateur ${userId}`);
      	return json({ error: 'Non autorisé à supprimer ce rendez-vous' }, { status: 403 });
		}

   		console.log(`DELETE /api/rendezvous/${params.id}: Tentative de suppression du rendez-vous avec l'ID: ${params.id} par userId: ${userId}`);
		await deleteRendezVousModel(params.id);
    	console.log(`DELETE /api/rendezvous/${params.id}: Rendez-vous supprimé avec succès avec l'ID: ${params.id}`);
		return json({ success: true }, { status: 200 });
	} catch (error: any) {
		console.error(`DELETE /api/rendezvous/${params.id}: Erreur lors de la suppression du rendez-vous avec l'ID: ${params.id}, erreur:`, error);
		return json({ error: error.message }, { status: 500 });
	}
}; 