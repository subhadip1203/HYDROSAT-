FROM node:23-slim

WORKDIR /app

# Copy package files and install
COPY package*.json ./
RUN npm ci

# Copy app source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose port (example: 3000)
EXPOSE 3000

# Start the app
CMD ["sh", "-c", "sleep 15 && npm start"]
