import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
	findFavoriByUserIdAndOffreId,
	createFavoriModel,
	deleteFavoriModel
} from '$lib/models/favoris.model';
import { authenticateUser } from "$lib/server/auth.helpers";

export const POST: RequestHandler = async ({ params, locals }) => {
	console.log(`POST /api/favoris/${params.offreId} - Requête reçue`);
	const { error, userId } = await authenticateUser(locals);
  if (error) {
    return error;
  }

	const { offreId } = params;

	try {
		const existingFavori = await findFavoriByUserIdAndOffreId(userId, offreId);

		if (existingFavori) {
			await deleteFavoriModel(userId, offreId);
			console.log(`POST /api/favoris/${offreId} - Favori supprimé avec succès (User ID: ${userId})`);
			return json({ status: 'removed' });
		} else {
			await createFavoriModel(userId, offreId);
			console.log(`POST /api/favoris/${offreId} - Favori ajouté avec succès (User ID: ${userId})`);
			return json({ status: 'added' });
		}
	} catch (error: any) {
		console.error('Erreur lors de la mise à jour du favori:', error);
		return json({ error: 'Erreur serveur' }, { status: 500 });
	}
};

export const DELETE: RequestHandler = async ({ params, locals }) => {
	console.log(`DELETE /api/favoris/${params.offreId} - Requête reçue`);
	const { error, userId } = await authenticateUser(locals);
  if (error) {
    return error;
  }

	const { offreId } = params;

	try {
		await deleteFavoriModel(userId, offreId);
		console.log(`DELETE /api/favoris/${offreId} - Favori supprimé avec succès (User ID: ${userId})`);
		return json({ status: 'removed' });
	} catch (error: any) {
		console.error('Erreur lors de la suppression du favori:', error);
		return json({ error: 'Erreur serveur' }, { status: 500 });
	}
}; 