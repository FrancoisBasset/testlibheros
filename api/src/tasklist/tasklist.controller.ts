import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Req
} from '@nestjs/common';
import TasklistService from './tasklist.service';
import CreateTasklistDto from './dto/create-tasklist.dto';
import UpdateTasklistDto from './dto/update-tasklist.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('tasklist')
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
			request['user'].sub
		);
	}

	@Get()
	findAll() {
		return this.tasklistService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.tasklistService.findOne(+id);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateTasklistDto: UpdateTasklistDto
	) {
		return this.tasklistService.update(+id, updateTasklistDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.tasklistService.remove(+id);
	}
}
