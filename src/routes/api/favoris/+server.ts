import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import {
  getFavorisModel,
  findFavoriByUserIdAndOffreId,
  createFavoriModel,
} from "$lib/models/favoris.model";
import { getOffreById as getOffreByIdModel } from "$lib/models/offre.model";
import { authenticateUser } from "$lib/server/auth.helpers";

export const GET: RequestHandler = async ({ url, locals }) => {
  console.log('GET /api/favoris - Requête reçue');
  const { error, userId } = await authenticateUser(locals);
  if (error) {
    return error;
  }

  try {
    const limit = parseInt(url.searchParams.get("limit") || "50");
    const offset = parseInt(url.searchParams.get("offset") || "0");

    const favoris = await getFavorisModel(userId, limit, offset);
    console.log('GET /api/favoris - Favoris récupérés avec succès');
    return json(favoris);
  } catch (error: any) {
    console.error("Erreur lors de la récupération des favoris:", error);
    return json({ error: "Erreur serveur" }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request, locals }) => {
  console.log('POST /api/favoris - Requête reçue');
  const { error, userId } = await authenticateUser(locals);
  if (error) {
    return error;
  }

  try {
    const { offreId } = await request.json();
    console.log(`POST /api/favoris - Tentative d'ajout en favoris de l'offre ID: ${offreId}`);

    if (!offreId) {
      console.warn('POST /api/favoris - ID de l\'offre manquant');
      return json({ error: "ID de l'offre requis" }, { status: 400 });
    }

    const offre = await getOffreByIdModel(offreId);

    if (!offre) {
      console.warn(`POST /api/favoris - Offre introuvable avec l'ID: ${offreId}`);
      return json({ error: "Offre introuvable" }, { status: 404 });
    }

    if (offre.userId === userId) {
      console.warn(`POST /api/favoris - L'utilisateur ne peut pas ajouter ses propres offres en favoris (Offre ID: ${offreId}, User ID: ${userId})`);
      return json(
        { error: "Vous ne pouvez pas ajouter vos propres offres en favoris" },
        { status: 400 },
      );
    }

    const existingFavori = await findFavoriByUserIdAndOffreId(userId, offreId);

    if (existingFavori) {
      console.warn(`POST /api/favoris - Offre déjà en favoris (Offre ID: ${offreId}, User ID: ${userId})`);
      return json({ error: "Offre déjà en favoris" }, { status: 400 });
    }

    const favori = await createFavoriModel(userId, offreId);
    console.log(`POST /api/favoris - Offre ajoutée en favoris avec succès (Offre ID: ${offreId}, User ID: ${userId})`);
    return json(favori, { status: 201 });
  } catch (error: any) {
    console.error("Erreur lors de l'ajout en favoris:", error);
    return json({ error: "Erreur serveur" }, { status: 500 });
  }
};
