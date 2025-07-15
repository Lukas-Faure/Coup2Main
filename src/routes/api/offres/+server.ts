import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
	getOffres as getOffresModel,
	createOffre as createOffreModel
} from '$lib/models/offre.model';
import { createOffreSchema } from '$lib/schemas/offre.schema';
import { authenticateUser } from "$lib/server/auth.helpers";

export const GET: RequestHandler = async ({ url }) => {
	console.log('GET /api/offres - Requête reçue pour la liste des offres');
	try {
		const page = parseInt(url.searchParams.get('page') || '1');
		const limit = parseInt(url.searchParams.get('limit') || '10');
		const type = url.searchParams.get('type') || undefined;
		const category = url.searchParams.get('category') || undefined;
		const search = url.searchParams.get('search') || undefined;

		const filters = {
			type,
			category,
			search
		};
		console.log(`GET /api/offres - Filtres appliqués: ${JSON.stringify(filters)}, Page: ${page}, Limite: ${limit}`);

		const offset = (page - 1) * limit;

		const result = await getOffresModel(limit, offset, filters);
		console.log(`GET /api/offres - ${result.offres.length} offres récupérées (Total: ${result.total})`);
		return json(result);
	} catch (error: any) {
		console.error('Erreur lors de la récupération des offres:', error);
		return json({ error: 'Erreur serveur' }, { status: 500 });
	}
};

export const POST: RequestHandler = async ({ request, locals }) => {
	console.log('POST /api/offres - Requête reçue pour la création d\'une offre');
	const { error, userId } = await authenticateUser(locals);
  if (error) {
    return error;
  }
  console.log(`POST /api/offres - Utilisateur authentifié (ID: ${userId})`);

	try {
		const data = await request.json();
		const dataWithUser = { ...data, userId: userId };

		const validatedData = createOffreSchema.parse(dataWithUser);
		console.log('POST /api/offres - Données de l\'offre validées');
		
		const { userId: validatedUserId, ...restOfValidatedData } = validatedData;

		const offre = await createOffreModel({
			...restOfValidatedData,
			user: {
				connect: { id: validatedUserId }
			}
		});

		console.log(`POST /api/offres - Offre créée avec succès (ID: ${offre.id})`);
		return json(offre, { status: 201 });
	} catch (error: any) {
		console.error('Erreur lors de la création de l\'offre:', error);
		if (error.name === 'ZodError') {
			console.error('POST /api/offres - Erreur de validation Zod:', error.flatten());
			return json({ error: 'Données invalides', details: error.flatten() }, { status: 400 });
		}
		console.error('POST /api/offres - Erreur serveur inattendue:', error);
		return json({ error: 'Erreur serveur' }, { status: 500 });
	}
}; 