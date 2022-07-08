/**
 * Resolver to implement mutation definitions solutions to return responses.
 * In this case, use this resolver when we execute modification operations
 */

import { IResolvers } from "@graphql-tools/utils";
import users from "./../data/users.json";
import path from "path";
import { existFile, readFileSync, writeFileSync } from "../helpers/file";
import { randomValues } from "../helpers/random-world-location";

const addItem = (id: number, connect: boolean) => {
  return {
    id,
    data: new Date().toISOString(),
    connect,
    location: randomValues(1)[0]
  };
};

const saveConnection = (id: number, connect: boolean) => {
  const jsonPath = path.join(__dirname, "..", "data", "connections.json");
  let connections = [];
  try {
    if (!existFile(jsonPath)) {
      connections = writeFileSync(jsonPath, [
        addItem(id, connect)
      ]);
    } else {
      connections = readFileSync(jsonPath);
      connections.push(addItem(id, connect) );
      writeFileSync(jsonPath, connections);
    }
    // Emitir cambios con las conexiones
    return true;
  } catch (e: any) {
    return false;
  }

};

const mutationResolvers: IResolvers = {
  Mutation: {
    connect: (_: void, args: { id: number }) => {
      return users.find((item) => item.id === +args.id) ? saveConnection(args.id, true) : false;
    },
    disconnect: (_: void, args: { id: number }) => {
      return users.find((item) => item.id === +args.id) ? saveConnection(args.id, false) : false;
    },
  },
};

export default mutationResolvers;
