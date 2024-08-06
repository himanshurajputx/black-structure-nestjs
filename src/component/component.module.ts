import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserManagementModule } from './user-management/user-management.module';

@Module({
  imports: [
    HealthModule,
    AuthenticationModule,
    UserManagementModule,
  ],
})
export class ComponentModule {}
