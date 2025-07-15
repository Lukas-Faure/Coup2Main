import { writable, get } from 'svelte/store';
import { navigation, navigateTo } from '../services/navigation.service';

const backHrefStore = writable<string | null>(null);

export const navigationStore = {
    subscribe: backHrefStore.subscribe,
    setBackHref: (href: string | null) => {
        backHrefStore.set(href);
    },
    goBack: () => {
        const currentBackHref = get(backHrefStore);
        if (currentBackHref) {
            navigateTo(currentBackHref);
            backHrefStore.set(null); 
        } else {
            navigation.goToHome();
        }
    }
}; 