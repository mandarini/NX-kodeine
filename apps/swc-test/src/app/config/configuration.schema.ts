import Joi from 'joi';

const configSchema = Joi.object({
  SECRET: Joi.string().required(),
  APP_NAME: Joi.string().required(),
  APP_PORT: Joi.number().port().required(),
  APP_ENV: Joi.string().valid(
    'development',
    'production',
    'test',
    'local',
    'provision'
  ),
  NODE_ENV: Joi.string().valid(
    'development',
    'production',
    'test',
    'local',
    'provision'
  ),
  SENTRY_DSN: Joi.string()
    .uri()
    .when('NODE_ENV', {
      is: 'production',
      then: Joi.required(),
      otherwise: Joi.allow('').optional(),
    }),

  APP_TCP_SERVICE_PORT: Joi.number().port().required(),

  ACCOUNT_TCP_SERVICE_HOST: Joi.string().hostname().required(),
  ACCOUNT_TCP_SERVICE_PORT: Joi.number().port().required(),

  // DATABASE_TYPE: Joi.string().valid('mongo').required(),
  // DATABASE_PORT: Joi.number().port().required(),
  // DATABASE_HOST: Joi.string().hostname().required(),
  // DATABASE_USER: Joi.string().required(),
  // DATABASE_PASS: Joi.string().when('NODE_ENV', { is: 'production', then: Joi.required(), otherwise: Joi.allow('').optional() }),
  // DATABASE_NAME: Joi.string().required(),

  // EVENTSTORE_DSN: Joi.string().uri().required(),
  // EVENTSTORE_CLUSTER_DNS: Joi.string().uri().required(),
  EVENTSTORE_CREDENTIALS_USERNAME: Joi.string().required(),
  EVENTSTORE_CREDENTIALS_PASSWORD: Joi.string().required(),
  EVENTSTORE_TCP_HOST: Joi.string().hostname().required(),
  EVENTSTORE_TCP_PORT: Joi.number().port().required(),
  EVENTSTORE_HTTP_HOST: Joi.string().uri().required(),
  EVENTSTORE_HTTP_PORT: Joi.number().port().required(),

  KAFKA_BROKERS: Joi.string().required(),
  KAFKA_USERNAME: Joi.string().when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  KAFKA_PASSWORD: Joi.string().when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
});

const testSchema = Joi.object({
  SECRET: Joi.string().default('TESTING_SECRET'),
});

export { configSchema, testSchema };
export default configSchema;
