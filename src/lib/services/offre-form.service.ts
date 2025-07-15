import { goto } from '$app/navigation';
import { offresStore } from '$lib/stores/offres.store';
import { CATEGORY_DATA, TITLE_SUGGESTION_TEMPLATES, type OffreType } from '$lib/constants';

export type OffreFormData = {
	type: string;
	title: string;
	description: string;
	category: string;
	location: string;
};

export function validateStep(step: number, formData: OffreFormData): Record<string, string> {
	const errors: Record<string, string> = {};

	switch (step) {
		case 1:
			if (!formData.type) {
				errors.type = "Veuillez sélectionner un type d'offre";
			}
			break;
		case 2:
			if (!formData.category) {
				errors.category = 'Veuillez sélectionner une catégorie';
			}
			break;
		case 3:
			if (formData.title.trim().length < 5) {
				errors.title = 'Le titre doit contenir au moins 5 caractères';
			} else if (formData.title.trim().length > 100) {
				errors.title = 'Le titre ne peut pas dépasser 100 caractères';
			}
			break;
		case 4:
			if (formData.description.trim().length < 20) {
				errors.description = 'La description doit contenir au moins 20 caractères';
			} else if (formData.description.trim().length > 500) {
				errors.description = 'La description ne peut pas dépasser 500 caractères';
			}
			if (formData.location.trim().length < 2) {
				errors.location = 'Veuillez indiquer votre localisation';
			}
			break;
	}
	return errors;
}

export async function submitForm(formData: OffreFormData): Promise<{ success: boolean; error: string }> {
	try {
		const response = await fetch('/api/offres', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formData)
		});

		if (response.ok) {
			const newOffre = await response.json();
			offresStore.addOffre(newOffre);
			goto('/?success=offre-creee');
			return { success: true, error: '' };
		} else {
			const errorData = await response.json();
			return { success: false, error: errorData.error || 'Erreur lors de la création' };
		}
	} catch (err) {
		return { success: false, error: 'Erreur de connexion.' };
	}
}

export async function updateForm(
	offreId: string,
	formData: OffreFormData
): Promise<{ success: boolean; error: string }> {
	try {
		const response = await fetch(`/api/offres/${offreId}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formData)
		});

		if (response.ok) {
			const updatedOffre = await response.json();
			offresStore.updateOffre(updatedOffre);
			goto(`/offres/${offreId}?success=offre-modifiee`);
			return { success: true, error: '' };
		} else {
			const errorData = await response.json();
			return { success: false, error: errorData.error || "Erreur lors de la modification de l'offre" };
		}
	} catch (err) {
		return { success: false, error: 'Erreur de connexion.' };
	}
}

// Configuration des suggestions de titres

function generateSuggestions(category: string, type: OffreType): string[] {
	const data = CATEGORY_DATA[category as keyof typeof CATEGORY_DATA];
	if (!data) return [];

	const suggestions: string[] = [];
	
	if (type === 'proposition') {
		data.services.forEach(service => {
			suggestions.push(TITLE_SUGGESTION_TEMPLATES.proposition.service.replace('{service}', service));
			suggestions.push(TITLE_SUGGESTION_TEMPLATES.proposition.disponible.replace('{service}', service));
		});
	} else {
		data.activities.forEach(activity => {
			suggestions.push(TITLE_SUGGESTION_TEMPLATES.demande.recherche.replace('{service}', activity));
			suggestions.push(TITLE_SUGGESTION_TEMPLATES.demande.besoin.replace('{service}', activity));
		});
	}

	return suggestions.slice(0, 4);
}

export const titleSuggestions = Object.keys(CATEGORY_DATA).reduce((acc, category) => {
	acc[category] = {
		proposition: generateSuggestions(category, 'proposition'),
		demande: generateSuggestions(category, 'demande')
	};
	return acc;
}, {} as Record<string, { proposition: string[]; demande: string[] }>); 