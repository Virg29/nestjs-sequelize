type StringFields<T> = {
	[K in keyof T]: T[K] extends string
		? K extends string
			? K
			: never
		: never;
}[keyof T];

export interface SearchQueryGeneral {
	fields: string[];
	query: string;
	sort: 'asc' | 'desc';
}
export interface SearchQueryTyped<T> extends SearchQueryGeneral {
	fields: StringFields<T>[];
}
