import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";


class BaseRegisterDto {
	@ApiProperty({ required: false })
	@IsString()
	@IsNotEmpty()
	name?: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email?: string;

	@ApiProperty({ required: false })
	@IsString()
	@IsNotEmpty()
	@IsPhoneNumber()
	phone?: string;
}
export class RegisterRequestDto extends BaseRegisterDto {
	@ApiProperty({ required: true })
	@IsString()
	@IsNotEmpty()
	password: string;
}

export class RegisterSafeRequestDto extends BaseRegisterDto {
	@ApiProperty({ required: true })
	@IsString()
	@IsNotEmpty()
	hashedPassword: string;
}