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
		<BoardButton v-for="board of boards" :key="board" :board="board" @boardDeleted="reloadBoards" />
	</div>
</template>

<script setup>
import BoardButton from './BoardButton.vue';
</script>

<script>
import useSession from '@/stores/session';

export default {
	data: () => ({
		session: useSession(),
		openNewBoard: false,
		boards: [],
		newBoardName: '',
		alreadyExists: false
	}),
	created() {
		this.reloadBoards();
	},
	methods: {
		reloadBoards() {
			fetch('http://localhost:3000/tasklists', {
				headers: {
					'Authorization': 'Bearer ' + this.session.user.access_token
				}
			})
				.then(res => res.json())
				.then(json => {
					this.boards = json;
				});
		},
		addBoard() {
			this.alreadyExists = this.boards.find(b => b.name === this.newBoardName) !== undefined;
			if (this.alreadyExists) {
				return;
			}

			this.alreadyExists = false;

			fetch('http://localhost:3000/tasklists', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this.session.user.access_token
				},
				body: JSON.stringify({
					name: this.newBoardName
				})
			})
				.then(() => {
					this.reloadBoards();
					this.newBoardName = '';
					this.openNewBoard = false;
				});
		}
	}
}
</script>
