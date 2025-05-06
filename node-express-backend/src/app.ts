import express from 'express';
import cors, { CorsOptions } from 'cors';
import routes from './routes';
import { requestLogger } from './middlewares/logging/logger';

const app = express();
const whitelist = ['http://localhost:5173', 'http://localhost'];

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Add headers used by your GET requests
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'], // Explicitly allow methods
  optionsSuccessStatus: 200,
};

// Apply cors globally except for /api/internal
app.use((req, res, next) => {
  if (req.path.startsWith('/api/internal')) {
    return next();
  }
  cors(corsOptions)(req, res, next);
});

// Explicitly handle OPTIONS requests for all routes except internal
app.options('*', cors(corsOptions));



app.use(express.json());
app.use(requestLogger);
app.use('/api', routes);

export default app;
