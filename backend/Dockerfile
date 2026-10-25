# backend/Dockerfile — NestJS
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY prisma ./prisma
RUN npx prisma generate
COPY . .
RUN npx nest build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production PORT=3001
RUN addgroup -S app && adduser -S app -G app
COPY package*.json ./
RUN npm install --omit=dev
COPY prisma ./prisma
RUN npx prisma generate
COPY --from=builder /app/dist ./dist
USER app
EXPOSE 3001
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
