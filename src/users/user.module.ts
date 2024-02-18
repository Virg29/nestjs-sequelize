import { Module } from '@nestjs/common';

import { UserProvider } from './user.provider';
import { UsersService } from './user.service';

@Module({
	providers: [
		UsersService,
		UserProvider,
	],
	exports: [UsersService],
	controllers: [],
	imports: [],
})
export class UserModule {}
