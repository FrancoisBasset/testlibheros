<template>
	<div class="flex flex-col w-fit gap-5 m-5">
		<div class="flex flex-row gap-2">
			<button @click="showCreateTaskDialog = true">Ajouter une tâche</button>
			<button @click="this.mode = this.mode === 'current' ? 'finished' : 'current'">
				<span v-if="mode === 'current'">Voir mes tâches terminées</span>
				<span v-else>Voir mes tâches en cours</span>
			</button>
		</div>

		<CreateTaskDialog v-if="showCreateTaskDialog" @close="showCreateTaskDialog = false" @taskCreated="reloadTasks" />

		<div class="text-4xl">
			<span v-if="mode === 'current'">Tâches en cours</span>
			<span v-else>Tâches terminées</span>
		</div>
		
		<Task v-for="task of tasksToShow" :key="task" :task="task" @click="_board.currentTask = task" />
	</div>
</template>

<script setup>
import CreateTaskDialog from './CreateTaskDialog.vue';
import Task from './Task.vue';
</script>

<script>
import useSession from '@/stores/session';
import useBoard from '@/stores/board';

export default {
	data: () => ({
		session: useSession(),
		_board: useBoard(),
		mode: 'current',
		tasks: [],
		showCreateTaskDialog: false
	}),
	created() {
		this.reloadTasks();
	},
	computed: {
		tasksToShow() {
			return this.tasks.filter(t => t.state === this.mode);
		}
	},
	methods: {
		reloadTasks() {
			fetch('http://localhost:3000/tasklists/' + this._board.currentBoard.id + '/tasks', {
				headers: {
					'Authorization': 'Bearer ' + this.session.user.access_token
				}
			})
				.then(res => res.json())
				.then(json => this.tasks = json);
		}
	}
};
</script>