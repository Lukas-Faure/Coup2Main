import type { DashboardData } from '$lib/types/app';

export async function loadDashboardData(): Promise<DashboardData> {
	const response = await fetch('/api/dashboard');
	
	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.error || 'Erreur lors du chargement du tableau de bord');
	}
	const data = await response.json();
	return data;
} 