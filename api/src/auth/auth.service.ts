import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UserService from '../user/user.service';

@Injectable()
export default class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService
	) {}

	async signIn(
		username: string,
		pass: string
	): Promise<{ access_token: string }> {
		const user = await this.userService.findOne(username);

		if (user?.password !== pass) {
			throw new UnauthorizedException();
		}
		const payload = { id: user.id, username: user.username };

		return {
			access_token: await this.jwtService.signAsync(payload, {
				secret: 'secret',
				expiresIn: '10m'
			})
		};
	}
}
