import { describe, expect, it } from 'vitest';

import { withBase } from '../src/utils/withBase';

describe('withBase', () => {
  it('returns root when no path is provided', () => {
    expect(withBase()).toBe('/');
  });

  it('keeps absolute urls unchanged', () => {
    expect(withBase('https://example.com/asset')).toBe('https://example.com/asset');
  });

  it('ensures leading slash for relative paths', () => {
    expect(withBase('assets/logo.svg')).toBe('/assets/logo.svg');
  });
});
