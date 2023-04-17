import type {User} from '@prisma/client';

import type {Resolvers} from '../../generated/graphql';

const resolver: Resolvers['Query'] = {
  me: async (_, args, {getUser}): Promise<User> => {
    const auth = await getUser();

    return auth;
  },
};

export default resolver;
