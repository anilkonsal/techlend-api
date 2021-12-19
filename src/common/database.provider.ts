import pg from 'pg';
import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { Applicant } from '../applicant/entities/applicant.entity';

const SEQUELIZE = 'SEQUELIZE';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const { dialect, host, username, password, database, port } = {
        dialect: configService.get('database.dialect'),
        host: configService.get('database.host'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        port: configService.get('database.port'),
      };
      const sequelize = await init({
        dialect,
        host,
        username,
        password,
        database,
        port,
        dialectModule: pg,
      });
      return sequelize;
    },
  },
];

export const init = async ({
  dialect,
  host,
  username,
  password,
  database,
  port,
  dialectModule,
}) => {
  const options = {
    dialect,
    dialectModule,
    host,
    username,
    password,
    database,
    port,
  };

  if (!dialectModule) delete options.dialectModule;

  const sequelize = new Sequelize(options);
  sequelize.addModels([Applicant]);
  try {
    await sequelize.sync({});
  } catch (e) {
    throw new Error(e.message);
  }
  return sequelize;
};
