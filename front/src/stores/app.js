import { defineStore } from 'pinia';

import useSession from '@/stores/session';

export default defineStore('app', {
	state: () => ({
		currentBoard: null,
		currentTask: null,
		boards: [],
		tasks: [],

		session: useSession()
	}),
	actions: {
		getHeaders() {
			return {
				'Authorization': 'Bearer ' + this.session.user.access_token,
				'Content-Type': 'application/json'
			};
		},
		logoutIf401(res) {
			if (res.status === 401) {
				this.session.logout();
				return Promise.reject();
			}

			return res;
		},
		reloadBoards() {
			fetch('http://localhost:3000/tasklists', {
				headers: this.getHeaders()
			})
				.then(res => this.logoutIf401(res))
				.then(res => res.json())
				.then(json => this.boards = json);
		},
		reloadTasks() {
			fetch('http://localhost:3000/tasklists/' + this.currentBoard.id + '/tasks', {
				headers: this.getHeaders()
			})
				.then(res => this.logoutIf401(res))
				.then(res => res.json())
				.then(json => this.tasks = json);
		},
		addBoard(name) {
			return fetch('http://localhost:3000/tasklists', {
				method: 'POST',
				headers: this.getHeaders(),
				body: JSON.stringify({
					name: name
				})
			})
				.then(res => this.logoutIf401(res))
				.then(() => this.reloadBoards());
		},
		renameBoard(id, name) {
			return fetch('http://localhost:3000/tasklists/' + id, {
				method: 'PUT',
				headers: this.getHeaders(),
				body: JSON.stringify({
					name: name
				})
			})
				.then(res => this.logoutIf401(res))
		},
		deleteBoard(id) {
			return fetch('http://localhost:3000/tasklists/' + id, {
				method: 'DELETE',
				headers: this.getHeaders()
			})
				.then(res => this.logoutIf401(res))
				.then(() => {
					if (this.currentBoard && id === this.currentBoard.id) {
						this.currentBoard = null;
					}
				});
		},
		addTask(title, description, dueDate) {
			return fetch('http://localhost:3000/tasklists/' + this.currentBoard.id + '/tasks', {
				method: 'POST',
				headers: this.getHeaders(),
				body: JSON.stringify({
					title: title,
					description: description,
					creationDate: new Date(),
					dueDate: dueDate
				})
			})
				.then(res => this.logoutIf401(res));
		},
		updateTask(title, description, dueDate, state) {
			return fetch('http://localhost:3000/tasklists/' + this.currentBoard.id + '/tasks/' + this.currentTask.id, {
				method: 'PUT',
				headers: this.getHeaders(),
				body: JSON.stringify({
					title: title,
					description: description,
					dueDate: dueDate,
					state: state
				})
			})
				.then(res => this.logoutIf401(res))
				.then(() => {
					this.reloadTasks();
				});
		},
		deleteTask() {
			return fetch('http://localhost:3000/tasklists/' + this.currentBoard.id + '/tasks/' + this.currentTask.id, {
				method: 'DELETE',
				headers: this.getHeaders()
			})
				.then(res => this.logoutIf401(res))
				.then(() => {
					this.reloadTasks();
					this.currentTask = null;
				});
		}
	}
});
