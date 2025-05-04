// rabbitmq.ts
import { Connection } from 'rabbitmq-client';

export const rabbit = new Connection(process.env.RABBIT_MQ_URI || 'amqp://localhost');

rabbit.on('error', (err) => {
  console.error('RabbitMQ => connection error:', err);
});

rabbit.on('connection', () => {
  console.log('RabbitMQ => connection established');
});
