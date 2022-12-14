import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
  secret: 'yx-yyds', // 秘钥，不对外公开。
  expiresIn: '300s', // 时效时长
  ignoreExpiration: false, // 是否忽略 token 时效
};

export const IS_PUBLIC_KEY = 'isPublic';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const MAX_PAGE_SIZE = 100;

export const BCRYPT_SIZE = 10;

export const defaultPaginationParams: PaginationParams = {
  currentPage: 1,
  pageSize: 10,
};
