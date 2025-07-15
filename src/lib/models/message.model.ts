import { prisma } from '$lib/server/prisma';
import type { Prisma } from '@prisma/client';
import type { CreateMessage } from '$lib/schemas/message.schema'; 

export async function getConversationsModel(userId: string) {
	const messages = await prisma.message.findMany({
		where: {
			OR: [
				{ fromUserId: userId },
				{ toUserId: userId }
			]
		},
		include: {
			fromUser: {
				select: {
					id: true,
					name: true,
					email: true,
					image: true
				}
			},
			toUser: {
				select: {
					id: true,
					name: true,
					email: true,
					image: true
				}
			},
			offre: {
				select: {
					id: true,
					title: true
				}
			}
		},
		orderBy: {
			createdAt: 'desc'
		}
	});

	return messages;
}

export async function getMessagesModel(userId: string, otherUserId: string, offreId?: string) {
	const where: Prisma.MessageWhereInput = {
		OR: [
			{ fromUserId: userId, toUserId: otherUserId },
			{ fromUserId: otherUserId, toUserId: userId }
		]
	};

	if (offreId) {
		where.offreId = offreId;
	}

	const messages = await prisma.message.findMany({
		where,
		include: {
			fromUser: {
				select: {
					id: true,
					name: true,
					email: true
				}
			},
			toUser: {
				select: {
					id: true,
					name: true,
					email: true
				}
			},
			offre: {
				select: {
					id: true,
					title: true
				}
			}
		},
		orderBy: {
			createdAt: 'asc'
		}
	});

	return messages;
}

export async function sendMessageModel(fromUserId: string, data: CreateMessage) {
	const message = await prisma.message.create({
		data: {
			content: data.content,
			fromUserId,
			toUserId: data.toUserId,
			offreId: data.offreId || null
		},
		include: {
			fromUser: {
				select: {
					id: true,
					name: true,
					email: true
				}
			},
			toUser: {
				select: {
					id: true,
					name: true,
					email: true
				}
			},
			offre: {
				select: {
					id: true,
					title: true
				}
			}
		}
	});

	return message;
}

export async function deleteMessageModel(messageId: string, userId: string) {
	const message = await prisma.message.findUnique({
		where: { id: messageId },
	});

	if (!message || message.fromUserId !== userId) {
		throw new Error('Message non trouvé ou non autorisé');
	}

	return await prisma.message.delete({
		where: { id: messageId },
	});
}

export async function getMessageStatsModel(userId: string) {
	const [sentCount, receivedCount] = await Promise.all([
		prisma.message.count({ where: { fromUserId: userId } }),
		prisma.message.count({ where: { toUserId: userId } }),
	]);

	return {
		sent: sentCount,
		received: receivedCount,
		total: sentCount + receivedCount,
	};
}

export async function findUserById(userId: string) {
	return await prisma.user.findUnique({
		where: { id: userId }
	});
}