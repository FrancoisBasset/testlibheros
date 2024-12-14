<template>
	<Dialog @close="$emit('close')">
		<div class="flex flex-col">
			<text>Titre</text>
			<input type="text" v-model="title" :class="{ 'border-red-500': missing && title === '' }" />
			<text class="text-sm text-red-500" v-if="missing && title === ''">Titre manquant</text>
		</div>

		<div class="flex flex-col">
			<text>Description</text>
			<textarea v-model="description" :class="{ 'border-red-500': missing && description === '' }"></textarea>
			<text class="text-sm text-red-500" v-if="missing && description === ''">Description manquante</text>
		</div>

		<div class="flex flex-col">
			<text>Date d'échéance</text>
			<input type="date" v-model="duedate" :class="{ 'border-red-500': missing && duedate === '' }" />
			<text class="text-sm text-red-500" v-if="missing && duedate === ''">Date d'échéance manquante</text>
		</div>

		<div v-if="success" class="text-green-500">La tâche a bien été créée !</div>

		<button @click="signup">Créer une nouvelle tâche</button>
	</Dialog>
</template>

<script setup>
import Dialog from './Dialog.vue';
</script>

<script>
import useSession from '@/stores/session';
import useBoard from '@/stores/board';

function initialData() {
	return {
		session: useSession(),
		_board: useBoard(),
		title: '',
		description: '',
		duedate: '',
		missing: false,
		success: null
	}
};

export default {
	data: () => initialData(),
	methods: {
		async signup() {
			if (this.title.trim() === '' || this.description.trim() === '' ||
				this.duedate.trim() === '') {
					this.missing = true;
					return;
				}

			this.missing = false;

			fetch('http://localhost:3000/tasklists/' + this._board.currentBoard.id + '/tasks', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this.session.user.access_token
				},
				body: JSON.stringify({
					title: this.title,
					description: this.description,
					creationdate: new Date(),
					duedate: this.duedate
				})
			}).then(res => {
				if (res.status === 201) {
					this.success = true;
					this.$emit('taskCreated');
				}
			})

			Object.assign(this.$data, initialData());
		}
	}
}
</script>
