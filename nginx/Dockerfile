# Step 1: Build React app
FROM node:23-slim AS builder

WORKDIR /app
COPY ../frontend/package*.json ./
RUN npm ci

COPY ../frontend .
RUN npm run build



# Step 2: Serve with Nginx
FROM nginx:alpine

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]