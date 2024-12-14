import { defineStore } from 'pinia';

export default defineStore('app', {
	state: () => ({
		currentBoard: null,
		currentTask: null,
		boards: [],
		tasks: []
	}),
	actions: {
		
	}
});
