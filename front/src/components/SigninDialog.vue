<template>
	<Dialog @close="$emit('close')">
		<div class="flex flex-col">
			<text>Nom d'utilisateur</text>
			<input type="text" v-model="username" :class="{ 'border-red-500': missing && username === '' }" />
			<text class="text-sm text-red-500" v-if="missing && username === ''">Nom d'utilisateur manquant</text>
		</div>

		<div class="flex flex-col">
			<text>Mot de passe</text>
			<input type="text" v-model="password" :class="{ 'border-red-500': missing && password === '' }" />
			<text class="text-sm text-red-500" v-if="missing && password === ''">Mot de passe manquant</text>
		</div>

		<div v-if="success === false" class="text-red-500">Identifiants invalides !</div>

		<button @click="signin">Se connecter</button>
	</Dialog>
</template>

<script setup>
import Dialog from './Dialog.vue';
</script>

<script>
import { hashPassword } from '../utils/security';
import useSession from '@/stores/session';

export default {
	data: () => ({
		session: useSession(),
		username: '',
		password: '',
		missing: null,
		success: null
	}),
	methods: {
		async signin() {
			if (this.username === '' || this.password === '') {
				this.missing = true;
				return;
			}

			fetch('http://localhost:3000/auth', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username: this.username,
					password: await hashPassword(this.password)
				})
			}).then(async res => {
				if (res.status === 200) {
					this.success = true;
					this.session.user = await res.json();
					localStorage.setItem('user', JSON.stringify(this.session.user));
				} else {
					this.success = false;
				}
			})
		
		}
	}
}
</script>
