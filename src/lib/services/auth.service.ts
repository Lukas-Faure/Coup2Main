import { signIn } from '@auth/sveltekit/client';

export async function signInWithGoogle(callbackUrl?: string | null): Promise<void> {
	try {
		await signIn('google', {
			callbackUrl: callbackUrl || '/'
		});
	} catch (error) {
		console.error('Erreur de connexion via le service:', error);
		throw error;
	}
} 