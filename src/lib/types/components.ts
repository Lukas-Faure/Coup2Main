import type {
    ButtonStyle,
    variantConfig,
	feedbackTypeConfig
} from "$lib/constants/ui";
import type { Component } from "svelte";

export type FeedbackType = keyof typeof feedbackTypeConfig;

export type ColorTheme = "green" | "orange" | "blue" | "purple";

export interface SelectionCardOption {
    label: string;
    description: string;
    icon: Component; 
    colorTheme: ColorTheme;
    value: string;
    darkColor?: string; 
}

export interface CategoryOption extends SelectionCardOption {
    color: string;
}

export interface ListItem {
    id: string;
    [key: string]: any;
}

export interface SuggestionItem {
    label: string;
    value?: string;
    icon?: Component; 
    description?: string;
    data?: any; 
}

export interface SuggestionConfig {
    placeholder: string;
    icon?: Component;
    loadSuggestions?: (query: string) => Promise<SuggestionItem[]>;
    staticSuggestions?: SuggestionItem[];
    minQueryLength?: number;
    debounceMs?: number;
    maxSuggestions?: number;
    showOnFocus?: boolean;
    allowCustom?: boolean;
    validationClasses?: string;
}

export interface EmptyStateAction {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    icon?: Component;
    buttonStyle?: keyof typeof variantConfig;
}
