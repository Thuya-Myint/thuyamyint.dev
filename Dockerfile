# build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN bun install
COPY . .
RUN bun run build
# Run 
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app .
EXPOSE 3000
CMD [ "npm", "start" ]
