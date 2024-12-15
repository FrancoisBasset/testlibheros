import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import TaskList from './entities/tasklist.entity';
import CreateTasklistDto from './dto/create-tasklist.dto';
import UpdateTasklistDto from './dto/update-tasklist.dto';
import Task from 'src/task/entities/task.entity';

@Injectable()
export default class TasklistService {
	constructor(
		@InjectModel(TaskList)
		private readonly tasklistModel: typeof TaskList
	) {}

	create(createTasklistDto: CreateTasklistDto, userId: number) {
		return this.tasklistModel.create({
			...createTasklistDto,
			userId: userId
		});
	}

	findAll(userId: number) {
		return this.tasklistModel.findAll({
			where: {
				userId: userId
			},
			include: [Task]
		});
	}

	findOne(userId: number, id: number) {
		return this.tasklistModel.findOne({
			where: {
				id: id,
				userId: userId
			},
			include: [Task]
		});
	}

	update(userId: number, id: number, updateTasklistDto: UpdateTasklistDto) {
		return this.tasklistModel.update(updateTasklistDto, {
			where: {
				id: id,
				userId: userId
			}
		});
	}

	remove(id: number) {
		return this.tasklistModel.destroy({
			where: {
				id: id
			}
		});
	}
}
