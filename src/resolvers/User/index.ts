import type {Resolvers} from '../../generated/graphql';

import Mutation from './mutation.js';
import Query from './query.js';

const resolver: Resolvers = {
  User: {},
  Query,
  Mutation,
};

export default resolver;
