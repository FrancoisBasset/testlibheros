import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import AuthModule from './auth/auth.module';
import UserModule from './user/user.module';
import TasklistModule from './tasklist/tasklist.module';
import TaskModule from './task/task.module';
import User from './user/entities/user.entity';
import TaskList from './tasklist/entities/tasklist.entity';
import Task from './task/entities/task.entity';

@Module({
	imports: [
		AuthModule,
		UserModule,
		TasklistModule,
		TaskModule,
		SequelizeModule.forRoot({
			dialect: 'sqlite',
			storage: './db.sqlite',
			models: [User, TaskList, Task],
			autoLoadModels: true
		})
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
