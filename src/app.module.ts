import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ComponentModule } from './component/component.module';
import { CustomLoggerService, DatabaseModule, HttpLoggerMiddleware } from './shared';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    DatabaseModule,
    ComponentModule,
  ],
  controllers: [],
  providers: [CustomLoggerService],
  exports: [CustomLoggerService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}