import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context).getContext();
        if(!ctx.headers.authorization) throw new UnauthorizedException('Please log in to have access.');
        ctx.user = await this.validateToken(ctx.headers.authorization);
        return true;
    }

    async validateToken(auth: string) {
        if (auth.split(' ')[0] !== 'Bearer') throw new UnauthorizedException('Invalid token');
        const token = auth.split(' ')[1];
        try {
            const decoded = await jwt.verify(token, 'banking-api-backend-project');
            return decoded;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}