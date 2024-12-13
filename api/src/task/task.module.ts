import { Module } from '@nestjs/common';
import TaskService from './task.service';
import TaskController from './task.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import Task from './entities/task.entity';
import TasklistModule from 'src/tasklist/tasklist.module';

@Module({
	imports: [SequelizeModule.forFeature([Task]), TasklistModule],
	controllers: [TaskController],
	providers: [TaskService],
	exports: [TaskService]
})
export default class TaskModule {}
