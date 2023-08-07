import {objectType} from 'nexus';

export const Todo = objectType({
  name: 'Todo',
  definition(t) {
    t.int('id');
    t.string('title');
    t.string('description');
    t.boolean('completed');

    t.date('createdAt');
    t.date('updatedAt');
    t.date('deletedAt');
  },
});
