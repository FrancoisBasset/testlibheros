import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import TaskList from './entities/tasklist.entity';
import CreateTasklistDto from './dto/create-tasklist.dto';
import UpdateTasklistDto from './dto/update-tasklist.dto';

@Injectable()
export default class TasklistService {
	constructor(
		@InjectModel(TaskList)
		private tasklistModel: typeof TaskList
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
			}
		});
	}

	findOne(userId: number, id: number) {
		return this.tasklistModel.findOne({
			where: {
				id: id,
				userId: userId
			}
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
