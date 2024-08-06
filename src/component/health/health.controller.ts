import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { RequestHandler } from '../../shared';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
@Controller('health')
export class HealthController {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly request: RequestHandler,
  ) {}

  @Get('')
  healthCheck(@Req() req: any, @Res() res: any) {
    if (this.connection.readyState === 1) {
      return this.request.success(req, res, {
        node_env: process.env.NODE_ENV,
        port: process.env.PORT,
        db: { status: 'up' },
      });
    } else {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ db: { status: 'down' } });
    }
  }
}
