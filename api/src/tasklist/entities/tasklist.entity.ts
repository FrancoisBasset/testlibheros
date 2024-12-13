import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Table
} from 'sequelize-typescript';
import Task from 'src/task/entities/task.entity';
import User from 'src/user/entities/user.entity';

@Table
export default class TaskList extends Model<TaskList> {
	@Column
	name: string;

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER
	})
	userId: number;

	@BelongsTo(() => User)
	user: User;

	@HasMany(() => Task)
	tasks: Task[];
}
