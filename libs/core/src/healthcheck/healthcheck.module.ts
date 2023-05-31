import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';

import { HealthController } from './health.controller';
import { KafkaHealthIndicator } from './providers/kafka';
import { MaintenanceHealthIndicator } from './providers/maintenance.health';
import { RedisHealthIndicator } from './providers/redis';

@Module({
  controllers: [HealthController],
  imports: [TerminusModule, ConfigModule],
  providers: [
    MaintenanceHealthIndicator,
    KafkaHealthIndicator,
    RedisHealthIndicator,
  ],
})
export class AppHealthCheckModule {}
