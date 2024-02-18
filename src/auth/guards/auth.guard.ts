import {
	Injectable,
	UnauthorizedException,
	type CanActivate,
	type ExecutionContext,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { type Request } from 'express';
import { type ISecurityConfig } from 'src/common/config/config.interface';


@Injectable()
export class AuthGuard implements CanActivate {
	private readonly config: ISecurityConfig;

	constructor(
		private jwtService: JwtService,
		private configService: ConfigService,
	) {
		this.config = this.configService.get<ISecurityConfig>('security');
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);

		if (!token) {
			throw new UnauthorizedException();
		}

		try {
			const payload = await this.jwtService.verifyAsync(token, {
				secret: this.config.jwtSecret,
			});

			request['user'] = payload;
		} catch (e) {
			throw new UnauthorizedException();
		}
		return true;
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
}
