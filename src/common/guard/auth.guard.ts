import {Reflector} from "@nestjs/core";
import {AuthGuard} from '@nestjs/passport';
import { CanActivate,ForbiddenException, ExecutionContext, Inject,Injectable,UnauthorizedException} from '@nestjs/common';
import { UserService } from "../../modules/user/user.service"
import { Observable } from 'rxjs';
import {ALLOW_ANON} from '../../common/decorator/allow-anon.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector, @Inject(UserService) private readonly userService: UserService) {
    super();
  }

  async canActivate(ctx:ExecutionContext): Promise<boolean> {
    const allowAnon = this.reflector.getAllAndOverride<boolean>(ALLOW_ANON, [
      ctx.getHandler(),ctx.getClass()
    ])
    if(allowAnon) return true;
    const request = ctx.switchToHttp().getRequest();
    const accessToken = request.headers.authorization;
    if(!accessToken) throw new ForbiddenException('请先登录!');
    const UserId = this.userService.verifyToken(accessToken);
    if(!UserId) throw new UnauthorizedException('当前登录已过期，请重新登录!');
    return this.activate(ctx)
  }

   async activate(ctx:ExecutionContext): Promise<boolean> {
    return super.canActivate(ctx) as Promise<boolean>;
   }
}
