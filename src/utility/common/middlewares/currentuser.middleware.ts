import { Injectable, NestMiddleware} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';


import { UsersService } from 'src/users/users.service';

declare global{
    namespace Express{
        interface Request{
            currentUser?:User;
        }
    }
  }
  
interface JwtPayload {
  email: string;
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(
    private configService: ConfigService,
    private readonly usersService: UsersService
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || Array.isArray(authHeader) || !authHeader.startsWith('Bearer ')) {
      req['currentUser'] = null;
      return next();
    }
    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, this.configService.get<string>('JWT_SECRET')) as JwtPayload;
    const currentUser = await this.usersService.findOne(undefined, payload.email);
    req['currentUser'] = currentUser;
    next();
  }
}
