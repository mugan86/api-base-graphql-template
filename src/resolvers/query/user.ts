import { IResolvers } from "@graphql-tools/utils";
import { paginate } from "../../helpers/pagination";

import users from "./../../data/users.json";

/**
 * Resolver to implement queries definitions solutions to return responses.
 * Only this type root when we NOT modify data, only read
 */
const queryUsersResolvers: IResolvers = {
  Query: {
    users: (_: void, args: { page: number, itemsPerPage: number } = { page: 1, itemsPerPage: 20 }):
      {
        status: boolean
        message: string,
        list?: Array<any>
      } => {
        const list = paginate(users, args.itemsPerPage, args.page);
      return (list.length) ?
      {
        status: true,
        message: `Página ${ args.page } cargada correctamente`,
        list
      } :
      {
        status: false,
        message: `Página ${ args.page } no contiene información`
      }
      
      ;
    },

    // Error: Query.user defined in resolvers, but not in schema (cuando no está definido en el schema)
    user: (_: void, args: { id: number }) => {
      const result = users.filter(user => user.id === args.id)[0];
      return (result) ?
        {
          status: true,
          message: `Usuario ${args.id} - ${result.first_name} encontrado`,
          item: result
        } :
        {
          status: true,
          message: `Usuario ${args.id} no existe`,
        };
    }
  },
};

export default queryUsersResolvers;
