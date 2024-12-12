import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import UserModule from './user/user.module';
import User from './user/entities/user.entity';

@Module({
	imports: [
		UserModule,
		SequelizeModule.forRoot({
			dialect: 'sqlite',
			storage: './db.sqlite',
			models: [User],
			autoLoadModels: true
		})
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
