import morgan, { FormatFn, TokenIndexer } from 'morgan';

// Define a custom format string
const format: string = ':method :url :status :res[content-length] - :response-time ms HTTP/:http-version';

// Create the morgan middleware with the format
const requestLogger = morgan(format);

export { requestLogger };
