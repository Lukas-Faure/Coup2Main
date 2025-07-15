import { navigation } from "$lib/services/navigation.service";
import {
	Bars3,
	HandRaised,
	WrenchScrewdriver,
	CheckCircle,
	XCircle,
	Calendar,
	ChartBar,
	ChatBubbleLeft,
	Bell,
	CalendarDays,
	Clock,
	Plus,
	MagnifyingGlass,
	Home,
	Heart,
	Wrench,
	Sparkles,
	GlobeAlt,
	ShoppingCart,
	UserGroup,
	Truck,
	ComputerDesktop,
	Fire,
	Squares2x2,
	LightBulb,
	Clock as ClockIcon, 
	CheckCircle as CheckCircleIcon, 
	XCircle as XCircleIcon, 
	Calendar as CalendarIcon
} from 'svelte-heros-v2';
import type { SelectionCardOption, ColorTheme, CategoryOption } from '$lib/types/components';
import type { QuickAction } from "$lib/types/app";

// ===== CATÉGORIES =====
export const CATEGORIES: CategoryOption[] = [
	{ value: 'bricolage', label: 'Bricolage', icon: Wrench, description: 'Réparations, montage, travaux', color: 'text-orange-500', colorTheme: 'orange' as ColorTheme },
	{ value: 'menage', label: 'Ménage', icon: Sparkles, description: 'Nettoyage, repassage, organisation', color: 'text-blue-500', colorTheme: 'blue' as ColorTheme },
	{ value: 'jardinage', label: 'Jardinage', icon: GlobeAlt, description: 'Entretien, plantation, taille', color: 'text-green-500', colorTheme: 'green' as ColorTheme },
	{ value: 'courses', label: 'Courses', icon: ShoppingCart, description: 'Achats, livraisons', color: 'text-purple-500', colorTheme: 'purple' as ColorTheme },
	{ value: 'garde', label: 'Garde d\'enfants', icon: UserGroup, description: 'Baby-sitting, accompagnement', color: 'text-pink-500', colorTheme: 'purple' as ColorTheme },
	{ value: 'transport', label: 'Transport', icon: Truck, description: 'Covoiturage, déménagement', color: 'text-red-500', colorTheme: 'orange' as ColorTheme },
	{ value: 'informatique', label: 'Informatique', icon: ComputerDesktop, description: 'Dépannage, formation', color: 'text-indigo-500', colorTheme: 'blue' as ColorTheme },
	{ value: 'cuisine', label: 'Cuisine', description: 'Cours, préparation de repas', color: 'text-yellow-500', colorTheme: 'orange' as ColorTheme, icon: Fire },
	{ value: 'autre', label: 'Autre', icon: Squares2x2, description: 'Autres services', color: 'text-gray-500', colorTheme: 'blue' as ColorTheme }
];

// ===== TYPES =====
export const TYPES: SelectionCardOption[] = [
	{ value: '', label: 'Tous les types', icon: Bars3, description: 'Afficher toutes les offres disponibles', colorTheme: 'blue' },
	{ value: 'demande', label: 'Demandes', icon: HandRaised, description: 'Vous avez besoin d\'aide pour une tâche spécifique.', colorTheme: 'blue', darkColor: 'dark:text-blue-300'  },
	{ value: 'proposition', label: 'Propositions', icon: WrenchScrewdriver, description: 'Vous proposez votre aide pour une tâche spécifique.', colorTheme: 'green', darkColor: 'dark:text-green-300'  }
];

export const typeConfig = {
	demande: {
		icon: HandRaised,
		label: 'Demande',
		description: 'Vous avez besoin d\'aide pour une tâche spécifique.',
		colorTheme: 'blue'
	},
	proposition: {
		icon: LightBulb,
		label: 'Proposition',
		description: 'Vous proposez votre aide pour une tâche spécifique.',
		colorTheme: 'green'
	}
} as const;

// Constantes spécifiques pour les types d'offre (pour l'autocomplétion et limiter les erreurs de frappes)
export const OFFRE_TYPE_DEMANDE = 'demande' as const;
export const OFFRE_TYPE_PROPOSITION = 'proposition' as const;

export const TYPE_OPTIONS: SelectionCardOption[] = [
	{
		label: typeConfig.demande.label,
		description: typeConfig.demande.description,
		icon: typeConfig.demande.icon,
		colorTheme: typeConfig.demande.colorTheme,
		value: 'demande'
	},
	{
		label: typeConfig.proposition.label,
		description: typeConfig.proposition.description,
		icon: typeConfig.proposition.icon,
		colorTheme: typeConfig.proposition.colorTheme,
		value: 'proposition'
	}
];

