# Stage 1: build
FROM node:20-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . ./
RUN npm run build

# Stage 2: runtime
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
CMD ["node", "dist/main"]
