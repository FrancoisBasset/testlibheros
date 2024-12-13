import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table
} from 'sequelize-typescript';
import TaskList from 'src/tasklist/entities/tasklist.entity';

@Table
export default class Task extends Model<Task> {
	@Column
	title: string;

	@Column
	description: string;

	@Column
	creationdate: string;

	@Column
	duedate: string;

	@Column
	state: string;

	@ForeignKey(() => TaskList)
	@Column({
		type: DataType.INTEGER
	})
	tasklistId: number;

	@BelongsTo(() => TaskList)
	tasklist: TaskList;
}
