<template>
	<div class="flex flex-row">
		<div v-if="!editMode">
			<button class="mx-1" @click="() => {
				this.app.currentBoard = board;
				this.app.reloadTasks();
			}">{{ board.name }}</button>
		</div>
		<div v-else class="flex flex-row">
			<input type="text" v-model="newName" />
			<button @click="renameBoard">OK</button>
		</div>

		<div v-if="!editMode">
			<EditButton @click="editMode = true" />
			<DeleteButton @click="showDeleteDialog = true" />
		</div>

		<Dialog v-if="showDeleteDialog" @close="showDeleteDialog = false">
			<text>Êtes-vous sûr de vouloir supprimer cette liste de tâches ?</text>

			<div class="flex flex-row mx-auto gap-4">
				<button @click="showDeleteDialog = false">Non</button>
				<button class="bg-red-500" @click="deleteBoard(board)">Oui</button>
			</div>
			<br>
		</Dialog>
	</div>
</template>

<script setup>
import EditButton from './EditButton.vue';
import DeleteButton from './DeleteButton.vue';
import Dialog from './Dialog.vue';
</script>

<script>
import useSession from '@/stores/session';
import useApp from '@/stores/app';

export default {
	props: ['board'],
	data: () => ({
		session: useSession(),
		app: useApp(),
		editMode: false,
		newName: '',

		showDeleteDialog: false
	}),
	created() {
		this.newName = this.board.name;
	},
	methods: {
		renameBoard() {
			this.app.renameBoard(this.board.id, this.newName).then(() => {
				this.editMode = false;
				this.board.name = this.newName;
			});
		},
		deleteBoard() {
			this.app.deleteBoard(this.board.id).then(() => {
				this.$emit('boardDeleted');
			});
		}
	}
};
</script>
