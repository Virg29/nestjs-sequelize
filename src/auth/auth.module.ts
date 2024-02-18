import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../users/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { PasswordService } from './services/password.service';

@Module({
	imports: [
		UserModule,
		JwtModule.register({
			global: true,
		}),
		ConfigModule,
	],
	providers: [
		AuthService,
		PasswordService,
	],
	controllers: [AuthController],
	exports: [AuthService, PasswordService],
})
export class AuthModule {}
