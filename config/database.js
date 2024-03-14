function sqliteConfig(env) {
  return {
    client: 'sqlite',
    connection: {
      filename: '.tmp/data.db',
    },
    useNullAsDefault: true,
  };
}

function postgresConfig(env) {
  return {
    client: 'postgres',
    connection: {
      host: env('PGHOST', '127.0.0.1'),
      port: env.int('PGPORT', 5432),
      database: env('PGDATABASE', 'strapi'),
      user: env('PGUSER', 'strapi'),
      password: env('PGPASSWORD', 'password'),
      ssl: env.bool(true),
    },
    pool: { min: 0 },
  };
}

module.exports = ({ env }) => ({
  connection: env('DB', 'postgres') === 'sqlite' ? sqliteConfig(env) : postgresConfig(env),
});
