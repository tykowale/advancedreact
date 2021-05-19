import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { User } from './schemas/User';

const databaseURL = process.env.DATABASE_URL;

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
  lists: createSchema({ User }),
  ui: {
    isAccessAllowed: () => true,
  },
});
