import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import Tasklist from './entities/tasklist.entity';
import TasklistService from './tasklist.service';
import TasklistController from './tasklist.controller';

@Module({
	imports: [SequelizeModule.forFeature([Tasklist])],
	controllers: [TasklistController],
	providers: [TasklistService],
	exports: [TasklistService]
})
export default class TasklistModule {}
