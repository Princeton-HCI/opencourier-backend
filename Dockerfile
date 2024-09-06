###################
FROM node:18 as turborepo
WORKDIR /app

RUN yarn global add turbo@^1.10.12

COPY . .

RUN turbo prune --scope=backend --docker

###################
FROM node:18

# This is needed to generate the prisma client (npx prisma generate)
ENV DB_URL=postgresql://postgres:postgres@localhost/postgres?host=/cloudsql/nosh-backend-development:us-central1:postgres-db

WORKDIR /app

COPY --from=turborepo /app/out/json/ .
COPY --from=turborepo /app/out/yarn.lock ./yarn.lock
#COPY --from=turborepo /app/.yarnrc.yml ./.yarnrc.yml
#COPY --from=turborepo /app/.yarn ./.yarn

RUN yarn install

COPY --from=turborepo /app/out/full/ .

RUN cd apps/backend && npx prisma generate
RUN yarn turbo run build --filter=backend

# TODO: split apart running and building
EXPOSE 8080

CMD cd apps/backend; node dist/apps/backend/src/main