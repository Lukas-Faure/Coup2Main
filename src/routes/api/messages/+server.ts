import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import {
  sendMessageModel,
  findUserById
} from "$lib/models/message.model";
import { createMessageSchema } from "$lib/schemas/message.schema";
import { authenticateUser } from "$lib/server/auth.helpers";

export const POST: RequestHandler = async ({ request, locals }) => {
  console.log('POST /api/messages - Requête reçue pour l\'envoi d\'un message');
  const { error, userId } = await authenticateUser(locals);
  if (error) {
    return error;
  }

  try {
    const userExists = await findUserById(userId);

    if (!userExists) {
      console.warn('POST /api/messages - Utilisateur non trouvé');
      return json({ error: "Utilisateur de test non implémenté" }, { status: 500 });
    }

    const data = await request.json();

    const validatedData = createMessageSchema.parse(data);
    console.log('POST /api/messages - Données du message validées');

    const message = await sendMessageModel(userId, validatedData);
    console.log(`POST /api/messages - Message envoyé avec succès (Message ID: ${message.id})`);

    return json(message, { status: 201 });
  } catch (error: any) {
    console.error("Erreur lors de l'envoi du message:", error);

    if (error.name === "ZodError") {
      console.error('POST /api/messages - Erreur de validation Zod:', error.errors);
      return json(
        { error: "Données invalides", details: error.errors },
        { status: 400 },
      );
    }

    console.error('POST /api/messages - Erreur serveur inattendue:', error);
    return json({ error: "Erreur serveur" }, { status: 500 });
  }
};
