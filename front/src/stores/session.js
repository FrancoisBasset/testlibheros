import { defineStore } from 'pinia';

export default defineStore('session', {
	state: () => ({
		user: JSON.parse(localStorage.getItem('user')) || null
	}),
	actions: {
		logout() {
			this.user = null;
			localStorage.removeItem('user');
		}
	}
});
