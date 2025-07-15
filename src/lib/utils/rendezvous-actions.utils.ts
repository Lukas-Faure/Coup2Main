import { DEFAULT_ERROR_MESSAGE } from "../constants";

interface ApiActionOptions {
    apiCall: () => Promise<Response>;
    errorMessage?: string;
}

export async function callRendezVousApi<T>({
    apiCall,
    errorMessage = "Erreur réseau."
}: ApiActionOptions): Promise<T> {
    try {
        const response = await apiCall();
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorData = await response.json();
            throw new Error(errorData.error || errorMessage);
        }
    } catch (e: any) {
        throw new Error(e.message || DEFAULT_ERROR_MESSAGE);
    }
} 