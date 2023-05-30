import { Injectable } from '@nestjs/common';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';

import { AdminFactory } from './kafka_healthcheck.admin.factory';

@Injectable()
export class KafkaHealthIndicator extends HealthIndicator {
  private prefix = 'kafka';

  async check(): Promise<HealthIndicatorResult> {
    try {
      const admin = new AdminFactory();
      await admin.start();
      const groups = await admin.listGroups();
      const topics = await admin.listTopics();
      await admin.shutdown();
      return this.getStatus(this.prefix, true, {
        topics: topics.length,
        groups: groups.groups.length,
      });
    } catch (e) {
      throw new HealthCheckError(
        e.message,
        this.getStatus(this.prefix, false, { message: e.message })
      );
    }
  }

  // async check(): Promise<HealthIndicatorResult> {
  //   try {
  //     const producer = new ProducerFactory();
  //     await producer.start();
  //     const response = await producer.sendBatch([
  //       { a: `healthcheck-${new Date().toISOString()}` },
  //     ]);
  //     await producer.shutdown();
  //     return this.getStatus(this.prefix, true, response);
  //   } catch (e) {
  //     console.log('err', e);
  //     throw new HealthCheckError(e.message, this.getStatus(this.prefix, false));
  //   }
  // }
}
