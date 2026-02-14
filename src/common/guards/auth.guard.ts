import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private jwtService:JwtService){}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const host = context.switchToHttp()
        const req = host.getRequest()

        let token = req.headers.authorization

        if(!token) throw new UnauthorizedException()
        
        token = req.headers.authorization.split(" ")[1]

        const user = await this.jwtService.verify(token)

        req["user"] = user;
        return true
    }
}