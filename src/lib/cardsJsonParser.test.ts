import { describe, it, expect } from 'vitest';
import { parseJson } from './cardsJsonParser';
import billDozerJson from '../test/json/billDozer';

describe('cardJsonParser', () => {
  it('should correctly parse valid JSON', () => {
    const expectedOutput = false;

    expect(parseJson(billDozerJson)).toEqual(expectedOutput);
  });
});
