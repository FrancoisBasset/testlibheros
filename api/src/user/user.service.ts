import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import User from './entities/user.entity';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';

@Injectable()
export default class UserService {
	constructor(
		@InjectModel(User)
		private userModel: typeof User
	) {}

	create(createUserDto: CreateUserDto) {
		this.userModel.create(createUserDto);
	}

	/*findAll() {
		return `This action returns all user`;
	}*/

	findOne(username: string): Promise<User | undefined> {
		return this.userModel.findOne({
			where: {
				username: username
			}
		});
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
