import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { getConversationsModel, findUserById } from "$lib/models/message.model";
import type { Conversation } from "$lib/types/chat";
import { authenticateUser } from "$lib/server/auth.helpers";

export const GET: RequestHandler = async ({ locals }) => {
  console.log('GET /api/messages/conversations - Requête reçue pour les conversations');
  const { error, userId } = await authenticateUser(locals);
  if (error) {
    return error;
  }

  try {
    const userExists = await findUserById(userId);

    if (!userExists) {
      console.warn('GET /api/messages/conversations - Utilisateur non trouvé');
      return json({ error: "Utilisateur introuvable" }, { status: 404 });
    }

    const messages = await getConversationsModel(userId);
    console.log(`GET /api/messages/conversations - ${messages.length} messages bruts récupérés`);
    
    const conversationsMap = new Map<string, Conversation>();

    for (const message of messages) {
        const otherUser = message.fromUserId === userId ? message.toUser : message.fromUser;
        const conversationKey = `${userId < otherUser.id ? userId : otherUser.id}-${userId < otherUser.id ? otherUser.id : userId}-${message.offreId || 'no-offre'}`;

        if (!conversationsMap.has(conversationKey)) {
            conversationsMap.set(conversationKey, {
                otherUser: {
                    id: otherUser.id,
                    name: otherUser.name,
                    email: otherUser.email || undefined,
                    image: otherUser.image || undefined,
                },
                lastMessage: {
                    id: message.id,
                    content: message.content,
                    createdAt: message.createdAt,
                    fromUserId: message.fromUserId,
                    toUserId: message.toUserId,
                    offreId: message.offreId,
                    read: message.read
                },
                offreId: message.offreId || undefined,
                offre: message.offre || undefined,
                unreadCount: 0
            });
        }
    }

    const conversations = Array.from(conversationsMap.values());
    console.log(`GET /api/messages/conversations - ${conversations.length} conversations finalisées`);
    return json(conversations);
  } catch (error: any) {
    console.error("Erreur lors de la récupération des conversations:", error);
    return json({ error: "Erreur serveur" }, { status: 500 });
  }
};
