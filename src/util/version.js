import { readFileSync } from 'fs';
import { join } from 'path';

export function getVersion() {
    const pkg = readFileSync(join(process.cwd(), 'package.json'), 'utf-8');
    return JSON.parse(pkg).version;
}
