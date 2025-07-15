import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { getOffreStatsModel } from "$lib/models/offre.model";
import { getMessageStatsModel } from "$lib/models/message.model";
import { getRendezVousStatsModel } from "$lib/models/rendezvous.model";
import { authenticateUser } from "$lib/server/auth.helpers";

export const GET: RequestHandler = async ({ locals }) => {
  const { error, userId } = await authenticateUser(locals);
  if (error) {
    return error;
  }

  try {
    const [offreStats, messageStats, rendezVousStats] = await Promise.all([
      getOffreStatsModel(userId),
      getMessageStatsModel(userId),
      getRendezVousStatsModel({
        OR: [
          { userId },
          { offre: { userId } }
        ]
      })
    ]);

    const stats = {
      offres: offreStats.total,
      messages: messageStats.total,
      rendezVous: rendezVousStats.total,
    };

    return json(stats);
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error);
    return json({ error: "Erreur serveur" }, { status: 500 });
  }
};
