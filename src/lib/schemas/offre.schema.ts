import { z } from 'zod';
import { CATEGORIES } from '$lib/constants';

export const offreSchema = z.object({
	id: z.string().optional(),
	userId: z.string(),
	type: z.enum(['demande', 'proposition'], {
		required_error: 'Le type est requis',
		invalid_type_error: 'Le type doit être "demande" ou "proposition"',
	}),
	title: z.string().min(5, 'Le titre doit faire au moins 5 caractères').max(100, 'Le titre ne peut pas dépasser 100 caractères'),
	description: z.string().min(20, 'La description doit faire au moins 20 caractères').max(500, 'La description ne peut pas dépasser 500 caractères'),
	category: z.enum(CATEGORIES.map(c => c.value) as [string, ...string[]]),
	location: z.string().min(5, 'Le code postal doit faire au moins 5 caractères').max(10, 'Le code postal ne peut pas dépasser 10 caractères'),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});

export const createOffreSchema = z.object({
	userId: z.string(),
	type: z.enum(['demande', 'proposition'], {
		errorMap: () => ({ message: 'Le type doit être "demande" ou "proposition"' })
	}),
	title: z.string().min(1, 'Le titre est requis').max(100, 'Le titre ne peut pas dépasser 100 caractères'),
	description: z.string().min(10, 'La description doit contenir au moins 10 caractères').max(1000, 'La description ne peut pas dépasser 1000 caractères'),
	category: z.enum(CATEGORIES.map(c => c.value) as [string, ...string[]]),
	location: z.string().min(1, 'La localisation est requise')
});

export const updateOffreSchema = createOffreSchema.partial();

export type Offre = z.infer<typeof offreSchema>;
export type CreateOffre = z.infer<typeof createOffreSchema>;
export type UpdateOffre = z.infer<typeof updateOffreSchema>; 