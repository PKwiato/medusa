# Build stage
FROM node:20-slim AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
ARG VITE_MEDUSA_BACKEND_URL
ARG VITE_MEDUSA_PUBLISHABLE_KEY

ENV VITE_MEDUSA_BACKEND_URL=$VITE_MEDUSA_BACKEND_URL
ENV VITE_MEDUSA_PUBLISHABLE_KEY=$VITE_MEDUSA_PUBLISHABLE_KEY

RUN npm run build

# Production stage
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
