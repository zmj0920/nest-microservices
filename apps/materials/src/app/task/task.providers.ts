import { Task } from './task.mysql.entity';

export const TaskProviders = [
  {
    provide: 'TASK_REPOSITORY',
    useFactory: async (AppDataSource) =>
      await AppDataSource.getRepository(Task),
    inject: ['MYSQL_DATA_SOURCE'],
  },
];
