import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export interface IConfig {
	nest: INestConfig;
	cors: ICorsConfig;
	swagger: ISwaggerConfig;
	security: ISecurityConfig;
	database: IDatabaseConfig;
}

export interface INestConfig {
	port: number;
}

export interface ICorsConfig {
	enabled: boolean;
	config: CorsOptions;
}

export interface ISwaggerConfig {
	enabled: boolean;
	title: string;
	description: string;
	version: string;
	path: string;
}

export interface ISecurityConfig {
	jwtSecret: string;
	expiresIn: string;
	bcryptSaltOrRound: string | number;
}

export interface IDatabaseConfigAttributes {
	username?: string;
	password?: string;
	database?: string;
	host?: string;
	port?: number | string;
	dialect?: string;
	urlDatabase?: string;
}

export interface IDatabaseConfig {
	development: IDatabaseConfigAttributes;
	test: IDatabaseConfigAttributes;
	production: IDatabaseConfigAttributes;
}