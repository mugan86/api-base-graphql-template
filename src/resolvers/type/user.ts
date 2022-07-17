import { IResolvers } from "@graphql-tools/utils";

const typeUserResolvers: IResolvers = {
    User: {
        // Usamos para poder adaptar lo de la fuente de datos al contrato y que no de "null"
        name: (root: { first_name: string }) => root.first_name,
        lastname: (root: { last_name: string }) => root.last_name,
    },
};

export default typeUserResolvers;