import { Module } from '@nestjs/common';
import AuthController from './auth.controller';
import AuthService from './auth.service';
import UserModule from '../user/user.module';
import TaskListModule from '../tasklist/tasklist.module';
import { JwtService, JwtModule } from '@nestjs/jwt';

@Module({
	imports: [
		UserModule,
		TaskListModule,
		JwtModule.register({
			global: true,
			secret: 'secret',
			secretOrPrivateKey: 'secret',
			signOptions: { expiresIn: '60s' }
		})
	],
	controllers: [AuthController],
	providers: [AuthService, JwtService]
})
export default class AuthModule {}
