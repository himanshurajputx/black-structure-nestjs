import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { RequestHandler } from '../../shared';

@Module({
  controllers: [HealthController],
  providers: [RequestHandler],
})
export class HealthModule {}
