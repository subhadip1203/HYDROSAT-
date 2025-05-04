import { setupFeedbackToPythonQueue } from './feedbackToPython';

export async function allPublishers() {
    await setupFeedbackToPythonQueue();
    console.log('All RabbitMQ queues are ready');
};