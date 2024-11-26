import stringify from 'fast-json-stable-stringify';
import xxhash from 'xxhashjs';

export const getHash = (obj: object): string => xxhash.h32(stringify(obj), 0xABCD).toString(16)