import { randomUUID } from 'crypto';
import {
  Kafka,
  Message,
  Producer,
  ProducerBatch,
  TopicMessages,
} from 'kafkajs';

import { CustomMessageFormat } from './kafka_healthcheck.constants';

export class ProducerFactory {
  private producer: Producer;

  constructor() {
    this.producer = this.createProducer();
  }

  public async start(): Promise<void> {
    try {
      await this.producer.connect();
      console.log('isIdempotent', this.producer.isIdempotent());
    } catch (error) {
      console.log('Error connecting the producer: ', error);
    }
  }

  public async shutdown(): Promise<void> {
    await this.producer.disconnect();
  }

  public async sendBatch(messages: Array<CustomMessageFormat>) {
    const kafkaMessages: Array<Message> = messages.map(message => {
      return {
        value: JSON.stringify(message),
      };
    });

    const topicMessages: TopicMessages = {
      topic: `${process.env.APP_NAME}-healthcheck`,
      messages: kafkaMessages,
    };

    const batch: ProducerBatch = {
      topicMessages: [topicMessages],
    };

    return this.producer.sendBatch(batch);
  }

  private createProducer(): Producer {
    const kafka = new Kafka({
      clientId: `${randomUUID().replace(/-/g, '_')}-${
        process.env.APP_NAME
      }-healthcheck`,
      brokers: process.env.KAFKA_BROKERS.split(','),
    });

    return kafka.producer();
  }
}
