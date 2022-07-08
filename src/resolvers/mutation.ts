/**
 * Resolver to implement mutation definitions solutions to return responses.
 * In this case, use this resolver when we execute modification operations
 */

import { IResolvers } from "@graphql-tools/utils";
import users from "./../data/users.json";
import fs from 'fs';
import path from "path";

const existFile = (path: string) => {
    return fs.existsSync(path);
}
  

const saveConnection = (id: number) => {
    const jsonPath = path.join(__dirname, '..', 'data', 'connections.json');
    if(!existFile(jsonPath)) {
        console.log('wwjwjw')
        fs.writeFileSync(jsonPath, JSON.stringify([
            {
                id,
                data: new Date().toISOString(),
                connect: true
            }
        ]))
        return;
    }
    const connections = JSON.parse(fs.readFileSync(jsonPath,
            {encoding:'utf8', flag:'r'}));
    connections.push( {
        id,
        data: new Date().toISOString(),
        connect: true
    })
    fs.writeFileSync(jsonPath, JSON.stringify(connections))
    
    
    console.log('This is after the read call');
}

const mutationResolvers: IResolvers = {
  Mutation: {
    connect: (_: void, args: { id: number }) => {
      console.log(args.id);
      const user = users.find((item) => item.id === +args.id);
      console.log(user);
      saveConnection(args.id);
      return !user ? false : true;
    },
  },
};

export default mutationResolvers;
