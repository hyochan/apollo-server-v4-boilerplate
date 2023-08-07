import {list, objectType} from 'nexus';

export const Settings = objectType({
  name: 'Settings',
  definition(t) {
    t.id('id');
    t.string('socialId');

    t.field('authType', {
      type: 'AuthType',
    });

    t.string('refreshToken');
  },
});

export const User = objectType({
  name: 'User',
  definition(t) {
    t.id('id');
    t.string('email');
    t.string('name');
    t.string('birthday');
    t.gender('gender');
    t.string('displayName');
    t.string('phone');
    t.string('photoURL');
    t.string('thumbURL');

    t.date('createdAt');
    t.date('updatedAt');
    t.date('deletedAt');

    // t.field('settings', {type: 'Settings'});
    // t.field('todos', {type: list('Todo')});
  },
});
