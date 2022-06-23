import { getMember } from '../utils/users';
import { event } from 'jellycommands';
import { Knex } from 'knex';

export default event({
    name: 'messageReactionRemove',

    async run({ client }, reaction, user) {
        if (reaction.partial) {
            reaction = await reaction.fetch();
        }

        const db = client.props.get<Knex>('db');

        const data = await db('reaction_roles')
            .select('role_id')
            .where({
                message_id: reaction.message.id,
                emoji: reaction.emoji.toString(),
            })
            .first();

        if (data && reaction.message.guildId) {
            const member = await getMember(
                client,
                reaction.message.guildId,
                user.id,
            );

            if (!member) return;

            member.roles.remove(data.role_id);
        }
    },
});
