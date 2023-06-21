function s3Config(env) {
  return {
    config: {
      provider: "aws-s3",
      providerOptions: {
        s3Options: {
          accessKeyId: env("AWS_ACCESS_KEY_ID"),
          secretAccessKey: env("AWS_ACCESS_SECRET"),
          region: env("AWS_REGION"),
          params: {
            Bucket: env("AWS_BUCKET"),
          },
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  }
}

function localStorageConfig(env) {
  return {
    provider: 'local',
    providerOptions: {},
  }
}

module.exports = ({ env }) => ({
    'users-permissions': {
      config: {
        jwtSecret: env('JWT_SECRET'),
      },
    },
    graphql: {
      enabled: true,
      config: {
        endpoint: '/graphql',
        defaultLimit: 25,
        maxLimit: 100,
        apolloServer: {
          tracing: true,
        },
      },
    },
    upload: env("STORAGE", "s3") === "s3" ? s3Config(env) : localStorageConfig(env),
    seo: {
      enabled: true
    },
    gatsby: {
      enabled: true
    },
    navigation: {
      enabled: true
    },
    'sitemap': {
      enabled: true,
      config: {
        autoGenerate: true,
        allowedFields: ['slug_category', 'uid'],
        excludedTypes: [],
      }
    }
  });
