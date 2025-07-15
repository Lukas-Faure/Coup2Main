export type NavigationPath = 
	| '/dashboard'
	| '/offres'
	| '/offres/nouvelle'
	| '/messages'
	| '/rendezvous'
	| '/favoris'
	| '/auth/signin';

export type NavigationOptions = {
	replaceState?: boolean;
	keepFocus?: boolean;
	state?: any;
	invalidateAll?: boolean;
};