import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import AuthModule from './auth/auth.module';
import UserModule from './user/user.module';
import TasklistModule from './tasklist/tasklist.module';
import User from './user/entities/user.entity';
import TaskList from './tasklist/entities/tasklist.entity';

@Module({
	imports: [
		AuthModule,
		UserModule,
		TasklistModule,
		SequelizeModule.forRoot({
			dialect: 'sqlite',
			storage: './db.sqlite',
			models: [User, TaskList],
			autoLoadModels: true
		})
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
