import { IResolvers } from "@graphql-tools/utils";

/**
 * Resolver to implement queries definitions solutions to return responses.
 * Only this type root when we NOT modify data, only read
 */
const queryResolvers: IResolvers = {
  Query: {
    hello: (): string => "Hola a la API de GraphQL!!",
    helloWithName: (
      // root info. In type roots always undefined
      _: void,
      // Arguments when specify in schema arguments. If not add arguments
      args: { name: string },
      // Use to shared database instance object, token,...
      context: unknown,
      // GraphQL operation all info
      info: unknown,
    ) => {
      console.log(info);
      return `Hola ${args.name}`;
    },
    peopleNumber: () => {
      return {
        message: "People data message!",
        status: true,
        data: 1203893490,
      };
    },
  },
};

export default queryResolvers;
