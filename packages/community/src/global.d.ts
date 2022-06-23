import type { ReactionRoleTable } from './db/reaction_roles';
import { Knex } from 'knex';

declare module 'knex/types/tables' {
    interface Tables {
        reaction_roles: ReactionRoleTable;
    }
}
