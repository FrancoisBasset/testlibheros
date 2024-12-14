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
			<DeleteButton @click="deleteBoard(board)" />
		</div>
	</div>
</template>

<script setup>
import EditButton from './EditButton.vue';
import DeleteButton from './DeleteButton.vue';
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
		newName: ''
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
