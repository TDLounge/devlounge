import { event } from 'jellycommands';

export default event({
    name: 'ready',
    run: () => console.log('Online'),
});
