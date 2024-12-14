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
				<input type="date" v-model="duedate" :class="{ 'border-red-500': duedate === '' }" />
				<text class="text-sm text-red-500" v-if="duedate === ''">Date d'échéance manquante</text>
			</div>

			<div class="flex flex-col">
				<text>État</text>
				<select v-model="state">
					<option value="current">En cours</option>
					<option value="finished">Terminé</option>
				</select>
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
		title: '',
		description: '',
		duedate: '',
		state: null,
		session: useSession(),
		app: useApp()
	}),
	created() {
		this.title = this.app.currentTask.title;
		this.description = this.app.currentTask.description;
		this.duedate = this.app.currentTask.duedate;
		this.state = this.app.currentTask.state;
	},
	methods: {
		updateTask() {
			this.app.updateTask(this.title, this.description, this.duedate, this.state);
		},
		deleteTask() {
			this.app.deleteTask();
		}
	}
};
</script>
