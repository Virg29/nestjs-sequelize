// src/main.ts

import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type {
	ICorsConfig,
	INestConfig,
	ISwaggerConfig,
} from 'src/common/config/config.interface';

import { AppModule } from './app.module';
async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	// Validation
	app.useGlobalPipes(
		new ValidationPipe({ transform: true, whitelist: true }),
	);

	const configService = app.get(ConfigService);
	const nestConfig = configService.get<INestConfig>('nest');
	const corsConfig = configService.get<ICorsConfig>('cors');
	const swaggerConfig = configService.get<ISwaggerConfig>('swagger');

	// Swagger Api
	if (swaggerConfig.enabled) {
		const options = new DocumentBuilder()
			.setTitle(swaggerConfig.title || 'Nestjs')
			.setDescription(
				swaggerConfig.description || 'The nestjs API description',
			)
			.addBearerAuth()
			.setVersion(swaggerConfig.version || '1.0')
			.build();
		const document = SwaggerModule.createDocument(app, options);

		SwaggerModule.setup(swaggerConfig.path || 'api', app, document);
	}

	// Cors
	if (corsConfig.enabled) {
		app.enableCors(corsConfig.config);
	}

	await app.listen(nestConfig.port ?? 3000);
}
bootstrap();
