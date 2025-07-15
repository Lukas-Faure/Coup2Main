import { z } from 'zod';

export const rendezVousSchema = z.object({
	id: z.string().optional(),
	userId: z.string(),
	offreId: z.string(),
	date: z.date(),
	statut: z.enum(['propose', 'accepte', 'refuse', 'confirme', 'termine']).default('propose'),
	demandeurAccepte: z.boolean().default(false),
	offreurAccepte: z.boolean().default(false),
	message: z.string().optional().nullable(),
	lastModifiedBy: z.string().optional().nullable(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});

export const createRendezVousSchema = z.object({
	offreId: z.string().min(1, 'L\'offre est requise'),
	date: z.string().datetime('Date invalide').refine((date) => {
		const parsedDate = new Date(date);
		const now = new Date();
		return parsedDate > now;
	}, 'La date doit être dans le futur'),
	message: z.string().optional()
});
export const updateRendezVousSchema = z.object({
	date: z.string().refine((date) => {
		const parsedDate = new Date(date);
		return parsedDate > new Date();
	}, 'La date doit être dans le futur').optional(),
	statut: z.enum(['propose', 'accepte', 'refuse', 'confirme', 'termine']).optional(),
	message: z.string().optional()
});

export type RendezVous = z.infer<typeof rendezVousSchema>;
export type CreateRendezVous = z.infer<typeof createRendezVousSchema>;
export type UpdateRendezVous = z.infer<typeof updateRendezVousSchema>;

export const populatedRendezVousSchema = rendezVousSchema.extend({
	offre: z.object({
		id: z.string(),
		title: z.string(),
		location: z.string(),
		description: z.string(),
		userId: z.string(),
		user: z.object({
			id: z.string(),
			name: z.string(),
			image: z.string().optional().nullable()
		}),
	}),
	user: z.object({
		id: z.string(),
		name: z.string(),
		image: z.string().optional().nullable()
	})
});

export type PopulatedRendezVous = z.infer<typeof populatedRendezVousSchema>; 