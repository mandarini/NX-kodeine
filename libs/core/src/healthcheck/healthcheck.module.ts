import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { CqrsEventStoreModule } from 'nestjs-geteventstore';

import { HealthController } from './health.controller';
import { KafkaHealthIndicator } from './providers/kafka';
import { MaintenanceHealthIndicator } from './providers/maintenance.health';
import { RedisHealthIndicator } from './providers/redis';

@Module({
  controllers: [HealthController],
  imports: [
    TerminusModule,
    ConfigModule,
    CqrsEventStoreModule.register({
      useFactory: (config: ConfigService) => ({
        credentials: {
          username: config.get('EVENTSTORE_CREDENTIALS_USERNAME'),
          password: config.get('EVENTSTORE_CREDENTIALS_PASSWORD'),
        },
        tcp: {
          host: config.get('EVENTSTORE_TCP_HOST'),
          port: +config.get('EVENTSTORE_TCP_PORT'),
        },
        http: {
          host: config.get('EVENTSTORE_HTTP_HOST'),
          port: +config.get('EVENTSTORE_HTTP_PORT'),
        },
        tcpConnectionName: config.get('APP_NAME'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    MaintenanceHealthIndicator,
    KafkaHealthIndicator,
    RedisHealthIndicator,
  ],
})
export class AppHealthCheckModule {}
