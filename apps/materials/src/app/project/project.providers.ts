import { Project } from './project.mysql.entity';

export const projectProviders = [
  {
    provide: 'PROJECT_REPOSITORY',
    useFactory: async (AppDataSource) =>
      await AppDataSource.getRepository(Project),
    inject: ['MYSQL_DATA_SOURCE'],
  },
];
