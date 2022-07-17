import { IResolvers } from "@graphql-tools/utils";
import { paginate } from "../../helpers/pagination";

import { logs } from "../../data";


/**
 * Resolver to implement queries definitions solutions to return responses.
 * Only this type root when we NOT modify data, only read
 */
const queryLogConnectionsResolvers: IResolvers = {
    Query: {
        countLogsConnections: () => (logs) ? logs.length : 0,
        logConnections: (_: void, args: { page: number, itemsPerPage: number } = { page: 1, itemsPerPage: 20 }): {
            status: boolean
            message: string,
            list?: Array<any>
        } => {
            const list = paginate(logs, args.itemsPerPage, args.page);
            return (list.length) ?
                {
                    status: true,
                    message: `Página ${args.page} cargada correctamente`,
                    list
                } :
                {
                    status: false,
                    message: `Página ${args.page} no contiene información`
                };
        }
    },
};

export default queryLogConnectionsResolvers;
