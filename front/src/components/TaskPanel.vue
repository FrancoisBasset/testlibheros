<template>
	<div class="flex flex-col justify-between h-screen p-2 w-8/12 mx-auto">
		<div class="flex flex-col gap-5">
			<text>Tâche crée le {{ app.currentTask.creationdate.substring(0, 10) }}</text>
			<div class="flex flex-col">
				<text>Titre</text>
				<textarea v-model="app.currentTask.title" :class="{ 'border-red-500': missing && app.currentTask.title === '' }"></textarea>
				<text class="text-sm text-red-500" v-if="missing && app.currentTask.title === ''">Titre manquant</text>
			</div>

			<div class="flex flex-col">
				<text>Description</text>
				<textarea v-model="app.currentTask.description" :class="{ 'border-red-500': missing && app.currentTask.description === '' }"></textarea>
				<text class="text-sm text-red-500" v-if="missing && app.currentTask.description === ''">Description manquante</text>
			</div>

			<div class="flex flex-col">
				<text>Date d'échéance</text>
				<input type="date" v-model="app.currentTask.duedate" :class="{ 'border-red-500': missing && app.currentTask.duedate === '' }" />
				<text class="text-sm text-red-500" v-if="missing && app.currentTask.duedate === ''">Date d'échéance manquante</text>
			</div>

			<button @click="updateTask">Enregistrer</button>

			<button @click="deleteTask" class="bg-red-500">Supprimer</button>
		</div>
	</div>
</template>

<script>
import useSession from '@/stores/session';
import useApp from '@/stores/app';

export default {
	data: () => ({
		session: useSession(),
		app: useApp()
	}),
	methods: {
		updateTask() {
			fetch('http://localhost:3000/tasklists/' + this.app.currentBoard.id + '/tasks/' + this.app.currentTask.id, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this.session.user.access_token
				},
				body: JSON.stringify({
					title: this.app.currentBoard.title,
					description: this.app.currentBoard.description,
					duedate: this.app.currentBoard.duedate
				})
			});
		},
		deleteTask() {
			fetch('http://localhost:3000/tasklists/' + this.app.currentBoard.id + '/tasks/' + this.app.currentTask.id, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this.session.user.access_token
				}
			});
		}
	}
};
</script>
