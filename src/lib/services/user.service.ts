import type { UserInfo } from '../types/app';

export async function getUserById(userId: string): Promise<UserInfo> {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) {
        throw new Error('Utilisateur introuvable');
    }
    return await response.json();
} 