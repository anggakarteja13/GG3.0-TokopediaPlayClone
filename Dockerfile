ARG EnvironmentVariable

FROM node:18.16.0-alpine AS buildDeps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:18.16.0-alpine AS prodDeps
WORKDIR /app
COPY --from=buildDeps /app/package.json /app/yarn.lock ./
COPY --from=buildDeps /app/node_modules ./node_modules
RUN yarn install --production

FROM node:18.16.0-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=buildDeps /app/node_modules ./node_modules
RUN yarn build
RUN yarn run seed

FROM node:18.16.0-alpine AS runner
WORKDIR /app
ARG RAILWAY_ENVIRONMENT
ENV RAILWAY_ENVIRONMENT=$RAILWAY_ENVIRONMENT
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=prodDeps /app/node_modules ./node_modules

# EXPOSE "${PORT}"
CMD [ "yarn", "start" ]