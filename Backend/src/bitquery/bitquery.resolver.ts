import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class BitqueryResolver {

    @Query(() => String)
    sayHello(): string {
        return 'Hello World!';
    }
}
