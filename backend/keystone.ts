import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost:27017/sick-fits-keystone';

// eslint-disable-next-line no-unused-vars
const sessionConfig = {
  maxAge: 60 * 60 * 24 * 365, // 1 year
  secret: process.env.COOKIE_SECRET,
};

export default config({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: 'mongoose',
    url: databaseURL,
  },
  lists: createSchema({}),
  ui: {
    isAccessAllowed: () => true,
  },
});
