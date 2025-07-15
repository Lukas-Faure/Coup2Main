export const RendezVousStatus = {
    PROPOSE: 'propose',
    ACCEPTE: 'accepte',
    REFUSE: 'refuse',
    TERMINE: 'termine',
	CONFIRME: 'confirme',
	ANNULE: 'annule',
} as const;

export type RendezVousStatusType = typeof RendezVousStatus[keyof typeof RendezVousStatus];

export const RendezVousDisplayFilter = {
    ALL: 'tous',
    UPCOMING: 'upcoming',
    PAST: 'past',
    PROPOSED: 'propose',
    ACCEPTED: 'accepte',
    REFUSED: 'refuse',
	CANCELLED: 'annule'
} as const;

export type RendezVousDisplayFilterType = typeof RendezVousDisplayFilter[keyof typeof RendezVousDisplayFilter];

import { Clock, CheckCircle, XCircle } from 'svelte-heros-v2';

export const StatusDisplayConfig: Record<
    RendezVousStatusType,
    { icon: any; label: string; colors: string; bgColor: string; textClass: string }
> = {
    [RendezVousStatus.PROPOSE]: {
        icon: Clock,
        label: 'En attente',
        colors:
            'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-600/50',
        bgColor: 'from-amber-500 to-orange-500',
        textClass: 'text-orange-600 dark:text-orange-400'
    },
    [RendezVousStatus.ACCEPTE]: {
        icon: CheckCircle,
        label: 'Accepté',
        colors:
            'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-600/50',
        bgColor: 'from-emerald-500 to-green-500',
        textClass: 'text-green-600 dark:text-green-400'
    },
    [RendezVousStatus.REFUSE]: {
        icon: XCircle,
        label: 'Refusé',
        colors:
            'bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-200 border-rose-300 dark:border-rose-600/50',
        bgColor: 'from-rose-500 to-red-500',
        textClass: 'text-red-600 dark:text-red-400'
    },
    [RendezVousStatus.TERMINE]: {
        icon: CheckCircle,
        label: 'Terminé',
        colors:
            'bg-gray-200 dark:bg-gray-600/30 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600',
        bgColor: 'from-gray-400 to-gray-500',
        textClass: 'text-gray-700 dark:text-gray-300'
    },
	[RendezVousStatus.CONFIRME]: {
		icon: CheckCircle,
		label: 'Confirmé',
		colors:
			'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-600/50',
		bgColor: 'from-emerald-500 to-green-500',
		textClass: 'text-green-600 dark:text-green-400'
	},
    [RendezVousStatus.ANNULE]: {
        icon: XCircle,
        label: 'Annulé',
        colors:
            'bg-gray-100 dark:bg-gray-700/30 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600/50',
        bgColor: 'from-gray-400 to-gray-500',
        textClass: 'text-gray-600 dark:text-gray-400'
    }
};

export function getStatusInfo(status: RendezVousStatusType) {
    return StatusDisplayConfig[status] || StatusDisplayConfig.propose;
} 