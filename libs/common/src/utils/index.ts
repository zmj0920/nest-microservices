import { parse } from 'yaml';

import * as path from 'path';
import * as fs from 'fs';
import { IPaginationOptions, IPaginationMeta } from 'nestjs-typeorm-paginate';
import { defaultPaginationParams, MAX_PAGE_SIZE } from './constants';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// 获取项目运行环境
export const getEnv = () => {
  return process.env.RUNNING_ENV;
};

// 读取项目配置
export const getConfig = (type?: string) => {
  const environment = getEnv();
  const yamlPath = path.join(process.cwd(), `./.config/${environment}.yaml`);
  const file = fs.readFileSync(yamlPath, 'utf8');
  const config = parse(file);
  if (type) {
    return config[type];
  }
  return config;
};

export class CustomPaginationMeta {
  constructor(
    public readonly pageSize: number,
    public readonly totalCounts: number,
    public readonly totalPages: number,
    public readonly currentPage: number,
  ) {}
}

export const getPaginationOptions = (
  page: PaginationParams = {
    currentPage: defaultPaginationParams.currentPage,
    pageSize: defaultPaginationParams.pageSize,
  },
) => {
  const limit = page.pageSize > MAX_PAGE_SIZE ? MAX_PAGE_SIZE : page.pageSize;

  const options: IPaginationOptions<CustomPaginationMeta> = {
    page: page.currentPage,
    limit,
    metaTransformer: (meta: IPaginationMeta): CustomPaginationMeta => {
      return new CustomPaginationMeta(
        meta.itemCount,
        meta.totalItems,
        meta.totalPages,
        meta.currentPage,
      );
    },
  };
  return options;
};

export const PayloadUser = createParamDecorator(
  (data, ctx: ExecutionContext): Payload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export const tree = (items, id = null, parent = 'parentId') => {
  return items
    .filter((item) => item[parent] === id)
    .map((item) => ({ ...item, children: tree(items, item.id) }));
};
