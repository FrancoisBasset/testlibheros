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
		reloadBoards() {
			fetch('http://localhost:3000/tasklists', {
				headers: {
					'Authorization': 'Bearer ' + this.session.user.access_token
				}
			})
				.then(res => res.json())
				.then(json => this.boards = json);
		},
		reloadTasks() {
			fetch('http://localhost:3000/tasklists/' + this.currentBoard.id + '/tasks', {
				headers: {
					'Authorization': 'Bearer ' + this.session.user.access_token
				}
			})
				.then(res => res.json())
				.then(json => this.tasks = json);
		},
		addBoard(name) {
			return fetch('http://localhost:3000/tasklists', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this.session.user.access_token
				},
				body: JSON.stringify({
					name: name
				})
			}).then(() => {
				this.reloadBoards();
			});
		},
		renameBoard(id, name) {
			return fetch('http://localhost:3000/tasklists/' + id, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this.session.user.access_token
				},
				body: JSON.stringify({
					name: name
				})
			})
		},
		deleteBoard(id) {
			return fetch('http://localhost:3000/tasklists/' + id, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this.session.user.access_token
				}
			}).then(() => {
				if (this.currentBoard && id === this.currentBoard.id) {
					this.currentBoard = null;
				}
			});
		},
		addTask(title, description, duedate) {
			return fetch('http://localhost:3000/tasklists/' + this.currentBoard.id + '/tasks', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this.session.user.access_token
				},
				body: JSON.stringify({
					title: title,
					description: description,
					creationDate: new Date(),
					duedate: duedate
				})
			})
		},
		updateTask(title, description, duedate, state) {
			return fetch('http://localhost:3000/tasklists/' + this.currentBoard.id + '/tasks/' + this.currentTask.id, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this.session.user.access_token
				},
				body: JSON.stringify({
					title: title,
					description: description,
					duedate: duedate,
					state: state
				})
			}).then(() => {
				this.reloadTasks();
			})
		},
		deleteTask() {
			return fetch('http://localhost:3000/tasklists/' + this.currentBoard.id + '/tasks/' + this.currentTask.id, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this.session.user.access_token
				}
			}).then(() => {
				this.reloadTasks();
				this.currentTask = null;
			})
		}
	}
});
