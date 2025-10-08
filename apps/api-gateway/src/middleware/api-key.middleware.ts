import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';

// @Injectable()
// export class ApiKeyMiddleware implements NestMiddleware {
//   constructor(private configService: ConfigService) {} // inject config
//   use(req: Request, res: Response, next: NextFunction) {
//     const apiKey = req.header('x-api-key');
//     if (!apiKey || apiKey !== process.env.API_KEY) {
//       throw new UnauthorizedException('Invalid API Key');
//     }
//     next();
//   }
// }

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {} // inject config

  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.header('x-api-key');
    const expectedKey = this.configService.get<string>('API_KEY'); // use ConfigService

    // console.log('Received API_KEY:', apiKey); // debug log
    // console.log('Expected API_KEY:', expectedKey); // debug log

    if (!apiKey || apiKey !== expectedKey) {
      throw new UnauthorizedException('Invalid API Key');
    }
    next();
  }
}
