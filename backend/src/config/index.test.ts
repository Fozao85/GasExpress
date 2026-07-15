import { describe, it, expect } from 'vitest';
import { config } from '../config';

describe('Config', () => {
  it('should have default port', () => {
    expect(config.port).toBe(4000);
  });

  it('should have database URL', () => {
    expect(config.database.url).toBeTruthy();
  });
});
