module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'kapsys.io-sandbox.s3.eu-central-1.amazonaws.com', 's3.eu-central-1.amazonaws.com'],
          'media-src': ["'self'", 'data:', 'blob:', 'kapsys.io-sandbox.s3.eu-central-1.amazonaws.com', 's3.eu-central-1.amazonaws.com'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::body',
    config: {
      jsonLimit: '10mb',
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
