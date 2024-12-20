import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import AuthService from './auth.service';

@Controller('auth')
export default class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(HttpStatus.OK)
	@Post()
	signIn(@Body() signInDto: Record<string, any>) {
		return this.authService.signIn(signInDto.username, signInDto.password);
	}
}
