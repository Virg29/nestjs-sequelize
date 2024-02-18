import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { IUserPayload } from '../types/auth/interfaces';

export const GetUser = createParamDecorator(
	(data, ctx: ExecutionContext): IUserPayload => {
		const req = ctx.switchToHttp().getRequest();
		return req.user;
	},
);
