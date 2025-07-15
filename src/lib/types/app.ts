import type { z } from 'zod';
import type { Offre } from './offres';
import type { RendezVous } from '../schemas/rendezvous.schema';
import type { Component } from 'svelte'; 

export interface BaseEntity {
	id: string;
	createdAt: Date;
	updatedAt?: Date;
}

export interface UserInfo {
	id: string;
	name: string | null;
	email?: string;
	image?: string | null;
}

export interface ServiceConfig {
	errorHandler?: (error: any) => string;
	logging?: boolean;
}

export interface PaginationParams {
	page?: number;
	limit?: number;
}

export interface QuickAction {
	label: string;
	onClick: () => void;
	icon: Component;
	description: string;
	gradient?: string;
}

export interface BaseState {
	loading: boolean;
	error: string | null;
}

export interface DashboardData {
	lastOffres: { offres: Offre[]; total: number };
	lastRendezvous: RendezVous[];
}

export interface DashboardStatsType {
	totalOffres: number;
	totalRendezVous: number;
	offresRecentes: number;
	rendezVousProchains: number;
}