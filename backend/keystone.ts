import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import {
  statelessSessions,
  withItemData,
} from '@keystone-next/keystone/session';

import { User } from './schemas/User';
import { Context } from 'react';
import { KeystoneContext } from '@keystone-next/types';

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
    },
    lists: createSchema({ User }),
    ui: {
      isAccessAllowed: ({ session }: KeystoneContext): boolean =>
        !!session?.data,
    },
    session: withItemData(statelessSessions(sessionConfig), {
      User: 'id',
    }),
  }),
);
