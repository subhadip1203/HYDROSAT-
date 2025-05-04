import { rabbit } from '../rabbitmq';

const EXCHANGE = 'feedback-to-python-exchange';
const QUEUE = 'feedback-to-python-queue';
const ROUTING_KEY = 'feedback-to-python-key';

export const setupFeedbackToPythonQueue = async () => {
    // 🛠 FIX HERE: make sure durable matches existing setup
    await rabbit.exchangeDeclare({ exchange: EXCHANGE, type: 'direct', durable: true });
    await rabbit.queueDeclare({ queue: QUEUE, durable: true });
    await rabbit.queueBind({ queue: QUEUE, exchange: EXCHANGE, routingKey: ROUTING_KEY });
};

type FeedbackPayload = {
    id: string;
    text: string;
};

export const publishFeedback = async (data: FeedbackPayload) => {
    const publisher = rabbit.createPublisher({
        confirm: true,
        maxAttempts: 3,
        exchanges: [{ exchange: EXCHANGE, type: 'direct', durable: true  }],
    });

    await publisher.send({ exchange: EXCHANGE, routingKey: ROUTING_KEY }, data);
};
