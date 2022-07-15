import { IResolvers } from "@graphql-tools/utils";

const typeResolvers: IResolvers = {
    User: {
        name: (root: { first_name: string }) => root.first_name,
        lastname: (root: { last_name: string }) => root.last_name,
    },
};

export default typeResolvers;