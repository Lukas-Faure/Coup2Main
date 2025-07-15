import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const initialValue: string[] = browser ? JSON.parse(window.localStorage.getItem('favoris') || '[]') : [];

const favorisStore = writable<string[]>(initialValue);

favorisStore.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem('favoris', JSON.stringify(value));
  }
});

async function fetchFavoris() {
	if (!browser) return;
	try {
		const response = await fetch('/api/favoris');
		if (response.ok) {
			const favorisData = await response.json();
			const offreIds = favorisData.map((fav: any) => fav.offreId);
			favorisStore.set(offreIds);
		}
	} catch {
		console.error("Erreur lors de la récupération des favoris:");
	}
}

async function addToApi(offreId: string) {
	try {
		await fetch('/api/favoris', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ offreId })
		});
	} catch {
		console.error("Erreur lors de l'ajout du favori via API:");
	}
}

async function removeFromApi(offreId: string) {
	try {
		await fetch(`/api/favoris/${offreId}`, {
			method: 'DELETE'
		});
	} catch {
		console.error("Erreur lors de la suppression du favori via API:");
	}
}

export const favoris = {
  subscribe: favorisStore.subscribe,
  
  add: (offreId: string) => {
    favorisStore.update(ids => {
      if (!ids.includes(offreId)) {
		addToApi(offreId);
        return [...ids, offreId];
      }
      return ids;
    });
  },
  
  remove: (offreId: string) => {
    favorisStore.update(ids => {
		if(ids.includes(offreId)) {
			removeFromApi(offreId);
			return ids.filter(id => id !== offreId)
		}
		return ids;
	});
  },

  set: (offreIds: string[]) => {
    favorisStore.set(offreIds);
  },

  toggle: (offreId: string) => {
    favorisStore.update(ids => {
      if (ids.includes(offreId)) {
		removeFromApi(offreId);
        return ids.filter(id => id !== offreId);
      } else {
		addToApi(offreId);
        return [...ids, offreId];
      }
    });
  },

  fetch: fetchFavoris
}; 