import type { BaseEntity, UserInfo, BaseState } from './app';
import type { OffreCategory, OffreType } from '../constants';


export interface Offre extends BaseEntity {
	title: string;
	description: string;
	category: OffreCategory;
	type: OffreType;
	location: string;
	userId: string;
	user: UserInfo;
	active?: boolean;
	featured?: boolean;
}

export interface OffreDetail extends Offre {
	user: {
		id: string;
		name: string;
		email: string;
		image?: string;
	};
}

export interface OffresState extends BaseState {
	offres: Offre[];
	allOffers: Offre[];
	filters: {
		type: 'all' | 'proposition' | 'demande';
		search: string;
		location: string;
		category: string;
	};
	pagination: {
		total: number;
		pages: number;
		currentPage: number;
	};
}

export interface LocationSuggestion {
	label: string;
	latitude: number;
	longitude: number;
}