import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers  } from '@graphql-tools/merge';
import { makeExecutableSchema} from "graphql-tools";
import { resolvers as Messages } from "./messages";

const resolvers = mergeResolvers([
    Messages
]);

const typeDefs = mergeTypeDefs(
    loadFilesSync('schemas/*.gql'),
)

const schema = makeExecutableSchema({ typeDefs, resolvers });

export { resolvers, typeDefs, schema };
