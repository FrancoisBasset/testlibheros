import { Module } from '@nestjs/common';
import TaskService from './task.service';
import TaskController from './task.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import Task from './entities/task.entity';

@Module({
	imports: [SequelizeModule.forFeature([Task])],
	controllers: [TaskController],
	providers: [TaskService],
	exports: [TaskService]
})
export default class TaskModule {}
