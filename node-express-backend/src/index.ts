import 'dotenv/config'
import app from './app';
import { connectDB } from './config/db';
import {allPublishers} from './RabbitMQ/publisher/allPublishers'; 

const PORT = process.env.NODE_APP_PORT || 8000;


async function startServer() {
  try {
    await connectDB();
    await allPublishers();

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();

