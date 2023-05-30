import { AppHealthCheckModule, CoreModule } from '@beyondclicksai/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configSchema, configuration } from './config';

@Module({
  imports: [
    CoreModule,
    ConfigModule.forRoot({
      envFilePath: `./.env.${process.env.NODE_ENV || 'local'}`,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      validationSchema: configSchema,
      load: [configuration],
      isGlobal: true,
    }),
    MikroOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('ormConfig'),
    }),
    AppHealthCheckModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
