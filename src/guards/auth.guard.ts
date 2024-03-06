import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { jwtConstants } from "src/auth/constants";

//Auth Guard
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        //get the request object from the context
        const request = context.switchToHttp().getRequest();
        //extract the token from the request header
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            //if there is no token, throw an unauthorized exception
            throw new UnauthorizedException();
        }
        try {
            //get the payload from the token
            const payload = await this.jwtService.verifyAsync(token, { secret: jwtConstants.secret });
            //attach the payload to the request object
            request['user'] = payload;
        } catch (error) {
            //if the token is invalid, throw an unauthorized exception
            throw new UnauthorizedException();
        }
        // if the token is valid, return true
        return true;
    }
    // Extracts the token from the request header
    private extractTokenFromHeader(request: Request): string | undefined {
        //get the authorization header from the request
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        //if the type is Bearer, return the token
        return type === 'Bearer' ? token : undefined;
    }
}