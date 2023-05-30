import { randomUUID } from 'crypto';
import { Admin, Kafka } from 'kafkajs';

export class AdminFactory {
  private admin: Admin;

  constructor() {
    this.admin = this.createAdmin();
  }

  public async start(): Promise<void> {
    try {
      await this.admin.connect();
    } catch (error) {
      console.log('Error connecting to kafka admin: ', error);
    }
  }

  public async shutdown(): Promise<void> {
    try {
      await this.admin.disconnect();
    } catch (error) {
      console.log('Error disconnecting to kafka admin: ', error);
    }
  }

  public listTopics() {
    return this.admin.listTopics();
  }

  public listGroups() {
    return this.admin.listGroups();
  }

  public describeCluster() {
    return this.admin.describeCluster();
  }

  private createAdmin(): Admin {
    const kafka = new Kafka({
      clientId: `${randomUUID().replace(/-/g, '_')}-${
        process.env.APP_NAME
      }-healthcheck`,
      brokers: process.env.KAFKA_BROKERS.split(','),
      retry: {
        initialRetryTime: 100,
        retries: 0,
      },
    });

    return kafka.admin();
  }
}
