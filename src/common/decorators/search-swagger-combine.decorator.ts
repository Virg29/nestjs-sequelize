import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export const SearchCombine = function () {
	return applyDecorators(
		ApiQuery({
			name: 'fields',
			type: 'string',
			example: 'public_name;abbreviation_name',
			required: false,
		}),
		ApiQuery({
			name: 'search',
			type: 'string',
			example: 'Some search query string',
			required: false,
		}),
		ApiQuery({
			name: 'sort',
			type: 'string',
			schema: { default: 'desc', enum: ['desc', 'asc'] },
			required: false,
		}),
	);
};
