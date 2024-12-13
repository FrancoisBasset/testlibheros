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

	findAll() {
		return `This action returns all tasklist`;
	}

	findOne(id: number) {
		return `This action returns a #${id} tasklist`;
	}

	update(id: number, updateTasklistDto: UpdateTasklistDto) {
		return `This action updates a #${id} tasklist`;
	}

	remove(id: number) {
		return `This action removes a #${id} tasklist`;
	}
}
