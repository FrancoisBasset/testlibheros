<template>
	<div class="flex flex-col w-fit gap-5 m-5">
		<div class="flex flex-row gap-2">
			<button @click="showCreateTaskDialog = true">Ajouter une tâche</button>
			<button @click="this.mode = this.mode === 'current' ? 'finished' : 'current'">
				<span v-if="mode === 'current'">Voir mes tâches terminées</span>
				<span v-else>Voir mes tâches en cours</span>
			</button>
		</div>

		<CreateTaskDialog v-if="showCreateTaskDialog" @close="showCreateTaskDialog = false" @taskCreated="app.reloadTasks" />

		<div class="text-4xl">
			<span v-if="mode === 'current'">Tâches en cours</span>
			<span v-else>Tâches terminées</span>
		</div>
		
		<Task v-for="task of tasksToShow" :key="task" :task="task" @click="app.currentTask = task" />
	</div>
</template>

<script setup>
import CreateTaskDialog from '@/components/dialogs/CreateTaskDialog.vue';
import Task from '@/components/Task.vue';
</script>

<script>
import useSession from '@/stores/session';
import useApp from '@/stores/app';

export default {
	data: () => ({
		session: useSession(),
		app: useApp(),
		mode: 'current',
		showCreateTaskDialog: false
	}),
	created() {
		this.app.reloadTasks();
	},
	computed: {
		tasksToShow() {
			return this.app.tasks.filter(t => t.state === this.mode);
		}
	}
};
</script>