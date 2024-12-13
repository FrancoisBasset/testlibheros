import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	UseGuards,
	Req,
	Put,
	NotFoundException
} from '@nestjs/common';
import TasklistService from './tasklist.service';
import CreateTasklistDto from './dto/create-tasklist.dto';
import UpdateTasklistDto from './dto/update-tasklist.dto';
import { AuthGuard } from 'src/auth/auth.guard';

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

	@UseGuards(AuthGuard)
	@Get(':id')
	async findOne(@Req() request: Request, @Param('id') id: string) {
		const tasklist = await this.tasklistService.findOne(request['userId'], +id);
		if (!tasklist) {
			throw new NotFoundException();
		}

		return tasklist;
	}

	@UseGuards(AuthGuard)
	@Put(':id')
	async update(
		@Req() request: Request,
		@Param('id') id: string,
		@Body() updateTasklistDto: UpdateTasklistDto
	) {
		const tasklist = await this.tasklistService.findOne(request['userId'], +id);
		if (tasklist === null) {
			throw new NotFoundException();
		}

		this.tasklistService.update(request['userId'], +id, updateTasklistDto);
	}
	
	@UseGuards(AuthGuard)
	@Delete(':id')
	async remove(@Req() request: Request, @Param('id') id: string) {
		const tasklist = await this.tasklistService.findOne(request['userId'], +id);
		if (tasklist === null) {
			throw new NotFoundException();
		}

		return this.tasklistService.remove(+id);
	}
}
