import {idArg, list, nonNull, queryField} from 'nexus';

export const todos = queryField('todos', {
  type: list('Todo'),

  resolve: (_, __, ctx) => {
    return ctx.prisma.todo.findMany();
  },
});

export const post = queryField('todo', {
  type: 'Todo',
  args: {id: nonNull(idArg())},

  resolve: (parent, {id}, ctx) => {
    return ctx.prisma.todo.findUnique({
      where: {id},
    });
  },
});
