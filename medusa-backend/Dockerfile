FROM node:20-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the project
ENV NODE_ENV=production
ENV MEDUSA_ADMIN_ONBOARDING_TYPE=default
RUN npx medusa build
# Copy built admin to the location Medusa expects it at runtime
RUN cp -r .medusa/server/public /app/public
# Verify admin build exists in the new location
RUN ls -la /app/public/admin/index.html

# Expose the API port
EXPOSE 9000

# Copy and prepare startup script
COPY startup.sh .
RUN chmod +x startup.sh

# Start the application
CMD ["./startup.sh"]
