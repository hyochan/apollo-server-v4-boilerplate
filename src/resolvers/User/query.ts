import type {User} from '@prisma/client';

import type {QueryResolvers, Resolvers} from '../../generated/graphql.js';
import {createPrismaSelect} from '../../utils/select.js';

const me: QueryResolvers['me'] = async (_, __, {userId, prisma}, info) => {
  const select = createPrismaSelect(info);

  return prisma.user.findUnique({
    select,
    where: {id: userId},
  }) as unknown as User;
};

export default <Resolvers['Query']>{
  me,
};
