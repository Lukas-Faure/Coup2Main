import type { UserInfo } from './app';
import type { Offre } from './offres';

export interface Message {
	id: string;
	createdAt: Date;
	fromUserId: string;
	toUserId: string;
	offreId: string | null;
	content: string;
	read: boolean;
	fromUser?: {
		name: string | null;
		image: string | null;
	};
}

export interface Conversation {
	otherUser: UserInfo;
	lastMessage: Message;
	offreId?: string | null;
	offre?: Pick<Offre, 'id' | 'title'> | null;
	unreadCount: number;
}

export interface ActiveConversationData {
	messages: Message[];
	interlocutor: UserInfo;
	offre: Offre | null;
} 