// Configuration des catégories
export const categoryConfig: Record<string, SelectionCardOption & { color: string }> = {
	bricolage: { icon: WrenchScrewdriver, label: 'Bricolage', description: 'Réparations, montage, travaux', color: 'text-orange-500', colorTheme: 'orange' as ColorTheme, value: 'bricolage', darkColor: 'dark:text-orange-300' },
	menage: { icon: Sparkles, label: 'Ménage', description: 'Nettoyage, repassage, organisation', color: 'text-blue-500', colorTheme: 'blue' as ColorTheme, value: 'menage', darkColor: 'dark:text-blue-300' },
	jardinage: { icon: GlobeAlt, label: 'Jardinage', description: 'Entretien, plantation, taille', color: 'text-green-500', colorTheme: 'green' as ColorTheme, value: 'jardinage', darkColor: 'dark:text-green-300' },
	courses: { icon: ShoppingCart, label: 'Courses', description: 'Achats, livraisons', color: 'text-purple-500', colorTheme: 'purple' as ColorTheme, value: 'courses', darkColor: 'dark:text-purple-300' },
	garde: { icon: UserGroup, label: 'Garde d\'enfants', description: 'Baby-sitting, accompagnement', color: 'text-pink-500', colorTheme: 'purple' as ColorTheme, value: 'garde', darkColor: 'dark:text-pink-300' }, 
	transport: { icon: Truck, label: 'Transport', description: 'Covoiturage, déménagement', color: 'text-red-500', colorTheme: 'orange' as ColorTheme, value: 'transport', darkColor: 'dark:text-red-300' }, 
	informatique: { icon: ComputerDesktop, label: 'Informatique', description: 'Dépannage, formation', color: 'text-indigo-500', colorTheme: 'blue' as ColorTheme, value: 'informatique', darkColor: 'dark:text-indigo-300' },
	cuisine: { icon: Fire, label: 'Cuisine', description: 'Cours, préparation de repas', color: 'text-yellow-500', colorTheme: 'orange' as ColorTheme, value: 'cuisine', darkColor: 'dark:text-yellow-300' }, 
	autre: { icon: Squares2x2, label: 'Autre', description: 'Autres services', color: 'text-gray-500', colorTheme: 'blue' as ColorTheme, value: 'autre', darkColor: 'dark:text-gray-300' } 
};

// ===== STATUTS =====
export const STATUS_CONFIG = {
	propose: { icon: '⏳', label: 'En attente', gradient: 'from-orange-500 to-amber-600' },
	accepte: { icon: CheckCircle, label: 'Acceptés', gradient: 'from-emerald-500 to-green-600' },
	refuse: { icon: XCircle, label: 'Refusés', gradient: 'from-red-500 to-rose-600' },
	termine: { icon: '🏁', label: 'Terminés', gradient: 'from-gray-500 to-slate-600' },
	tous: { icon: CalendarIcon, label: 'Tous', gradient: 'from-orange-500 to-amber-600' }
};

// ===== NAVIGATION =====
export const MAIN_NAV_ITEMS = [
	{ label: 'Accueil', icon: Home, description: "Retour à la page d'accueil", onClick: () => navigation.goToHome(), href: '/' },
	{ label: 'Explorer', icon: MagnifyingGlass, description: 'Parcourir toutes les offres disponibles', onClick: () => navigation.goToOffres(), href: '/offres'  },
	{ label: 'Publier', icon: Plus, description: "Créer une nouvelle offre d'entraide", onClick: () => navigation.goToNewOffer(), href: '/offres/nouvelle'  }
];

export const ACTIVITY_NAV_ITEMS = [
	{ label: 'Messages', icon: ChatBubbleLeft, description: 'Vos conversations', onClick: () => navigation.goToMessages()  },
	{ label: 'Rendez-vous', icon: Calendar, description: 'Vos rendez-vous planifiés', onClick: () => navigation.goToRendezVous()  }
];

export const MANAGEMENT_NAV_ITEMS = [
	{ label: 'Tableau de bord', icon: ChartBar, description: 'Gérer votre compte et vos statistiques', onClick: () => navigation.goToDashboard()  },
	{ label: 'Favoris', icon: Heart, description: 'Offres que vous avez sauvegardées', onClick: () => navigation.goToFavoris()  }
];

