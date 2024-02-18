import {
	HttpException,
	HttpStatus,
	Injectable,
	Logger,
	UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { type ISecurityConfig } from 'src/common/config/config.interface';

import { IUserPayload } from 'src/common/types/auth/interfaces';
import User from 'src/database/models/user.entity';
import { UsersService } from '../../users/user.service';
import { RegisterRequestDto, RegisterSafeRequestDto } from '../dto/register.request';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
	private readonly logger = new Logger(AuthService.name);
	private readonly config: ISecurityConfig;

	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
		private passwordService: PasswordService,
		private configService: ConfigService,
	) {
		this.config = this.configService.get<ISecurityConfig>('security');
	}

	async register(data: RegisterRequestDto) {
		const hashedPassword = await this.passwordService.hashPassword(
			data.password,
		);

		const preparedUser: RegisterSafeRequestDto = {
			name: data.name,
			phone: data.phone,
			email: data.email,
			hashedPassword,
		};
		return await this.usersService.createUser(preparedUser);
	}

	async signIn({email, phone, password}:{email?:string,phone?:string,password:string}) {
			if(email==null && phone==null)
				throw new HttpException("You must send at least one of your identity: phone number or email", HttpStatus.BAD_REQUEST)
			if (email != null && phone != null)
				throw new HttpException(
					'You must send single identity: phone number or email',
					HttpStatus.BAD_REQUEST,
				);

		try {
			let user: User;

			if(email!=null)
				user = await this.usersService.findOneByEmail(email)
			if(phone!=null)
				user = await this.usersService.findOneByPhone(email)

			if (user==null) 
				throw new UnauthorizedException('Incorrect credentials passed');

			const passwordIsValid = await this.passwordService.validatePassword(
				password,
				user.password,
			);

			if (!passwordIsValid) 
				throw new UnauthorizedException('Incorrect credentials passed');

			const payload: IUserPayload = {
				id: user.id,
				name: user.name,
				email: user.email,
				phone: user.phone,
			};

			const access_token = await this.jwtService.signAsync(payload, {
				secret: this.config.jwtSecret,
				expiresIn: this.config.expiresIn,
			});

			return {
				access_token,
				userInfo: payload,
			};
		} catch (error) {
			this.logger.error(
				`Failed method signIn: ${JSON.stringify({ error })}`,
			);
			throw error;
		}
	}
}
