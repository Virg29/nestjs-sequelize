import {
	BadRequestException,
	createParamDecorator,
	ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';
import { PaginationQuery } from '../types/pagination/interfaces';

export const PaginationParams = createParamDecorator(
	(data, ctx: ExecutionContext): PaginationQuery => {
		const req: Request = ctx.switchToHttp().getRequest();
		const page =
			req.query.page != null ? parseInt(req.query.page as string) : 0;
		const pageSize =
			req.query.pageSize != null
				? parseInt(req.query.pageSize as string)
				: 20;

		// check if page and size are valid
		if (isNaN(page) || pageSize < 0) {
			throw new BadRequestException(
				'Invalid pagination params: Page not a number or less than 0',
			);
		}
		// do not allow to fetch large slices of the dataset
		if (isNaN(pageSize) || pageSize > 20 || pageSize < 1) {
			throw new BadRequestException(
				'Invalid pagination params: Page size not a number or greater than 20 or less than 1',
			);
		}

		// calculate pagination parameters
		return {
			page,
			pageSize,
		};
	},
);
