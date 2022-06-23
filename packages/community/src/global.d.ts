import type { ReactionRoleTable } from './db/reaction_roles';
import type { ShopTable } from './db/shop';
import type { UserTable } from './db/user';
import type { TagTable } from './db/tag';
import { Knex } from 'knex';

type MakeOptional<
    Table extends Record<string, any>,
    Union extends string,
> = Omit<Table, Union> & Partial<Pick<Table, Union>>;

declare module 'knex/types/tables' {
    interface Tables {
        reaction_roles: ReactionRoleTable;
        shop: ShopTable;
        tag: TagTable;

        user: Knex.CompositeTableType<
            UserTable,
            MakeOptional<UserTable, 'coins' | 'xp'>,
            Partial<Omit<UserTable, 'id'>>,
            MakeOptional<UserTable, 'coins' | 'xp'>
        >;
    }
}
