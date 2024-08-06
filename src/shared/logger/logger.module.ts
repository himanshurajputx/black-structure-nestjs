import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";

import { Logger } from './logger';
import { LoggerMiddleware } from './logger.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [Logger],
  exports: [Logger],
})
export class LoggerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
