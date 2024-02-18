import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Request,
	UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { EmailSignInRequestDto, PhoneSignInRequestDto } from './dto/sign-in.request';
import { RegisterRequestDto } from './dto/register.request';
import { GetUser } from 'src/common/decorators/get-user.decoratos';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@ApiOperation({
		summary: 'Use this to register a new User with provided credentials',
	})
	@HttpCode(HttpStatus.CREATED)
	@Post('/register')
	async registerUser(@Body() data: RegisterRequestDto) {
		return await this.authService.register(data);
	}

	@ApiOperation({
		summary:
			'Use this to login with email and get a response with jwt token',
	})
	@HttpCode(HttpStatus.OK)
	@Post('/login/email')
	async signInEmail(@Body() data: EmailSignInRequestDto) {
		return await this.authService.signIn(data);
	}

	@ApiOperation({
		summary:
			'Use this to login with phone number and get a response with jwt token',
	})
	@HttpCode(HttpStatus.OK)
	@Post('/login/phone')
	async signInPhone(@Body() data: PhoneSignInRequestDto) {
		return await this.authService.signIn(data);
	}

	@ApiOperation({
		summary: 'Use this to get who you are',
	})
	@ApiBearerAuth()
	@UseGuards(AuthGuard)
	@HttpCode(HttpStatus.OK)
	@Get('/whoami')
	async whoami(@GetUser() user) {
		return user;
	}
}
