FROM node
ARG PORT
ARG ORIGIN
ARG MONGO_URI
ARG MONGO_NAME
ARG BCRYPT_SALT
ARG JWT_SECRET_KEY
ARG JWT_EXPIRED
ENV PORT=$PORT
ENV ORIGIN=$ORIGIN
ENV MONGO_URI=$MONGO_URI
ENV MONGO_NAME=$MONGO_NAME
ENV BCRYPT_SALT=$BCRYPT_SALT
ENV JWT_SECRET_KEY=$JWT_SECRET_KEY
ENV JWT_EXPIRED=$JWT_EXPIRED


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
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=prodDeps /app/node_modules ./node_modules

# EXPOSE "${PORT}"
CMD [ "yarn", "start" ]