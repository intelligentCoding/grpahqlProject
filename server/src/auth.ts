import { MiddlewareFn } from "type-graphql";
import { Mycontext } from "./types";

export const auth: MiddlewareFn<Mycontext> = ({context}, next) => {
    if(!context.req.session.userId){
        throw new Error("You are authenticated user")
    }
    return next();
}