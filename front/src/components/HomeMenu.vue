<template>
	<div class="flex flex-col gap-5 justify-center items-center h-screen">
		<div class="text-6xl text-red-400">Tasky</div>

		<div class="flex flex-col gap-2">
			<button @click="dialog = 'signin'">Se connecter</button>
			<button @click="dialog = 'signup'">Créer un compte</button>

			<SigninDialog v-if="dialog === 'signin'" @close="closeDialog" />
			<SignupDialog v-if="dialog === 'signup'" @close="closeDialog" />
		</div>
	</div>
</template>

<script setup>
import SigninDialog from './SigninDialog.vue';
import SignupDialog from './SignupDialog.vue';
</script>

<script>
export default {
	data: () => ({
		dialog: null
	}),
	methods: {
		closeDialog() {
			this.dialog = null;
		}
	}
};
</script>
