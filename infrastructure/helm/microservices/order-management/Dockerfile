# Stage 1: build the application
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies using the lockfile for reproducibility
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code and build it
COPY . ./
RUN npm run build

# Stage 2: create the runtime image with only production dependencies
FROM node:20-alpine
WORKDIR /app

# Copy the compiled application and install only production deps
COPY --from=build /app/dist ./dist
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

CMD ["node", "dist/main"]