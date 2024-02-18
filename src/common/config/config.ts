import type { IConfig } from './config.interface';

export default {
	nest: {
		port: 3000,
	},
	cors: {
		enabled: true,
		config: {
			origin: '127.0.0.1:3000', // process.env.APP_CORS etc
		},
	},
	swagger: {
		enabled: true,
		title: 'Api',
		description: 'API description',
		version: '0.1',
		path: 'api',
	},
	security: {
		jwtSecret: 'wowThisManIsAmazing',
		expiresIn: '1d',
		bcryptSaltOrRound: 10,
	},
	database: {
		development: {
			database: 'postgres',
			dialect: 'postgres',
			host: '127.0.0.1',
			password: 'password',
			port: '5432',
			username: 'postgres',
		},
		production: {
			database: 'postgres',
			dialect: 'postgres',
			host: '127.0.0.1',
			password: 'password',
			port: '5432',
			username: 'postgres',
		},
		test: {
			database: 'postgres',
			dialect: 'postgres',
			host: '127.0.0.1',
			password: 'password',
			port: '5432',
			username: 'postgres',
		},
	},
} as IConfig;

