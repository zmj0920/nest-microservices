import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { BUSINESS_ERROR_CODE } from '@app/common/exceptions/business.error.codes';
import { BusinessException } from '@app/common/exceptions/business.exception';
import { IS_PUBLIC_KEY } from '@app/common/utils/constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const loginAuth = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (loginAuth) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw (
        err ||
        new BusinessException({
          code: BUSINESS_ERROR_CODE.TOKEN_INVALID,
          message: 'token 已失效',
        })
      );
    }
    return user;
  }
}
