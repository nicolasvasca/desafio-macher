import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { TypeEnum } from "src/user/Enums/TypeEnum";

@Injectable()
export class UserCommonGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user.type === TypeEnum.COMUM) {
      return true;
    }
    return false;
  }
}
