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
			<input type="date" v-model="dueDate" :class="{ 'border-red-500': missing && dueDate === '' }" />
			<text class="text-sm text-red-500" v-if="missing && dueDate === ''">Date d'échéance manquante</text>
		</div>

		<div v-if="success" class="text-green-500">La tâche a bien été créée !</div>

		<button @click="addTask">Créer une nouvelle tâche</button>
	</Dialog>
</template>

<script setup>
import Dialog from './Dialog.vue';
</script>

<script>
import useSession from '@/stores/session';
import useApp from '@/stores/app';

function initialData() {
	return {
		session: useSession(),
		app: useApp(),
		title: '',
		description: '',
		dueDate: '',
		missing: false,
		success: null
	}
};

export default {
	data: () => initialData(),
	methods: {
		async addTask() {
			if (this.title.trim() === '' || this.description.trim() === '' ||
				this.dueDate.trim() === '') {
					this.missing = true;
					return;
				}

			this.missing = false;

			this.app.addTask(this.title, this.description, this.dueDate).then(res => {
				if (res.status === 201) {
					this.success = true;
					this.$emit('taskCreated');
					Object.assign(this.$data, initialData());
				}
			});
		}
	}
}
</script>
