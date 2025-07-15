import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { deleteMessageModel } from "$lib/models/message.model";
import { authenticateUser } from "$lib/server/auth.helpers";

export const DELETE: RequestHandler = async ({ params, locals }) => {
  console.log(`DELETE /api/messages/delete/${params.messageId} - Requête reçue pour suppression`);
  const { error, userId } = await authenticateUser(locals);
  if (error) {
    return error;
  }

  const messageId = params.messageId;

  try {
    await deleteMessageModel(messageId, userId);
    console.log(`DELETE /api/messages/delete/${messageId} - Message supprimé avec succès par l'utilisateur ${userId}`);

    return json({ success: true });
  } catch (error: any) {
    console.error(`Erreur lors de la suppression du message ${messageId} par l'utilisateur ${userId}:`, error);

    if (
      error.message.includes("non trouvé") ||
      error.message.includes("non autorisé")
    ) {
      console.warn(`DELETE /api/messages/delete/${messageId} - Suppression échouée: ${error.message}`);
      return json({ error: error.message }, { status: 403 });
    }

    console.error(`DELETE /api/messages/delete/${messageId} - Erreur serveur inattendue lors de la suppression:`, error);
    return json(
      { error: "Erreur serveur lors de la suppression" },
      { status: 500 },
    );
  }
};
