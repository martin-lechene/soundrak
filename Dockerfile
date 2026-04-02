FROM node:20-alpine

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 8364

# Bind 0.0.0.0 so the server is reachable from outside the container
CMD ["npx", "http-server", ".", "-p", "8364", "-c-1", "-a", "0.0.0.0"]
