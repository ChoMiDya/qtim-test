import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { ALLOW_ANONYMOUS_METADATA_KEY } from './allow-anonymous.decorator';

@Injectable()
export class AuthenticationGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const allowAnonymous =
      this.reflector.get<boolean | undefined>(
        ALLOW_ANONYMOUS_METADATA_KEY,
        context.getHandler(),
      ) ?? false;

    if (allowAnonymous) {
      return true;
    }

    return super.canActivate(context);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleRequest(err: Error, user: Record<string | number | symbol, any>) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}
