/**
 * Resolver to implement mutation definitions solutions to return responses.
 * In this case, use this resolver when we execute modification operations
 */

import { IResolvers } from "@graphql-tools/utils";
import { addItem } from "../../helpers/file";
import { users, logs} from "../../data";
import { PubSub } from "graphql-subscriptions";

const mutationResolvers: IResolvers = {
  Mutation: {
    connect: (_: void, args: { id: number, connect: boolean }, context: {
      pubsub: PubSub
    }) => {
      if (users.find((item) => item.id === +args.id)) {
        const newItem = addItem(args.id, args.connect, logs);
        logs.push( newItem );
        context.pubsub.publish("NEW_LOG", newItem);
        return true;
      }
      
      return false;
    }
  },
};

export default mutationResolvers;
