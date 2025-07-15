import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import {
  getOffreById as getOffreByIdModel,
  updateOffre as updateOffreModel,
  deleteOffre as deleteOffreModel
} from "$lib/models/offre.model";
import { authenticateUser } from "$lib/server/auth.helpers";

export const GET: RequestHandler = async ({ params }) => {
  console.log(`GET /api/offres/${params.id} - Requête reçue pour une offre spécifique`);
  try {
    const offreId = params.id;
    const offre = await getOffreByIdModel(offreId);

    if (!offre) {
      console.warn(`GET /api/offres/${offreId} - Offre introuvable`);
      return json({ error: "Offre introuvable" }, { status: 404 });
    }
    console.log(`GET /api/offres/${offreId} - Offre trouvée avec succès`);
    return json(offre);
  } catch (error: any) {
    console.error(`Erreur lors de la récupération de l'offre ${params.id}:`, error);
    return json({ error: "Erreur serveur" }, { status: 500 });
  }
};

export const PUT: RequestHandler = async ({ params, request, locals }) => {
  console.log(`PUT /api/offres/${params.id} - Requête reçue pour la modification d'une offre`);
  const { error, userId } = await authenticateUser(locals);
  if (error) {
    return error;
  }
  console.log(`PUT /api/offres/${params.id} - Utilisateur authentifié (ID: ${userId})`);

  try {
    const offreId = params.id;
    const data = await request.json();
    console.log(`PUT /api/offres/${offreId} - Données reçues pour mise à jour: ${JSON.stringify(data)}`);

    const updatedOffre = await updateOffreModel(offreId, data);
    console.log(`PUT /api/offres/${offreId} - Offre mise à jour avec succès`);

    return json(updatedOffre);
  } catch (error: any) {
    console.error(`Erreur lors de la modification de l'offre ${params.id}:`, error);

    if (
      error.message.includes("non trouvée") ||
      error.message.includes("non autorisée")
    ) {
      console.warn(`PUT /api/offres/${params.id} - Modification échouée: ${error.message}`);
      return json({ error: error.message }, { status: 403 });
    }
    console.error(`PUT /api/offres/${params.id} - Erreur serveur inattendue lors de la modification:`, error);
    return json({ error: "Erreur serveur" }, { status: 500 });
  }
};

export const DELETE: RequestHandler = async ({ params, locals }) => {
  console.log(`DELETE /api/offres/${params.id} - Requête reçue pour la suppression d'une offre`);
  const { error, userId } = await authenticateUser(locals);
  if (error) {
    return error;
  }
  console.log(`DELETE /api/offres/${params.id} - Utilisateur authentifié (ID: ${userId})`);

  try {
    const offreId = params.id;

    await deleteOffreModel(offreId);
    console.log(`DELETE /api/offres/${offreId} - Offre supprimée avec succès`);

    return json({ success: true });
  } catch (error: any) {
    console.error(`Erreur lors de la suppression de l'offre ${params.id}:`, error);

    if (
      error.message.includes("non trouvée") ||
      error.message.includes("non autorisée")
    ) {
      console.warn(`DELETE /api/offres/${params.id} - Suppression échouée: ${error.message}`);
      return json({ error: error.message }, { status: 403 });
    }
    console.error(`DELETE /api/offres/${params.id} - Erreur serveur inattendue lors de la suppression:`, error);
    return json({ error: "Erreur serveur" }, { status: 500 });
  }
};
