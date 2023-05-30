import { Injectable } from '@nestjs/common';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { REDIS_CACHE_MANAGER } from 'libs/core/src/cache';
import { promiseTimeout } from 'libs/core/src/utils';

@Injectable()
export class RedisHealthIndicator extends HealthIndicator {
  private prefix = 'redis';
  private connectTimeout = 500;

  async check(): Promise<HealthIndicatorResult> {
    try {
      const manager = REDIS_CACHE_MANAGER({
        connectTimeout: this.connectTimeout,
        lazyConnect: true,
        maxRetriesPerRequest: 0,
        autoResubscribe: false,
        enable_offline_queue: false,
      });

      const client: any = manager.store.getClient();

      // connect to redis
      if (!['connecting', 'connect', 'ready'].includes(client.status)) {
        await client.connect();
      }

      // ping connection
      const ping = await promiseTimeout(this.connectTimeout, client.ping());

      if (ping !== 'PONG') throw new Error(`The client is not responsive.`);

      // if (!isNullish(options.memoryThreshold)) {
      //   const info = await client.info('memory');
      //   if (parseUsedMemory(removeLineBreaks(info)) > options.memoryThreshold) {
      //     throw new Error(`Redis: The client is using abnormally high memory.`);
      //   }
      // }

      // disconnect from redis
      await client.disconnect();

      return this.getStatus(this.prefix, true, {
        ping,
      });
    } catch (e: any) {
      throw new HealthCheckError(
        e.message,
        this.getStatus(this.prefix, false, { message: e.message })
      );
    }
  }
}
