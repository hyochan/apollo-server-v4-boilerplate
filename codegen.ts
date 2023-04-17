import type { CodegenConfig } from '@graphql-codegen/cli';

export default <CodegenConfig>{
  schema: './schemas/schema.graphql',
  documents: undefined,
  overwrite: true,
  generates: {
    './src/generated/graphql.ts': {
      plugins: [
        '@graphql-codegen/typescript',
        '@graphql-codegen/typescript-resolvers',
        '@graphql-codegen/typescript-operations',
        '@graphql-codegen/typed-document-node',
      ],
      config: {
        useIndexSignature: true,
        contextType: '../context#Context',
        allowParentTypeOverride: true,
        // https://github.com/dotansimha/graphql-code-generator/issues/2932#issuecomment-582862732
        mapperTypeSuffix: 'Model',
        enumValues: {
          AuthType: '@prisma/client#AuthType',
          Gender: '@prisma/client#Gender',
        },
        mappers: {
          // https://github.com/dotansimha/graphql-code-generator/issues/1793#issuecomment-488302686
          User: '@prisma/client#User',
          Post: '@prisma/client#Post',
          Profile: '@prisma/client#Profile',
        },
        inputMaybeValue: 'T | undefined | null',
        defaultMapper: 'Partial<{T}>',
      },
    },
  },
};
