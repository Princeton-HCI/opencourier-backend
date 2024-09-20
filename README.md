# Server - the backend API

Ensure you read through this whole README before starting backend development.

# Generate your own EOA using Metamask/viem/ethers

from the apps/backend directory run:

```sh
node gen-eoa.js
```

View the logs and copy your private key as your API key for your Paymaster in your env.

Then, you can get Base Sepolia ETH [here](https://www.alchemy.com/faucets/base-sepolia) with your address.
And Base Sepolia USDC [here](https://faucet.circle.com/) with your address.
Add Base Sepolia ETH [here](https://base-sepolia.degenchest.com/)

You can also use these values:

```json
Address: 0x9b0a1C6706561cd43b2F1F46e9280Aae0E4eDCf6
Private Key: 0xb10ea9d1aebd39f4c256ac9229b1d0d50cd435fc16f80af8d45910e5ba6f4492
```

# Stack

- [NestJS](https://nestjs.com/) - A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
- [Prisma](https://www.prisma.io/) - Next-generation ORM for Node.js and TypeScript.
- [PostgreSQL](https://www.postgresql.org/) - The world's most advanced open source relational database
- [Passport](https://www.passportjs.org/) - simple auth for Node.js
- [Swagger UI](https://swagger.io/) - Visual documentation for REST API based on OpenAPI Specification.
- [Jest](https://jestjs.io/) - delightful JavaScript Testing Framework with a focus on simplicity.
- [Docker](https://www.docker.com/) - an open platform for developing, shipping, and running applications.

## Getting Started

### Prerequisites

Make sure you have Node.js 16.x, yarn, and [Docker](https://www.docker.com/products/docker-desktop/) installed.

### Local development setup

Here's how to get started with development on the backend server. Ensure Docker is running!

Follow these commands in order to set up the database and server:

```sh
cd apps/server
yarn install             # will also automatically run prepare set up our commit hooks, which we use to enforce code formatting and quality standards.
yarn run docker:db       # Start database using Docker
yarn run prisma:generate # Generate Prisma client
yarn run db:init         # Initialize the database
yarn run start:debug     # Start the server in development mode (watch & debug).
```

Now that this initial setup is complete, going forward you can use `npm run dev` to start the database and server in development mode.
**IMPORTANT NOTE:** if you make any changes to DTOs or the Prisma schema, you must regenerate your prisma client with `npm run prisma:generate` before starting the server.

### Alternative: Docker Compose setup

In the `server` subdirectory, run:

```sh
yarn compose:up
```

## Known errors:

- [ ] ✘ Network nosh-backend_default w/ npm run compose:down - has to do with pgAdmin config.
- [ ] ! db The requested image's platform (linux/amd64) does not match the detected host platform (linux/arm64/v8) and no specific platform was requested 0.0s. Issue with M1 and M2 chips running local docker container with [PostGIS image](https://registry.hub.docker.com/r/postgis/postgis/tags?page=1&name=12-3.3)

## Available Scripts

In the `server` subdirectory, you can run:

### `yarn format`

Runs Prettier and fixes formatting issues. We use Prettier to enforce a code format standard.

### `yarn lint`

Runs ESLint and fixes any auto-fixable issues. We use ESLint to ensure a standardized code quality baseline.
Outputs any remaining warnings or errors.

### `npm typecheck`

Runs tsc to check for TypeScript compilation errors.

Common issues:

- a bunch of Prisma errors → run `yarn prisma:generate`
- a bunch of `Object literal may only specify known properties` → run `yarn prisma:generate`

### `yarn dev`

Assuming Docker is running, this initializes the db, runs prisma generate, and starts the app in development mode.
By default, it is accessible at http://localhost:3000.
Swagger UI is accessible at http://localhost:3000/api.

### `yarn start`, `yarn start:watch`, & `yarn start:debug`

Runs the app in standard, watch, or watch & debug modes.
By default, it is accessible at http://localhost:3000

### `yarn test`

Runs tests. Currently our testing suite is a work in progress / not functional.

### `yarn build`

Builds the app for production in the `dist` folder.

Your app is ready to be deployed!

## To Run Prisma Studio

[Prisma Studio](https://www.prisma.io/blog/prisma-studio-3rtf78dg99fe) is a data manipulation and exploration tool.

In the `server` subdirectory, you can use prisma studio by running:

```console
cd server
cp .env .env.local
npx prisma studio
```

## To Run PGAdmin

pgAdmin is the most popular and feature rich Open Source administration and development platform for PostgreSQL.

pgAdmin is configured out of the box in the docker compose file for this project.

1. When your container is running, head to [locahost port 5050](http://localhost:5050)
2. login with the pgAdmin credentials provided in the .env file
3. right click on servers in the Object Explorer
4. Click register > server
5. In the _general tab_, enter the value for the `COMPOSE_PROJECT_NAME` in your .env file in the _Name_ text box
6. In the _connection tab_, enter the value for the `CONTAINER_NAME` in your .env file in the **Host name/address** text box
7. In the _connection tab_, enter the value for the `DB_USER` in your .env file in the **Username** text box
8. In the _connection tab_, enter the value for the `DB_PASSWORD` in your .env file in the **Password** text box
9. Click save

## Server side folder structure

- **src**: The root directory of the server-side code.
  - **entities**: Contains subdirectories for different entities in the project.
    - **entity**: Represents an individual entity.
      - **entity.service**: Handles the business logic and data manipulation for the entity.
      - **entity.controller**: Handles the API endpoints related to the entity and manages the request/response handling.
      - **base**: Contains base files that provide common functionality shared by multiple entities.
        - **entity.service.base**: Provides a base implementation for the entity service with common functionality.
        - **entity.controller.base**: Provides a base implementation for the entity controller with shared functionality.
      - **queries**: Contains type compatible files related to (Prisma's model queries operations)[https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#model-queries] for the entity.
        - **Create Input**: Represents the input object type for creating an entity.
        - **Create Args**: Defines the arguments for creating an entity.
        - **Find Unique Args**: Specifies the arguments for finding a unique entity.
        - **Find Many Args**: Specifies the arguments for finding multiple entities.
        - **Update Input**: Represents the input object type for updating an entity.
        - **Update Args**: Defines the arguments for updating an entity.
        - **Where Input**: Represents the input object type for filtering entities based on specific conditions.
        - **Where Unique Input**: Represents the input object type for finding a unique entity based on specific conditions.
        - **Order By Input**: Represents the input object type for specifying the order in which entities should be retrieved.
        - **List Relations**: Represents the output object type for listing related entities.
        - **Delete Args**: Defines the arguments for deleting an entity.
        - **related_entity**: Represents a subdirectory for handling nested related_entity operations without requiring an entity input.
        - **create nested related_entity without entity input**: Handles the creation of a related_entity without requiring an entity input.
        - **updated nested related_entity without entity input**: Handles the update of a nested related_entity without requiring an entity input.

## Google Cloud

Pushes to the `develop` branch automatically build and deploy a Docker image of the server built from source.
The containerized server is built with Cloud Build, stored on the Artifact Registry, and deployed to Cloud Run.

The database is hosted on Cloud SQL.
If you need to connect to the Cloud database directly, use Cloud SQL Proxy.

## Environment Variables (work in progress):

| Environment          | Description                              | Value                                                      |
| -------------------- | ---------------------------------------- | ---------------------------------------------------------- |
| DEBUG_MODE           | Debug level                              | 1                                                          |
| DB_URL               | Local database connection URL            | db-provider://admin:admin@localhost:${DB_PORT}/\${DB_NAME} |
| DB_PORT              | Local database port                      |                                                            |
| DB_USER              | Local database username                  | admin                                                      |
| DB_PASSWORD          | Local database password                  | admin                                                      |
| COMPOSE_PROJECT_NAME | Docker Compose project name              | amp\_{applicationId}                                       |
| SERVER_PORT          | The port that the server is listening to | 3000                                                       |
| JWT_SECRET_KEY       | JWT secret                               | Change_ME!!!                                               |
| JWT_EXPIRATION       | JWT expiration in days                   | 2d                                                         |

\*db-provider - the prisma DB provider (for example: for postgres is postgresql)

## Integrations

This server integrates with a variety of logistics, menu management, and point-of-sale systems. Many of these systems send webhooks to the server to do things like update the status of an order.

### external api components

- apiFactory
- service(s)
- module

### external api providers

- chowly
- checkmate
- shipday
- stripe
- twilio

### creating new integrations

- Creating an ApiClient for the service.
- Adding an option in the database for the event source property in the OrderEvent table.

### deploying a new integration

- for the integration to work in the development server, there needs to be an associated .env entry for the api key in the google cloud environment. Please coordinate with the relevant team member to ensure the integration

### tools

#### Ngrok for http tunneling (used for webhook local testing)

- [ngrok](https://ngrok.com/docs) is used to test webhooks locally.
- see NgrokMiddleware for logic.
  - install ngrok with homebrew `brew install ngrok/ngrok/ngrok`
  - get authtoken from mike
  - configure auth token by running `ngrok config add-authtoken TOKEN`
  - run `ngrok http --domain=ac3b48ee3bd3-5274774505558921742.ngrok-free.app 3000` to open an http tunnel for webhook forwarding to localhost:3000
  - the /util/middleware/NgrokMiddleware is applied to POST routes for certain endpoints that we expect to receive webhooks from
  - webhooks that are sent to the development server will be forwarded to localhost:3000 for testing

#### Gcloud CLI (used for interfacing with hosted db)

Details on installing gcloud CLI are [here](https://cloud.google.com/sql/docs/postgres/connect-instance-auth-proxy#mac-m1) but you can just follow this.

Install [gcloud CLI](https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-cli-439.0.0-darwin-x86_64.tar.gz)

- Unzip and run install.sh

In your terminal:

```sh
yarn gcloud
```


# Setup on MacOS

## Backend Setup

1. Docker Desktop install: https://www.docker.com/products/docker-desktop/. Ensure Docker is running. 

2. Postman install: https://www.postman.com/downloads/

- Then, import these config files into postman (files are on Opendeli Courier System Eng shared drive; ask Varun / Andrés if you don't have access)
    - [OpennDeli.postman_collection.json](./docs/postman/Open%20Courier.postman_collection.json) 
    - [OpenDelli local.postman_environment.json](./docs/postman/OpenCourierlocal.postman_environment.json)
- We will use Postman for testing with sample data.

3. Install a DB client like TablePlus. 
    - Download TablePlus: https://tableplus.com/download
    - Connect to the database using the following credentials:
        - Host: localhost
        - Port: 5432
        - User: admin
        - Password: admin
        - Database: opencourier-v2

4. Node install: https://nodejs.org/en/download/package-manager

5. `git clone https://github.com/Princeton-HCI/opencourier-backend.git`

6. `cp local.env .env`

7. `docker-compose -f docker-compose.db.yml up -d`

8. Run this whenever there is a new package is added and during initial set up
    - `yarn install`

9. Run this whenever there is a change in the schema and the migrations and during initial setup
    - ```yarn prisma:generate```
    - ```yarn db:migrate-save```
    - ```yarn prisma:seed```

10. Run the app
    - `yarn start:watch`
    - If there are no errors on the terminal, go to http://localhost:3000/api/courier/docs/ and enter login details, you will see the Swagger documentation page load.
        - username: `opencourier`
        - password: `0p3nC0ur13r`
    - You can make code changes on the editor; terminal will keep listening for changes
