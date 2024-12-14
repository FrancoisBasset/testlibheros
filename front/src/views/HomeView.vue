<template>
	<div>
		<HomeMenu v-if="session.user === null" />
		<div v-else class="flex flex-row">
			<div v-if="openPanel" class="w-2/12 h-screen bg-gray-100 rounded-lg">
				<Panel @panelClosed="openPanel = false" />
			</div>
			<div v-else class="w-8 h-screen">
				<button @click="openPanel = true" class="w-8 h-8">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="white" d="M12.08,4.08L20,12L12.08,19.92L10.67,18.5L16.17,13H2V11H16.17L10.67,5.5L12.08,4.08M20,12V22H22V2H20V12Z" /></svg>
				</button>
			</div>
			<div class="w-10/12">
				<Board v-if="app.currentBoard" />
				<div v-else class="border-red-500 border-[2px] w-fit p-10 mx-auto">
					Aucune liste de tâches n'est sélectionné
				</div>
			</div>
			<div v-if="app.currentTask" class="w-3/12 h-screen bg-gray-100 rounded-lg">
				<TaskPanel />
			</div>
		</div>
	</div>
</template>

<script setup>
import Board from '@/components/Board.vue';
import HomeMenu from '@/components/HomeMenu.vue';
import Panel from '@/components/Panel.vue';
import TaskPanel from '@/components/TaskPanel.vue';
</script>

<script>
import useSession from '@/stores/session';
import useApp from '@/stores/app';

export default {
	data: () => ({
		session: useSession(),
		app: useApp(),
		openPanel: true
	})
}
</script>