import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import config from 'src/common/config/config';
import { IDatabaseConfigAttributes } from 'src/common/config/config.interface';

export const databaseProviders = [
	{
		provide: 'SEQUELIZE',
		useFactory: async () => {
			let databaseConfig: IDatabaseConfigAttributes
			switch (process.env.NODE_ENV){
				case "production":
					databaseConfig = config.database.production
					break;
				case "test":
					databaseConfig = config.database.production
					break;
				case "development":
					databaseConfig = config.database.production
					break;

			}

			const sequelize = new Sequelize({
				...(databaseConfig as SequelizeOptions),
				models:[
					__dirname+"/models"
				],
			});
			await sequelize.sync();
			return sequelize;
		},
	},
];
