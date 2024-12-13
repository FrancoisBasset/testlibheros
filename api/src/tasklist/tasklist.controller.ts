import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	UseGuards,
	Req,
	Put
} from '@nestjs/common';
import TasklistService from './tasklist.service';
import CreateTasklistDto from './dto/create-tasklist.dto';
import UpdateTasklistDto from './dto/update-tasklist.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { TasklistGuard } from './tasklist.guard';

@Controller('tasklists')
export default class TasklistController {
	constructor(private readonly tasklistService: TasklistService) {}

	@UseGuards(AuthGuard)
	@Post()
	create(
		@Req() request: Request,
		@Body() createTasklistDto: CreateTasklistDto
	) {
		return this.tasklistService.create(
			createTasklistDto,
			request['userId']
		);
	}

	@UseGuards(AuthGuard)
	@Get()
	findAll(@Req() request: Request) {
		return this.tasklistService.findAll(request['userId']);
	}

	@UseGuards(AuthGuard, TasklistGuard)
	@Get(':id')
	async findOne(@Req() request: Request, @Param('id') id: string) {
		return request['tasklist'];
	}

	@UseGuards(AuthGuard, TasklistGuard)
	@Put(':id')
	async update(
		@Req() request: Request,
		@Param('id') id: string,
		@Body() updateTasklistDto: UpdateTasklistDto
	) {
		this.tasklistService.update(request['userId'], +id, updateTasklistDto);
	}
	
	@UseGuards(AuthGuard, TasklistGuard)
	@Delete(':id')
	async remove(@Req() request: Request, @Param('id') id: string) {
		return this.tasklistService.remove(+id);
	}
}
