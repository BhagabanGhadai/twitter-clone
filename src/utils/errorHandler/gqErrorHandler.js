import { ApolloServerErrorCode } from "@apollo/server/errors";
import { GraphQLError } from "graphql";

export const ErrorTypes ={
    BAD_USER_INPUT:{
        errorCode:ApolloServerErrorCode.BAD_USER_INPUT,
        errorStatus: 400
    },
    BAD_REQUEST:{
        errorCode:ApolloServerErrorCode.BAD_REQUEST,
        errorStatus: 400
    },
    NOT_FOUND:{
        errorCode:ApolloServerErrorCode.NOT_FOUND,
        errorStatus: 404
    },
    UNAUTHORIZED:{
        errorCode:'UNAUTHORIZED',
        errorStatus: 401
    },
    FORBIDDEN:{
        errorCode:'FORBIDDEN',
        errorStatus: 403
    },
    INTERNAL_SERVER_ERROR:{
        errorCode:ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
        errorStatus: 500
    }
}
export default (errorMessage, errorType) => {
    throw new GraphQLError(errorMessage, {
        extensions: { code: errorType.errorCode, http: { status: errorType.errorStatus } },
    });
}