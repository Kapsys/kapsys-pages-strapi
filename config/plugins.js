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
    upload: {
      config: {
        provider: 'aws-s3',
        providerOptions: {
          accessKeyId: env('AWS_ACCESS_KEY_ID'),
          secretAccessKey: env('AWS_ACCESS_SECRET'),
          region: env('AWS_REGION'),
          params: {
            ACL: 'private',
            Bucket: env('AWS_BUCKET'),
          },
        },
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
        },
      },
    },
    seo: {
      enabled: true
    },
    gatsby: {
      enabled: true
    },
    navigation: {
      enabled: true
    },
    sitemap: {
      enabled: true,
      config: {
        autoGenerate: true,
        allowedFields: [],
        excludedTypes: [],
      },
    },
  });