// ===== LAYOUT =====
export const HOW_IT_WORKS_STEPS = [
	{
		stepNumber: 1,
		title: 'Publiez votre offre',
		description: "Décrivez le service que vous proposez ou l'aide dont vous avez besoin. Ajoutez les détails importants et votre localisation.",
		gradientClasses: 'from-primary-500 to-blue-600',
		lineGradientClasses: 'from-primary-200 to-purple-200 dark:from-primary-700 dark:to-purple-700',
		rotationClass: 'group-hover:-rotate-3',
		showSeparator: true
	},
	{
		stepNumber: 2,
		title: 'Connectez-vous',
		description: 'Entrez en contact avec les personnes intéressées par votre offre. Échangez en toute sécurité via notre messagerie intégrée.',
		gradientClasses: 'from-emerald-500 to-green-600',
		lineGradientClasses: 'from-emerald-200 to-orange-200 dark:from-emerald-700 dark:to-orange-700',
		rotationClass: 'group-hover:rotate-3',
		showSeparator: true
	},
	{
		stepNumber: 3,
		title: 'Échangez',
		description: "Rendez service ou recevez l'aide dont vous avez besoin. Créez des liens durables avec vos voisins.",
		gradientClasses: 'from-orange-500 to-red-600',
		rotationClass: 'group-hover:-rotate-3',
		showSeparator: false
	}
];

// ===== UI CONSTANTS =====
export const LINK_BUTTON_CLASS = "text-primary-600 dark:text-primary-400 hover:underline";


// ===== FORMULAIRE D'OFFRE =====
export const OFFRE_FORM_MODE = {
    CREATE: 'create',
    EDIT: 'edit',
} as const;

// ===== TYPES POUR TYPESCRIPT =====
export type OffreCategory = keyof typeof categoryConfig;
export type OffreType = 'demande' | 'proposition';
export type RendezVousStatus = 'tous' | 'propose' | 'accepte' | 'refuse';
export type OffreFormMode = typeof OFFRE_FORM_MODE[keyof typeof OFFRE_FORM_MODE];

export const enum FilterType {
    TYPE = 'type',
    CATEGORY = 'category'
}

// ===== FONCTIONS UTILITAIRES =====
export const ONE_WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

export const DEFAULT_ERROR_MESSAGE = 'Erreur de connexion'; 

export const CATEGORY_DATA = {
	bricolage: {
		services: ['réparation et montage', 'travaux de bricolage', 'montage à domicile'],
		activities: ['montage IKEA', 'réparation', 'installation']
	},
	menage: {
		services: ['ménage régulier', 'aide ménagère', 'grand nettoyage', 'repassage'],
		activities: ['ménage', 'nettoyage', 'repassage', 'organisation maison']
	},
	jardinage: {
		services: ['entretien jardins', 'taille professionnel', 'aménagement jardin'],
		activities: ['jardinage', 'taille de haies', 'plantation', 'entretien jardin']
	},
	courses: {
		services: ['courses à domicile', 'commissions', 'livraisons'],
		activities: ['courses', 'livraison', 'commissions']
	},
	garde: {
		services: ['baby-sitting', 'garde d\'enfants', 'accompagnement scolaire'],
		activities: ['baby-sitter', 'garde d\'enfants', 'nounou']
	},
	transport: {
		services: ['covoiturage', 'aide déménagement', 'transport personnes âgées'],
		activities: ['déménagement', 'transport médical', 'covoiturage']
	},
	informatique: {
		services: ['dépannage informatique', 'formation numérique', 'aide logiciels'],
		activities: ['informatique', 'dépannage PC', 'installation Internet']
	},
	cuisine: {
		services: ['cours de cuisine', 'préparation repas', 'cuisine événements'],
		activities: ['cuisine', 'préparation repas', 'chef à domicile']
	},
	autre: {
		services: ['service personnalisé', 'aide sur mesure', 'assistance'],
		activities: ['aide spécifique', 'assistance', 'service sur mesure']
	}
};

export const TITLE_SUGGESTION_TEMPLATES = {
	proposition: {
		service: "Service de {service}",
		aide: "Aide pour {activity}",
		disponible: "{service} disponible", 
		professionnel: "{activity} professionnel"
	},
	demande: {
		recherche: "Recherche {service}",
		besoin: "Besoin de {service}",
		aide: "Aide {activity} recherché",
		urgent: "{service} urgent nécessaire"
	}
}; 