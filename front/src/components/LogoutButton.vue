<template>
	<button class="flex flex-row gap-4 h-16 items-center justify-center bg-red-500 w-full rounded-none" @click="logout">
		Déconnexion
		<svg class="h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="white" d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12M4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" /></svg>
	</button>
</template>

<script>
import useSession from '@/stores/session';

export default {
	data: () => ({
		session: useSession()
	}),
	methods: {
		logout() {
			this.session.user = null;
			localStorage.removeItem('user');
		}
	}
};
</script>
