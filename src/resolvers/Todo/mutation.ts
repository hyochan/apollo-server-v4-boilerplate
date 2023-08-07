import {intArg, mutationField, nonNull, stringArg} from 'nexus';

import {assert} from '../../utils/assert.js';

export const createTodo = mutationField('createTodo', {
  type: 'Todo',
  args: {
    title: nonNull(stringArg()),
    description: stringArg(),
  },
  resolve: (_, {title, description}, {prisma, userId}) => {
    assert(userId, 'Not authorized');

    return prisma.todo.create({
      data: {
        title,
        description,
        completed: false,
        user: {connect: {id: userId}},
      },
    });
  },
});

export const deleteTodo = mutationField('deleteTodo', {
  type: 'Todo',
  args: {id: nonNull(intArg())},

  resolve: (_, {id}, {prisma}) => {
    return prisma.todo.delete({
      where: {id},
    });
  },
});
