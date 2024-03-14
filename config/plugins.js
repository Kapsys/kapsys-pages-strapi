function s3Config(env) {
  return {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        baseUrl: `https://s3.${env('AWS_REGION')}.amazonaws.com/${env('AWS_BUCKET')}`,
        s3Options: {
          accessKeyId: env('AWS_ACCESS_KEY_ID'),
          secretAccessKey: env('AWS_ACCESS_SECRET'),
          region: env('AWS_REGION'),
          params: {
            Bucket: env('AWS_BUCKET'),
          },
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  };
}

function localStorageConfig(env) {
  return {
    provider: 'local',
    providerOptions: {},
  };
}

module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET'),
    },
  },
  upload: env('STORAGE', 's3') === 's3' ? s3Config(env) : localStorageConfig(env),
  seo: {
    enabled: true,
  },
  navigation: {
    enabled: true,
  },
  sitemap: {
    enabled: true,
    config: {
      autoGenerate: true,
      allowedFields: ['slug_category', 'lang', 'langForSitemap', 'slug'],
      excludedTypes: [],
    },
  },
  'strapi-plugin-populate-deep': {
    config: {
      defaultDepth: 5,
    },
  },
});
