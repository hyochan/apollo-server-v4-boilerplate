// https://stackoverflow.com/a/70106896/8841562
// @ts-ignore => Do this because jest doesn't support assert
import pkg from '../../package.json' assert {type: 'json'};

export const version: string = pkg.version;
export const USER_SIGNED_IN = 'USER_SIGNED_IN';
export const USER_UPDATED = 'USER_UPDATED';
