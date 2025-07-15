import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/sveltekit/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './prisma';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';

export const { handle, signIn, signOut } = SvelteKitAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		Google({
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
		})
	],
	callbacks: {
		session: async ({ session, token }: any) => {
			if (session?.user && token?.sub) {
				session.user.id = token.sub;
			}
			return session;
		},
		jwt: async ({ token, user }: any) => {
			if (user) {
				token.sub = user.id;
			}
			return token;
		},
	},
	session: {
		strategy: 'jwt' as const,
	},
	pages: {
		signIn: '/auth/signin',
		error: '/auth/error',
	},
});

export const authOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		Google({
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
		})
	],
	callbacks: {
		session: async ({ session, token }: any) => {
			if (session?.user && token?.sub) {
				session.user.id = token.sub;
			}
			return session;
		},
		jwt: async ({ token, user }: any) => {
			if (user) {
				token.sub = user.id;
			}
			return token;
		},
	},
	session: {
		strategy: 'jwt' as const,
	},
	pages: {
		signIn: '/auth/signin',
		error: '/auth/error',
	},
}; 