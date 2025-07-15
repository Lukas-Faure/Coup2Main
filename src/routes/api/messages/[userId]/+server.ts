import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import {
  findUserById as findUserModel,
  getMessagesModel
} from "$lib/models/message.model";
import { getOffreById as getOffreByIdModel } from "$lib/models/offre.model";
import { authenticateUser } from "$lib/server/auth.helpers";

export const GET: RequestHandler = async ({ params, locals, url }) => {
  console.log(`GET /api/messages/${params.userId} - Requête reçue pour la conversation`);
  const { error, userId: currentUserId } = await authenticateUser(locals);
  if (error) {
    return error;
    }

  try {
    const otherUserId = params.userId;
    const offreId = url.searchParams.get('offre');
    console.log(`GET /api/messages/${otherUserId} - Offre ID: ${offreId || 'Non spécifié'}`);

    const interlocutor = await findUserModel(otherUserId);

    if (!interlocutor) {
      console.warn(`GET /api/messages/${otherUserId} - Interlocuteur introuvable`);
      return json({ error: "Utilisateur introuvable" }, { status: 404 });
    }

    const messages = await getMessagesModel(currentUserId, otherUserId, offreId || undefined);
    console.log(`GET /api/messages/${otherUserId} - ${messages.length} messages récupérés`);

    if (messages.length === 0 && offreId) {
      console.warn(`GET /api/messages/${otherUserId} - Conversation introuvable pour l'offre ID: ${offreId}`);
      return json({ error: "Conversation introuvable pour cette offre" }, { status: 404 });
    }

    let offre = null;
    if (offreId) {
      offre = await getOffreByIdModel(offreId);
      if (offre) {
        console.log(`GET /api/messages/${otherUserId} - Offre associée trouvée (ID: ${offre.id})`);
      } else {
        console.warn(`GET /api/messages/${otherUserId} - Offre associée non trouvée (ID: ${offreId})`);
      }
    } else if (messages.length > 0) {
      const firstMessageOffreId = messages.find(m => m.offreId)?.offreId;
      if (firstMessageOffreId) {
        offre = await getOffreByIdModel(firstMessageOffreId);
        if (offre) {
          console.log(`GET /api/messages/${otherUserId} - Offre associée du premier message trouvée (ID: ${offre.id})`);
        }
      }
    }
    console.log(`GET /api/messages/${otherUserId} - Données de conversation et messages récupérés avec succès`);
    return json({
      messages,
      interlocutor,
      offre
    });
  } catch (error: any) {
    console.error("Erreur lors de la récupération de la conversation:", error);
    return json({ error: "Erreur serveur" }, { status: 500 });
  }
};
