import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class EmailSignInRequestDto {
	@ApiProperty({ required: true })
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@ApiProperty({ required: true })
	@IsString()
	@IsNotEmpty()
	password: string;
}

export class PhoneSignInRequestDto {
	@ApiProperty({ required: true })
	@IsString()
	@IsNotEmpty()
	@IsPhoneNumber()
	phone: string;

	@ApiProperty({ required: true })
	@IsString()
	@IsNotEmpty()
	password: string;
}
