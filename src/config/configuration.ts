import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { exit } from '@nestjs/cli/actions';

export default () => {
  if (process.env.NODE_ENV == undefined) {
    console.log('Please set the node environment.');
    exit();
  }
  return yaml.load(
    readFileSync(
      join(__dirname, `./config/${process.env.NODE_ENV}.config.yaml`),
      'utf8',
    ),
  ) as Record<string, any>;
  // return yaml.load(
  //   readFileSync(join(__dirname, `development.config.yaml`), 'utf8'),
  // ) as Record<string, any>;
};
