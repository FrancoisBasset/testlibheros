<template>
	<Dialog @close="$emit('close')">
		<div class="flex flex-col">
			<text>Nom d'utilisateur</text>
			<input type="text" v-model="username" :class="{ 'border-red-500': missing && username === '' }" />
			<text class="text-sm text-red-500" v-if="missing && username === ''">Nom d'utilisateur manquant</text>
		</div>

		<div class="flex flex-col">
			<text>Prénom</text>
			<input type="text" v-model="firstname" :class="{ 'border-red-500': missing && firstname === '' }" />
			<text class="text-sm text-red-500" v-if="missing && firstname === ''">Prénom manquant</text>
		</div>

		<div class="flex flex-col">
			<text>Nom</text>
			<input type="text" v-model="lastname" :class="{ 'border-red-500': missing && lastname === '' }" />
			<text class="text-sm text-red-500" v-if="missing && lastname === ''">Nom manquant</text>
		</div>

		<div class="flex flex-col">
			<text>Adresse mail</text>
			<input type="text" v-model="mailaddress" :class="{ 'border-red-500': missing && mailaddress === '' }" />
			<text class="text-sm text-red-500" v-if="missing && mailaddress === ''">Adresse mail manquante</text>
		</div>

		<div class="flex flex-col">
			<text>Mot de passe</text>
			<input type="text" v-model="password1" :class="{ 'border-red-500': missing && password1 === '' }" />
			<text class="text-sm text-red-500" v-if="missing && password1 === ''">Mot de passe manquant</text>
		</div>

		<div class="flex flex-col">
			<text>Confirmation mot de passe</text>
			<input type="text" v-model="password2" :class="{ 'border-red-500': missing && password2 === '' }" />
			<text class="text-sm text-red-500" v-if="missing && password2 === ''">Mot de passe manquant</text>
		</div>

		<div v-if="passwordsNotSame" class="text-red-500">Mots de passe non identiques !</div>
		<div v-if="success" class="text-green-500">Le compte a bien été crée !</div>

		<button @click="signup">Créer un compte</button>
	</Dialog>
</template>

<script setup>
import Dialog from './Dialog.vue';
</script>

<script>
import { hashPassword } from '../utils/security';

function initialData() {
	return {
		username: '',
		firstname: '',
		lastname: '',
		mailaddress: '',
		password1: '',
		password2: '',
		missing: false,
		passwordsNotSame: null,
		success: null
	}
};

export default {
	data: () => initialData(),
	methods: {
		
		async signup() {
			if (this.username.trim() === '' || this.firstname.trim() === '' ||
				this.lastname.trim() === '' || this.mailaddress.trim() === '' || this.password1.trim() === '') {
					this.missing = true;
					return;
				}

			this.missing = false;

			if (this.password1 !== this.password2) {
				this.passwordsNotSame = true;
				return;
			}

			fetch('http://localhost:3000/user', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username: this.username,
					firstname: this.firstname,
					lastname: this.lastname,
					mailaddress: this.mailaddress,
					password: await hashPassword(this.password1)
				})
			}).then(res => {
				if (res.status === 201) {
					this.success = true;
				}
			})

			Object.assign(this.$data, initialData());
		}
	}
}
</script>
