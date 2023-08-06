import nexus from 'nexus';
import * as path from 'path';
import {fileURLToPath} from 'url';

import * as types from './types.js';

const {connectionPlugin, fieldAuthorizePlugin, makeSchema} = nexus;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const schema = makeSchema({
  types,
  plugins: [
    fieldAuthorizePlugin({
      formatError: (authConfig) => authConfig.error,
    }),
    connectionPlugin({
      cursorFromNode(node) {
        return node.id;
      },
    }),
  ],
  outputs: {
    schema: path.join(__dirname, './generated/schema.graphql'),
    typegen: path.join(__dirname, './generated/nexus.ts'),
  },
  contextType: {
    module: path.join(__dirname, './context.ts'),
    export: 'Context',
  },
});
