import { Injectable } from '@nestjs/common';
import CreateTaskDto from './dto/create-task.dto';
import UpdateTaskDto from './dto/update-task.dto';
import Task from 'src/task/entities/task.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export default class TaskService {
	constructor(
		@InjectModel(Task)
		private readonly taskModel: typeof Task
	) {}

	create(createTaskDto: CreateTaskDto, id) {
		return this.taskModel.create({
			...createTaskDto,
			state: 'current',
			tasklistId: id
		});
	}

	findAll(tasklistId: number) {
		return this.taskModel.findAll({
			where: {
				tasklistId: tasklistId
			}
		});
	}

	findById(id: number) {
		return this.taskModel.findByPk(id);
	}

	update(id: number, updateTaskDto: UpdateTaskDto) {
		return this.taskModel.update(updateTaskDto, {
			where: {
				id: id
			}
		});
	}

	remove(id: number) {
		return this.taskModel.destroy({
			where: {
				id: id
			}
		});
	}
}
