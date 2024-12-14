import { defineStore } from 'pinia';

export default defineStore('board', {
	state: () => ({
		currentBoard: null,
		currentTask: null
	})
});
