import { AllowNull, Column, DataType, Default, IsEmail, Model, Table, Unique } from "sequelize-typescript";


@Table({ timestamps: false })
export default class User extends Model {
	@Column({
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4,
		primaryKey: true,
	})
	id: string;

	@Column(DataType.CHAR)
	name: string;

	@Unique
	@IsEmail
	@Column
	email?: string;

	@AllowNull
	@Unique
	@Default(null)
	@Column(DataType.CHAR)
	phone?: string;

	@Column
	password: string;
}