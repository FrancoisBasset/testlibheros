<template>
	<div class="flex flex-col justify-between h-screen p-2 w-8/12 mx-auto">
		<div class="flex flex-col gap-5">
			<text>Tâche crée le {{ app.currentTask.creationDate.substring(0, 10) }}</text>
			<div class="flex flex-col">
				<text>Titre</text>
				<textarea v-model="title" :class="{ 'border-red-500': title === '' }"></textarea>
				<text class="text-sm text-red-500" v-if="title === ''">Titre manquant</text>
			</div>

			<div class="flex flex-col">
				<text>Description</text>
				<textarea v-model="description" :class="{ 'border-red-500': description === '' }"></textarea>
				<text class="text-sm text-red-500" v-if="description === ''">Description manquante</text>
			</div>

			<div class="flex flex-col">
				<text>Date d'échéance</text>
				<input type="date" v-model="dueDate" :class="{ 'border-red-500': dueDate === '' }" />
				<text class="text-sm text-red-500" v-if="dueDate === ''">Date d'échéance manquante</text>
			</div>

			<div class="flex flex-col">
				<text>État</text>
				<select v-model="state">
					<option value="current">En cours</option>
					<option value="finished">Terminé</option>
				</select>
			</div>

			<button @click="updateTask">Enregistrer</button>

			<button @click="showDeleteDialog = true" class="bg-red-500">Supprimer</button>
		</div>

		<Dialog v-if="showDeleteDialog" @close="showDeleteDialog = false">
			<text>Êtes-vous sûr de vouloir supprimer cette tâche ?</text>

			<div class="flex flex-row mx-auto gap-4">
				<button @click="showDeleteDialog = false">Non</button>
				<button class="bg-red-500" @click="deleteTask">Oui</button>
			</div>
			<br>
		</Dialog>
	</div>
</template>

<script setup>
import Dialog from './Dialog.vue';
</script>

<script>
import useSession from '@/stores/session';
import useApp from '@/stores/app';

export default {
	data: () => ({
		title: '',
		description: '',
		dueDate: '',
		state: null,
		session: useSession(),
		app: useApp(),

		showDeleteDialog: false
	}),
	created() {
		this.title = this.app.currentTask.title;
		this.description = this.app.currentTask.description;
		this.dueDate = this.app.currentTask.dueDate;
		this.state = this.app.currentTask.state;
	},
	methods: {
		updateTask() {
			this.app.updateTask(this.title, this.description, this.dueDate, this.state);
		},
		deleteTask() {
			this.app.deleteTask();
		}
	}
};
</script>
