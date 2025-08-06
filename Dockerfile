# Use Node.js as the base image
FROM node:18-slim

# Install Python and required dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    python3-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package.json files
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Install dependencies
RUN npm install
RUN cd backend && npm install
RUN cd frontend && npm install

# Copy the rest of the application
COPY . .

# Create downloads directory
RUN mkdir -p backend/downloads

# Setup Python virtual environment and install yt-dlp
RUN cd backend && \
    python3 -m venv venv && \
    . venv/bin/activate && \
    venv/bin/pip install yt-dlp

# Build frontend
RUN cd frontend && npm run build

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["sh", "-c", "cd backend && . venv/bin/activate && npm start"]