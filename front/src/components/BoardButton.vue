<template>
	<div class="flex flex-row">
		<div v-if="!editMode">
			<button class="mx-1" @click="_board.currentBoard = board">{{ board.name }}</button>
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
import useBoard from '@/stores/board';
import useSession from '@/stores/session';

export default {
	props: ['board'],
	data: () => ({
		_board: useBoard(),
		session: useSession(),
		editMode: false,
		newName: ''
	}),
	created() {
		this.newName = this.board.name;
	},
	methods: {
		renameBoard() {
			fetch('http://localhost:3000/tasklists/' + this.board.id, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this.session.user.access_token
				},
				body: JSON.stringify({
					name: this.newName
				})
			}).then(() => {
				this.editMode = false;
				this.board.name = this.newName;
			});
		},
		deleteBoard() {
			fetch('http://localhost:3000/tasklists/' + this.board.id, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this.session.user.access_token
				}
			}).then(() => {
				this.$emit('boardDeleted');
			});
		}
	}
};
</script>
