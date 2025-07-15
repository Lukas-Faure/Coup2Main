import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { getConversationsModel } from "$lib/models/message.model";
import { authenticateUser } from "$lib/server/auth.helpers";

export const GET: RequestHandler = async ({ locals }) => {
  const { error, userId } = await authenticateUser(locals);
  if (error) {
    return error;
  }

  try {
    const conversations = await getConversationsModel(userId);

    return json(conversations);
  } catch (error) {
    console.error("Erreur lors de la récupération des conversations:", error);
    return json({ error: "Erreur serveur" }, { status: 500 });
  }
};
