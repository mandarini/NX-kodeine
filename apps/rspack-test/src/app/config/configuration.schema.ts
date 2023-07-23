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

  DATABASE_DSN: Joi.string().uri().required(),
  DATABASE_TYPE: Joi.string().valid('mongo').required(),

  APP_TCP_SERVICE_PORT: Joi.number().port().required(),

  // EVENTSTORE_DSN: Joi.string().uri().required(),
  // EVENTSTORE_CLUSTER_DNS: Joi.string().uri().required(),
  EVENTSTORE_CREDENTIALS_USERNAME: Joi.string().required(),
  EVENTSTORE_CREDENTIALS_PASSWORD: Joi.string().required(),
  EVENTSTORE_TCP_HOST: Joi.string().hostname().required(),
  EVENTSTORE_TCP_PORT: Joi.number().port().required(),
  EVENTSTORE_HTTP_HOST: Joi.string().uri().required(),
  EVENTSTORE_HTTP_PORT: Joi.number().port().required(),

  // KAFKA_BROKERS: Joi.string().required(),
  // KAFKA_USERNAME: Joi.string().when('NODE_ENV', {
  //   is: 'production',
  //   then: Joi.required(),
  //   otherwise: Joi.optional(),
  // }),
  // KAFKA_PASSWORD: Joi.string().when('NODE_ENV', {
  //   is: 'production',
  //   then: Joi.required(),
  //   otherwise: Joi.optional(),
  // }),

  REDIS_HOST: Joi.string().hostname().required(),
  REDIS_PORT: Joi.number().port().required(),
  REDIS_PASS: Joi.string().required(),
  REDIS_DB: Joi.number().integer().default(0),
  REDIS_TTL: Joi.number()
    .positive()
    .default(60 * 60),

  STRIPE_CURRENCY: Joi.string().valid('usd').required(),
  STRIPE_SECRET_KEY_TEST: Joi.string().required(),
  STRIPE_SECRET_KEY_PROD: Joi.string().required(),
  STRIPE_WEBHOOK_SECRET_TEST: Joi.string().required(),
  STRIPE_WEBHOOK_SECRET_PROD: Joi.string().required(),
  STRIPE_WEBHOOK_PREFIX: Joi.string().required().default('billing/stripe'),

  FRONTEND_URL: Joi.string().uri().required(),
});

const testSchema = Joi.object({
  SECRET: Joi.string().default('TESTING_SECRET'),
});

export { configSchema, testSchema };
export default configSchema;
