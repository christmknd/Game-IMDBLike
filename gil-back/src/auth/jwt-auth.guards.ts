import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization;

    if (!token) {
      return false;
    }

    try {
      const decodedToken = this.jwtService.verify(token);
      request.user = decodedToken;
      return true;
    } catch (error) {
      return false;
    }
  }

}