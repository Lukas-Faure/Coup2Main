import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { getOffres as getOffresModel } from "$lib/models/offre.model";
import { authenticateUser } from "$lib/server/auth.helpers";

export const GET: RequestHandler = async ({ locals }) => {
  const { error, userId } = await authenticateUser(locals);
  if (error) {
    return error;
  }

  try {
    const offres = await getOffresModel(5, 0, { userId });

    return json(offres);
  } catch (error) {
    console.error("Erreur lors de la récupération des offres:", error);
    return json({ error: "Erreur serveur" }, { status: 500 });
  }
};
