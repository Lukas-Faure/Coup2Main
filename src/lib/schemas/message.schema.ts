import { z } from 'zod';

export const messageSchema = z.object({
	id: z.string().optional(),
	fromUserId: z.string(),
	toUserId: z.string(),
	offreId: z.string().optional(),
	content: z.string().min(1, 'Le message ne peut pas être vide').max(1000, 'Le message ne peut pas dépasser 1000 caractères'),
	createdAt: z.date().optional(),
});

export const createMessageSchema = z.object({
	toUserId: z.string().min(1, 'Le destinataire est requis'),
	content: z.string().min(1, 'Le contenu est requis').max(1000, 'Le message ne peut pas dépasser 1000 caractères'),
	offreId: z.string().optional()
});

export type Message = z.infer<typeof messageSchema>;
export type CreateMessage = z.infer<typeof createMessageSchema>; 