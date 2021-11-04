import { createParamDecorator } from "@nestjs/common";
import { User } from "src/users/schemas/users.schemas";

export const GetUser = createParamDecorator((data, req): User => {
    return req.user;
});