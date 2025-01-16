import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationtoken = request.headers?.authorization
      ? request.headers?.authorization.split(' ')[1]
      : undefined;
    try {
      const verifyToken = this.jwtService.verify(authorizationtoken);
      const paramId = Number(request.params.id);

      if (paramId && verifyToken['id'] !== paramId) {
        throw new Error();
      }

      request.userId = verifyToken['id'];

      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
