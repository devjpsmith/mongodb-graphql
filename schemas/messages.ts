import { createMessage, getMessage, getMessages } from "../services/messageService";

const resolvers = {
    Query: {
        getMessages(obj, args, context, info) {
            return getMessages()
        },
        getMessage(obj, args, context, info) {
            return getMessage(args.id)
        }
    },
    Mutation: {
        createMessage(obj, args, context, info) {
            return createMessage(args)
        }
    }
};

export { resolvers };
