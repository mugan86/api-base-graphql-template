

import { PubSub } from "graphql-subscriptions";

const subscriptionResolvers = {
  Subscription: {
    newConnection: {
      resolve: (payload: unknown) => payload,
      subscribe: async (_: unknown, __: unknown, context: { pubsub: PubSub}) =>
        context.pubsub.asyncIterator(["NEW_LOG"]),
    },
    
  }
};

export default subscriptionResolvers;