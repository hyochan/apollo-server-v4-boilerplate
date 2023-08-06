import gqlIsoDate from 'graphql-iso-date';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';
import nexus from 'nexus';

const {GraphQLDateTime} = gqlIsoDate;
const {asNexusMethod, enumType} = nexus;

export const AuthType = enumType({
  name: 'AuthType',
  members: ['Email', 'Facebook', 'Google', 'Apple'],
});

export const Gender = enumType({
  name: 'Gender',
  members: ['male', 'female', 'intersex'],
  asNexusMethod: 'gender',
  description: 'Gender of the user',
});

export const Upload = GraphQLUpload;
// @ts-ignore
export const DateTime = asNexusMethod(GraphQLDateTime, 'date');
