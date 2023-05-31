import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';

import { isNullish } from '../utils';
import { KafkaHealthIndicator } from './providers/kafka';
import { MaintenanceHealthIndicator } from './providers/maintenance.health';
import { RedisHealthIndicator } from './providers/redis';

@Controller('/.well-known/health')
export class HealthController {
  constructor(
    private readonly config: ConfigService,
    private readonly health: HealthCheckService,
    private readonly maintenanceCheck: MaintenanceHealthIndicator,
    private readonly kafkaIndicator: KafkaHealthIndicator,
    private readonly redisIndicator: RedisHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  healthCheck() {
    const checks = [];

    if (!isNullish(this.config.get('REDIS_HOST'))) {
      checks.push(...[async () => this.redisIndicator.check()]);
    }

    if (!isNullish(this.config.get('KAFKA_BROKERS'))) {
      checks.push(...[async () => this.kafkaIndicator.check()]);
    }

    return this.health.check([
      ...checks,
      async () =>
        this.maintenanceCheck.isMaintenanceModeActivated('maintenanceCheck'),
    ]);
  }
}
