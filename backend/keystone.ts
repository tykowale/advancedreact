import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import {
  statelessSessions,
  withItemData,
} from '@keystone-next/keystone/session';

import { KeystoneContext } from '@keystone-next/types';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { CartItem } from './schemas/CartItem';
import { insertSeedData } from './seed-data';

const databaseURL = process.env.DATABASE_URL;

// eslint-disable-next-line no-unused-vars
const sessionConfig = {
  maxAge: 60 * 60 * 24 * 365, // 1 year
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
  },
  passwordResetLink: {
    sendToken: async (args) => {
      console.log(args);
    },
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      onConnect: async (keystone) => {
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(keystone);
        }
      },
    },
    lists: createSchema({ User, Product, ProductImage, CartItem }),
    ui: {
      isAccessAllowed: ({ session }: KeystoneContext): boolean =>
        !!session?.data,
    },
    session: withItemData(statelessSessions(sessionConfig), {
      User: 'id',
    }),
  }),
);
