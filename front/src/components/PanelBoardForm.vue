<template>
	<div class="flex flex-col gap-4">
		<button class="m-1 mx-auto" @click="openNewBoard = !openNewBoard">
			<span v-if="openNewBoard">Annuler</span>
			<span v-else>Créer un tableau</span>
		</button>
		
		<div v-if="openNewBoard" class="flex flex-col">
			<text>Nom du tableau</text>
			<input type="text" v-model="newBoardName" />
			<text v-if="alreadyExists" class="text-red-500">Un tableau avec le même nom existe déjà !</text>
			<button class="mx-auto" :disabled="newBoardName.trim() === ''" @click="addBoard">Créer le tableau</button>
		</div>

		<text>Liste des tableaux :</text>
		<BoardButton v-for="board of app.boards" :key="board" :board="board" @boardDeleted="app.reloadBoards" />
	</div>
</template>

<script setup>
import BoardButton from './BoardButton.vue';
</script>

<script>
import useSession from '@/stores/session';
import useApp from '@/stores/app';

export default {
	data: () => ({
		session: useSession(),
		app: useApp(),
		openNewBoard: false,
		newBoardName: '',
		alreadyExists: false
	}),
	created() {
		this.app.reloadBoards();
	},
	methods: {
		addBoard() {
			this.alreadyExists = this.app.boards.find(b => b.name === this.newBoardName) !== undefined;
			if (this.alreadyExists) {
				return;
			}

			this.alreadyExists = false;

			this.app.addBoard(this.newBoardName).then(() => {
				this.newBoardName = '';
				this.openNewBoard = false;
			});
		}
	}
}
</script>
