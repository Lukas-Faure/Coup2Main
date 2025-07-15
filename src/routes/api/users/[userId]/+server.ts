import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { findUserById as findUserModel } from "$lib/models/message.model";

export const GET: RequestHandler = async ({ params }) => {
  console.log(`GET /api/users/${params.userId} - Requête reçue pour récupérer un utilisateur`);
  try {
    const userId = params.userId;
    const user = await findUserModel(userId);

    if (!user) {
      console.warn(`GET /api/users/${userId} - Utilisateur introuvable`);
      return json({ error: "Utilisateur introuvable" }, { status: 404 });
    }

    console.log(`GET /api/users/${userId} - Utilisateur trouvé avec succès`);
    return json({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    });
  } catch (error: any) {
    console.error(`Erreur lors de la récupération de l'utilisateur ${params.userId}:`, error);
    return json({ error: "Erreur serveur" }, { status: 500 });
  }
}; 