import {
	CanActivate,
	ExecutionContext,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import { Request } from 'express';
import TasklistService from '../tasklist/tasklist.service';
import TaskService from './task.service';

@Injectable()
export default class TaskGuard implements CanActivate {
	constructor(private readonly tasklistService: TasklistService, private readonly taskService: TaskService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request: Request = context.switchToHttp().getRequest();

		const tasklist = await this.tasklistService.findOne(
			parseInt(request['userId']),
			parseInt(request.params.tasklistId)
		);

		let task = null;
		if (request.params.id) {
			task = await this.taskService.findById(
				parseInt(request.params.id)
			);
		}
		
		if (tasklist === null || (request.params.id && task === null)) {
			throw new NotFoundException();
		}

		return true;
	}
}
