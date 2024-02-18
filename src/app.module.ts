import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './users/user.module';
import config from './common/config/config';

@Module({
	imports: [
		AuthModule,
		UserModule,
		ConfigModule.forRoot({ isGlobal: true, load:[()=>config] }),
		DatabaseModule,
	],
})
export class AppModule {}
