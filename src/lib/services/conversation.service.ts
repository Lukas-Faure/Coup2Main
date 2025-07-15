import type { Conversation, ActiveConversationData } from '$lib/types/chat';
import { getUserById } from '$lib/services/user.service';
import { getOffreById } from '$lib/services/offre.service';

export async function getConversations(): Promise<Conversation[]> {
	try {
		const response = await fetch('/api/messages/conversations');

		if (response.ok) {
			const data = await response.json();
			return data;
		}
		return [];
	} catch (error) {
		throw error;
	}
}

export async function loadConversation(userId: string, offreId?: string): Promise<ActiveConversationData> {
	const url = offreId ? `/api/messages/${userId}?offre=${offreId}` : `/api/messages/${userId}`;

	const response = await fetch(url);

	if (response.ok) {
		const conversationData = await response.json();
		return conversationData;
	} else if (response.status === 404) {
		let interlocutor;
		let offre = null;

		try {
			interlocutor = await getUserById(userId);
		} catch (e) {
			throw new Error('Interlocuteur introuvable.');
		}

		if (offreId) {
			try {
				offre = await getOffreById(offreId);
			} catch (e) {
				console.warn('Offre introuvable lors de la création d\'une nouvelle conversation:', e);
			}
		}

		return {
			messages: [],
			interlocutor,
			offre,
		};
	} else {
		const errorData = await response.json();
		throw new Error(errorData.error || 'Erreur lors du chargement de la conversation');
	}
} 