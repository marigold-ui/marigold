import { describe, expect, it } from 'vitest';
import { get } from './object.utils';

describe('get', () => {
  it('should get a value from a flat object', () => {
    const obj = { name: 'John', age: 30 };

    expect(get(obj, 'name')).toBe('John');
    expect(get(obj, 'age')).toBe(30);
  });

  it('should get a value from a nested object using dot notation', () => {
    const obj = {
      user: {
        profile: {
          name: 'Jane',
          email: 'jane@example.com',
        },
      },
    };

    expect(get(obj, 'user.profile.name')).toBe('Jane');
    expect(get(obj, 'user.profile.email')).toBe('jane@example.com');
  });

  it('should return fallback when path does not exist', () => {
    const obj = { name: 'John' };

    expect(get(obj, 'age', 0)).toBe(0);
    expect(get(obj, 'address.street', 'N/A')).toBe('N/A');
  });

  it('should return undefined when path does not exist and no fallback provided', () => {
    const obj = { name: 'John' };

    expect(get(obj, 'age')).toBeUndefined();
    expect(get(obj, 'user.profile.name')).toBeUndefined();
  });

  it('should return fallback when value is undefined', () => {
    const obj = { name: undefined };

    expect(get(obj, 'name', 'Unknown')).toBe('Unknown');
  });

  it('should return the actual value if it is falsy but not undefined', () => {
    const obj = { count: 0, active: false, empty: '' };

    expect(get(obj, 'count')).toBe(0);
    expect(get(obj, 'active')).toBe(false);
    expect(get(obj, 'empty')).toBe('');
  });

  it('should stop at the first undefined key in the path', () => {
    const obj = {
      user: {
        profile: {
          name: 'John',
        },
      },
    };

    expect(get(obj, 'user.invalid.name', 'default')).toBe('default');
    expect(get(obj, 'user.profile.age', 0)).toBe(0);
  });

  it('should work with deeply nested objects', () => {
    const obj = {
      level1: {
        level2: {
          level3: {
            level4: {
              value: 'deep',
            },
          },
        },
      },
    };

    expect(get(obj, 'level1.level2.level3.level4.value')).toBe('deep');
  });

  it('should handle arrays in paths', () => {
    const obj = {
      users: [{ name: 'John' }, { name: 'Jane' }],
    };

    expect(get(obj, 'users.0.name')).toBe('John');
    expect(get(obj, 'users.1.name')).toBe('Jane');
  });

  it('should handle null values in the path', () => {
    const obj = {
      user: null,
    };

    expect(get(obj, 'user', 'fallback')).toBe(null);
  });

  it('should handle complex nested structures', () => {
    const obj = {
      app: {
        config: {
          database: {
            host: 'localhost',
            port: 5432,
            credentials: {
              username: 'admin',
              password: 'secret',
            },
          },
        },
      },
    };

    expect(get(obj, 'app.config.database.host')).toBe('localhost');
    expect(get(obj, 'app.config.database.credentials.username')).toBe('admin');
    expect(get(obj, 'app.config.database.ssl', false)).toBe(false);
  });

  it('should return the fallback value with the correct type', () => {
    const obj = {};

    expect(get(obj, 'count', 0)).toBe(0);
    expect(get(obj, 'name', '')).toBe('');
    expect(get(obj, 'active', true)).toBe(true);
    expect(get(obj, 'items', [])).toEqual([]);
    expect(get(obj, 'config', {})).toEqual({});
  });
});
