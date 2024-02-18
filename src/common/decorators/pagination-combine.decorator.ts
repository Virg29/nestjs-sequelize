import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export const PaginationCombine = function () {
	return applyDecorators(
		ApiQuery({ name: 'page', type: 'number', required: false }),
		ApiQuery({ name: 'pageSize', type: 'number', required: false }),
	);
};
