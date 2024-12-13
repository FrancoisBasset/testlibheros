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
import TaskService from './task.service';
import CreateTaskDto from './dto/create-task.dto';
import UpdateTaskDto from './dto/update-task.dto';
import AuthGuard from 'src/auth/auth.guard';

@Controller('tasklists/:tasklistId/tasks')
export default class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@UseGuards(AuthGuard)
	@Post()
	create(
		@Body() createTaskDto: CreateTaskDto,
		@Param('tasklistId') tasklistId: string
	) {
		return this.taskService.create(createTaskDto, tasklistId);
	}

	@UseGuards(AuthGuard)
	@Get()
	findAll(@Param('tasklistId') tasklistId: string) {
		return this.taskService.findAll(+tasklistId);
	}

	@UseGuards(AuthGuard)
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.taskService.findById(+id);
	}

	@UseGuards(AuthGuard)
	@Put(':id')
	update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
		return this.taskService.update(+id, updateTaskDto);
	}

	@UseGuards(AuthGuard)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.taskService.remove(+id);
	}
}
