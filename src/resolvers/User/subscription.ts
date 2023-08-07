import {withFilter} from 'graphql-subscriptions';
import {nonNull, stringArg, subscriptionField} from 'nexus';

import {assert} from '../../utils/assert.js';
import {USER_SIGNED_IN, USER_UPDATED} from '../../utils/const.js';

export const userSignedIn = subscriptionField('userSignedIn', {
  type: 'User',
  args: {
    userId: nonNull(stringArg()),
  },
  subscribe: withFilter(
    (_, args, ctx) => {
      const {pubsub} = ctx;

      return pubsub.asyncIterator(USER_SIGNED_IN);
    },
    (payload, {userId}) => {
      return payload.id === userId;
    },
  ),
  resolve: (payload) => {
    return payload;
  },
});

export const userUpdated = subscriptionField('userUpdated', {
  type: 'User',
  args: {
    userId: nonNull(stringArg()),
  },
  subscribe: withFilter(
    (_, __, {pubsub}) => pubsub.asyncIterator([USER_UPDATED]),
    (payload, {userId}) => {
      assert(userId, 'Not Authorized!');

      return payload.id === userId;
    },
  ),
  resolve: (payload) => {
    return payload;
  },
});
