import { IResolvers } from "@graphql-tools/utils";
import { randomValues } from "../../helpers/random-world-location";
import users from "../../data/users.json";

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
    countUsers: () => (users) ? users.length : 0,
    randomLocation: (// root info. In type roots always undefined
      _: void,
      // Arguments when specify in schema arguments. If not add arguments
      args: { pointsTotal: number, northEast: { lat: number, lng: number }, southWest: { lat: number, lng: number } },
    ) => {
      console.log(args);
      return randomValues(args.pointsTotal, args.northEast, args.southWest);
    },
  },
};

export default queryResolvers;
