<template>
	<div class="flex flex-col justify-between h-screen p-2 w-8/12 mx-auto">
		<div class="flex flex-col gap-5">
			<text>Tâche crée le {{ _board.currentTask.creationdate.substring(0, 10) }}</text>
			<div class="flex flex-col">
				<text>Titre</text>
				<textarea v-model="_board.currentTask.title" :class="{ 'border-red-500': missing && _board.currentTask.title === '' }"></textarea>
				<text class="text-sm text-red-500" v-if="missing && _board.currentTask.title === ''">Titre manquant</text>
			</div>

			<div class="flex flex-col">
				<text>Description</text>
				<textarea v-model="_board.currentTask.description" :class="{ 'border-red-500': missing && _board.currentTask.description === '' }"></textarea>
				<text class="text-sm text-red-500" v-if="missing && _board.currentTask.description === ''">Description manquante</text>
			</div>

			<div class="flex flex-col">
				<text>Date d'échéance</text>
				<input type="date" v-model="_board.currentTask.duedate" :class="{ 'border-red-500': missing && _board.currentTask.duedate === '' }" />
				<text class="text-sm text-red-500" v-if="missing && _board.currentTask.duedate === ''">Date d'échéance manquante</text>
			</div>

			<button @click="updateTask">Enregistrer</button>

			<button @click="deleteTask" class="bg-red-500">Supprimer</button>
		</div>
	</div>
</template>

<script>
import useSession from '@/stores/session';
import useBoard from '@/stores/board';

export default {
	data: () => ({
		session: useSession(),
		_board: useBoard()
	}),
	methods: {
		updateTask() {
			fetch('http://localhost:3000/tasklists/' + this._board.currentBoard.id + '/tasks/' + this._board.currentTask.id, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this.session.user.access_token
				},
				body: JSON.stringify({
					title: this._board.currentBoard.title,
					description: this._board.currentBoard.description,
					duedate: this._board.currentBoard.duedate
				})
			});
		},
		deleteTask() {
			fetch('http://localhost:3000/tasklists/' + this._board.currentBoard.id + '/tasks/' + this._board.currentTask.id, {
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
