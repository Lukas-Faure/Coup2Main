import {
	submitForm,
	updateForm,
	validateStep,
	type OffreFormData
} from './offre-form.service';
import type { Offre } from '$lib/schemas/offre.schema';
import { titleSuggestions } from './offre-form.service';
import { OFFRE_FORM_MODE, type OffreFormMode } from '$lib/constants';

export function createOffreFormFacade(
	mode: OffreFormMode = OFFRE_FORM_MODE.CREATE,
	initialData?: Offre
) {
	let currentStepIndex = $state(0);
	let loading = $state(false);
	let error = $state('');
	let formData = $state<OffreFormData>(
		initialData || { type: '', title: '', description: '', category: '', location: '' }
	);

	const steps = [
		{ id: 1, title: 'Type' },
		{ id: 2, title: 'Catégorie' },
		{ id: 3, title: 'Titre' },
		{ id: 4, title: 'Détails' }
	];

	const validationErrors = $derived(validateStep(currentStepIndex + 1, formData));
	const canProceed = $derived(Object.keys(validationErrors).length === 0);
	const isLastStep = $derived(currentStepIndex === steps.length - 1);

	const title = $derived(mode === OFFRE_FORM_MODE.CREATE ? 'Nouvelle offre' : `Modifier: ${initialData?.title}`);
	const submitButtonText = $derived(
		mode === OFFRE_FORM_MODE.CREATE ? "Publier l'offre" : 'Enregistrer les modifications'
	);

	const titleSuggestionsList = $derived(
		(() => {
			const categoryKey = formData.category as keyof typeof titleSuggestions;
			const typeKey = formData.type as keyof typeof titleSuggestions[typeof categoryKey];
			return titleSuggestions[categoryKey]?.[typeKey] || [];
		})()
	);

	function nextStep() {
		if (canProceed && !isLastStep) {
			currentStepIndex++;
		}
	}

	function prevStep() {
		if (currentStepIndex > 0) {
			currentStepIndex--;
		}
	}

	async function handleSubmit() {
		if (!canProceed) return;

		loading = true;
		error = '';

		let result;
		if (mode === OFFRE_FORM_MODE.CREATE) {
			result = await submitForm(formData);
		} else if (mode === OFFRE_FORM_MODE.EDIT && initialData?.id) {
			result = await updateForm(initialData.id, formData);
		} else {
			result = { success: false, error: 'ID de l\'offre manquant pour la modification.' };
		}

		if (!result.success) {
			error = result.error;
		}
		loading = false;
	}

	return {
		get currentStepIndex() {
			return currentStepIndex;
		},
		get loading() {
			return loading;
		},
		get error() {
			return error;
		},
		get formData() {
			return formData;
		},
		get steps() {
			return steps;
		},
		get validationErrors() {
			return validationErrors;
		},
		get canProceed() {
			return canProceed;
		},
		get isLastStep() {
			return isLastStep;
		},
		get title() {
			return title;
		},
		get submitButtonText() {
			return submitButtonText;
		},
		get titleSuggestionsList() {
			return titleSuggestionsList;
		},
		nextStep,
		prevStep,
		handleSubmit,
		updateFormValue(field: keyof OffreFormData, value: string) {
			console.log('Facade - updateFormValue', field, value); 
			formData[field] = value;
		}
	};
}