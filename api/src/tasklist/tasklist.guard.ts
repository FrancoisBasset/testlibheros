import {
	CanActivate,
	ExecutionContext,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import { Request } from 'express';
import TasklistService from './tasklist.service';

@Injectable()
export default class TasklistGuard implements CanActivate {
	constructor(private readonly tasklistService: TasklistService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request: Request = context.switchToHttp().getRequest();

		const tasklist = await this.tasklistService.findOne(
			parseInt(request['userId']),
			parseInt(request.params.id)
		);
		if (tasklist === null) {
			throw new NotFoundException();
		}

		request['tasklist'] = tasklist;

		return true;
	}
}
