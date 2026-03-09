import { copyFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const source = resolve('src/graphql/schema.graphql');
const targetDir = resolve('dist/graphql');
const target = resolve(targetDir, 'schema.graphql');

mkdirSync(targetDir, { recursive: true });
copyFileSync(source, target);

console.log('Copied schema.graphql to dist/graphql');