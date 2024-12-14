import { NonAttribute } from 'sequelize';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import TaskList from 'src/tasklist/entities/tasklist.entity';

@Table
export default class User extends Model<User> {
	@Column
	username: string;

	@Column
	password: string;

	@Column
	firstName: string;

	@Column
	lastName: string;

	@Column
	mailAddress: string;

	@HasMany(() => TaskList)
	tasklists: TaskList[];
}
