import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const User = createParamDecorator((data: string, ctx: ExecutionContext) => {
    console.log(data)
    const req = ctx.switchToHttp().getRequest()

    return req.params.firstname.toUpperCase()
})