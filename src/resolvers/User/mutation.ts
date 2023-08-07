import jwt from 'jsonwebtoken';
import {arg, inputObjectType, mutationField, nonNull, stringArg} from 'nexus';

import {assert} from '../../utils/assert.js';
import {
  APP_SECRET,
  encryptCredential,
  validateCredential,
} from '../../utils/auth.js';
import {USER_SIGNED_IN, USER_UPDATED} from '../../utils/const.js';

export const UserInputType = inputObjectType({
  name: 'UserCreateInput',
  definition(t) {
    t.nonNull.string('email');
    t.nonNull.string('password');
    t.string('name');
    t.string('displayName');
    t.gender('gender');
    t.date('birthday');
    t.string('phone');
    t.string('statusMessage');
  },
});

export const UserUpdateInputType = inputObjectType({
  name: 'UserUpdateInput',
  definition(t) {
    t.string('name');
    t.string('displayName');
    t.date('birthday');
    t.string('phone');
    t.string('statusMessage');
    t.gender('gender');
  },
});

export const signUp = mutationField('signUp', {
  type: 'AuthPayload',
  args: {
    user: nonNull(arg({type: 'UserCreateInput'})),
  },
  resolve: async (_parent, {user}, ctx) => {
    const {name, email, password, gender} = user;
    const hashedPassword = await encryptCredential(password);

    const created = await ctx.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        gender,
      },
    });

    return {
      token: jwt.sign({userId: created.id}, APP_SECRET),
      user: created,
    };
  },
});

export const signIn = mutationField('signIn', {
  type: 'AuthPayload',
  args: {
    email: nonNull(stringArg()),
    password: nonNull(stringArg()),
  },
  resolve: async (_parent, {email, password}, ctx) => {
    const {pubsub} = ctx;

    const user = await ctx.prisma.user.findUnique({
      where: {email},
    });

    if (!user) {
      throw new Error(`No user found for email: ${email}`);
    }

    if (!(await validateCredential(password, user.password || ''))) {
      throw new Error('Invalid password');
    }

    pubsub.publish(USER_SIGNED_IN, user);

    return {
      token: jwt.sign({userId: user.id}, APP_SECRET),
      user,
    };
  },
});

export const updateProfile = mutationField('updateProfile', {
  type: 'User',
  args: {
    user: nonNull(arg({type: 'UserUpdateInput'})),
  },
  resolve: async (_parent, {user}, {pubsub, prisma, userId}) => {
    assert(userId, 'Not authorized.');

    const updated = await prisma.user.update({
      where: {id: userId},
      data: user,
    });

    pubsub.publish(USER_UPDATED, updated);

    return updated;
  },
});
