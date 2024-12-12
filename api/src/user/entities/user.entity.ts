import { Column, Model, Table } from 'sequelize-typescript';

@Table
export default class User extends Model<User> {
	@Column
	username: string;

	@Column
	password: string;

	@Column
	firstname: string;

	@Column
	lastname: string;

	@Column
	mailaddress: string;
}
