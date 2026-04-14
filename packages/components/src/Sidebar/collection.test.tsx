import { vi } from 'vitest';
import {
  SidebarGroupLabel,
  SidebarItem,
  SidebarSeparator,
} from './SidebarItem';
import {
  applyCurrent,
  buildCollection,
  findActiveBranch,
  normalizePath,
  resolveCurrent,
} from './collection';

test('buildCollection.getItem returns nodes by key', () => {
  const jsx = [
    <SidebarItem key="home" id="home" href="/home">
      Home
    </SidebarItem>,
    <SidebarSeparator key="sep" />,
    <SidebarItem key="about" id="about" href="/about">
      About
    </SidebarItem>,
  ];

  const collection = buildCollection(jsx);

  const home = collection.getItem('home');
  expect(home).toBeDefined();
  expect(home?.type).toBe('item');

  const about = collection.getItem('about');
  expect(about).toBeDefined();

  // Non-existent key returns undefined
  expect(collection.getItem('nonexistent')).toBeUndefined();
});

test('buildCollection handles group labels and separators in index', () => {
  const jsx = [
    <SidebarGroupLabel key="label">Section</SidebarGroupLabel>,
    <SidebarItem key="item" id="item-1" href="/page">
      Page
    </SidebarItem>,
    <SidebarSeparator key="sep" />,
  ];

  const collection = buildCollection(jsx);

  expect(collection.rootNodes).toHaveLength(3);
  expect(collection.rootNodes[0].type).toBe('groupLabel');
  expect(collection.rootNodes[1].type).toBe('item');
  expect(collection.rootNodes[2].type).toBe('separator');
  expect(collection.getItem('item-1')).toBeDefined();
});

test('findActiveBranch returns null when no item is active', () => {
  const jsx = [
    <SidebarItem key="home" id="home" href="/home">
      Home
    </SidebarItem>,
    <SidebarItem key="branch" id="branch" textValue="Branch">
      Branch
      <SidebarItem href="/child">Child</SidebarItem>
    </SidebarItem>,
  ];

  const collection = buildCollection(jsx);

  expect(findActiveBranch(collection)).toBeNull();
});

test('findActiveBranch returns null when active item is at root level', () => {
  const jsx = [
    <SidebarItem key="home" id="home" href="/home" active>
      Home
    </SidebarItem>,
    <SidebarItem key="branch" id="branch" textValue="Branch">
      Branch
      <SidebarItem href="/child">Child</SidebarItem>
    </SidebarItem>,
  ];

  const collection = buildCollection(jsx);

  // Active item is at root, not inside a branch
  expect(findActiveBranch(collection)).toBeNull();
});

describe('collection.ts edge cases', () => {
  test('buildCollection skips unrecognized children', () => {
    const jsx = [
      <SidebarItem key="a" id="a" href="/a">
        A
      </SidebarItem>,
      <div key="unknown">I am not a sidebar element</div>,
      <SidebarItem key="b" id="b" href="/b">
        B
      </SidebarItem>,
    ];

    const collection = buildCollection(jsx);

    expect(collection.rootNodes).toHaveLength(2);
    expect(collection.rootNodes[0].key).toBe('a');
    expect(collection.rootNodes[1].key).toBe('b');
  });

  test('buildCollection extracts textValue from non-string children as empty', () => {
    const jsx = [
      <SidebarItem key="icon-item" id="icon-item">
        {/* Only non-string children: icon element + nested SidebarItem */}
        <span>Icon</span>
        <SidebarItem href="/child" active>
          Child
        </SidebarItem>
      </SidebarItem>,
    ];

    const collection = buildCollection(jsx);
    const node = collection.getItem('icon-item');

    expect(node).toBeDefined();
    // textValue should be empty since there are no direct string children
    expect(node?.type === 'item' && node.textValue).toBe('');
  });

  test('findActiveBranch finds deeply nested active item', () => {
    const jsx = [
      <SidebarItem key="root-branch" id="root-branch" textValue="Root Branch">
        Root Branch
        <SidebarItem id="mid-branch" textValue="Mid Branch">
          Mid Branch
          <SidebarItem href="/deep" active>
            Deep Leaf
          </SidebarItem>
        </SidebarItem>
      </SidebarItem>,
    ];

    const collection = buildCollection(jsx);

    expect(findActiveBranch(collection)).toBe('root-branch');
  });

  test('firstLeafHref returns undefined when branch has no leaf hrefs', () => {
    const jsx = [
      <SidebarItem key="empty" id="empty" textValue="Empty">
        Empty
        <SidebarItem>No href</SidebarItem>
      </SidebarItem>,
    ];

    const collection = buildCollection(jsx);
    const node = collection.getItem('empty');

    // Branch node should have undefined href since no leaf has an href
    expect(node?.type === 'item' && node.href).toBeUndefined();
  });
});

describe('normalizePath helper', () => {
  test('normalizePath returns root unchanged', () => {
    expect(normalizePath('/')).toBe('/');
  });

  test('normalizePath strips query string', () => {
    expect(normalizePath('/users?page=2')).toBe('/users');
  });

  test('normalizePath strips hash fragment', () => {
    expect(normalizePath('/users#top')).toBe('/users');
  });

  test('normalizePath strips both query and hash', () => {
    expect(normalizePath('/users?page=2#top')).toBe('/users');
  });

  test('normalizePath strips trailing slash', () => {
    expect(normalizePath('/users/')).toBe('/users');
  });

  test('normalizePath collapses multiple trailing slashes', () => {
    expect(normalizePath('/users///')).toBe('/users');
  });

  test('normalizePath preserves root when input is empty after stripping', () => {
    expect(normalizePath('?foo=bar')).toBe('/');
  });
});

const navJsx = () => [
  <SidebarItem key="home" id="home" href="/">
    Home
  </SidebarItem>,
  <SidebarItem key="overview" id="overview" href="/overview">
    Overview
  </SidebarItem>,
  <SidebarItem key="users" id="users" href="/users">
    Users
  </SidebarItem>,
  <SidebarItem key="users-list" id="users-list" href="/users/list">
    Users List
  </SidebarItem>,
];

describe('resolveCurrent: string mode', () => {
  test('resolveCurrent: exact match wins', () => {
    const collection = buildCollection(navJsx());
    const active = resolveCurrent(collection, '/overview');

    expect(Array.from(active)).toEqual(['overview']);
  });

  test('resolveCurrent: longest segment-prefix match wins for dynamic routes', () => {
    const collection = buildCollection(navJsx());
    const active = resolveCurrent(collection, '/users/abc-123');

    // /users is a segment prefix of /users/abc-123, /users/list is not
    expect(Array.from(active)).toEqual(['users']);
  });

  test('resolveCurrent: prefers longer segment-prefix when multiple match', () => {
    const collection = buildCollection(navJsx());
    const active = resolveCurrent(collection, '/users/list/abc-123');

    // Both /users and /users/list are prefixes — longer wins
    expect(Array.from(active)).toEqual(['users-list']);
  });

  test('resolveCurrent: root "/" never acts as a prefix', () => {
    const collection = buildCollection(navJsx());
    const active = resolveCurrent(collection, '/anything-else');

    // Home (href "/") would be a "prefix" of everything if not excluded
    expect(active.size).toBe(0);
  });

  test('resolveCurrent: root "/" matches itself exactly', () => {
    const collection = buildCollection(navJsx());
    const active = resolveCurrent(collection, '/');

    expect(Array.from(active)).toEqual(['home']);
  });

  test('resolveCurrent: segment boundary required (no partial-segment match)', () => {
    const collection = buildCollection(navJsx());
    // /user is NOT a segment prefix of /users (no `/` boundary)
    const active = resolveCurrent(collection, '/user');

    expect(active.size).toBe(0);
  });

  test('resolveCurrent: query string and hash are stripped from input', () => {
    const collection = buildCollection(navJsx());
    const active = resolveCurrent(collection, '/overview?tab=stats#top');

    expect(Array.from(active)).toEqual(['overview']);
  });

  test('resolveCurrent: trailing slash on input is normalized', () => {
    const collection = buildCollection(navJsx());
    const active = resolveCurrent(collection, '/overview/');

    expect(Array.from(active)).toEqual(['overview']);
  });

  test('resolveCurrent: branches are excluded from string matching', () => {
    const jsx = [
      <SidebarItem key="branch" id="branch" textValue="Branch">
        Branch
        <SidebarItem href="/users/list" id="leaf">
          Users List
        </SidebarItem>
      </SidebarItem>,
    ];
    const collection = buildCollection(jsx);

    // Branch derives href = "/users/list" via firstLeafHref, but only the leaf
    // should appear in the active set. Branch highlighting is the job of
    // findActiveBranch.
    const active = resolveCurrent(collection, '/users/list');

    expect(Array.from(active)).toEqual(['leaf']);
  });

  test('resolveCurrent: empty set when no leaf matches', () => {
    const collection = buildCollection(navJsx());
    const active = resolveCurrent(collection, '/nonexistent');

    expect(active.size).toBe(0);
  });

  test('resolveCurrent: returns empty when current is undefined', () => {
    const collection = buildCollection(navJsx());
    const active = resolveCurrent(collection, undefined);

    expect(active.size).toBe(0);
  });
});

describe('resolveCurrent: function mode', () => {
  test('resolveCurrent: predicate is called per leaf with (href, key)', () => {
    const collection = buildCollection(navJsx());
    const calls: Array<[string | undefined, string]> = [];

    resolveCurrent(collection, (href, key) => {
      calls.push([href, key]);
      return false;
    });

    expect(calls).toEqual([
      ['/', 'home'],
      ['/overview', 'overview'],
      ['/users', 'users'],
      ['/users/list', 'users-list'],
    ]);
  });

  test('resolveCurrent: predicate can match multiple leaves', () => {
    const collection = buildCollection(navJsx());
    const active = resolveCurrent(collection, href =>
      href ? href.startsWith('/users') : false
    );

    expect(Array.from(active).sort()).toEqual(['users', 'users-list']);
  });
});

describe('resolveCurrent: dev-mode duplicate href warning', () => {
  test('resolveCurrent: warns in dev when two leaves share an href', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const jsx = [
      <SidebarItem key="a" id="a" href="/dup">
        A
      </SidebarItem>,
      <SidebarItem key="b" id="b" href="/dup">
        B
      </SidebarItem>,
    ];
    const collection = buildCollection(jsx);

    resolveCurrent(collection, '/dup');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0]).toMatch(/share the same href "\/dup"/);

    spy.mockRestore();
  });

  test('resolveCurrent: duplicate-href tiebreak picks first in document order', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const jsx = [
      <SidebarItem key="first" id="first" href="/dup">
        First
      </SidebarItem>,
      <SidebarItem key="second" id="second" href="/dup">
        Second
      </SidebarItem>,
    ];
    const collection = buildCollection(jsx);
    const active = resolveCurrent(collection, '/dup');

    expect(Array.from(active)).toEqual(['first']);

    spy.mockRestore();
  });

  test('resolveCurrent: branch sharing href with first leaf does NOT warn', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const jsx = [
      <SidebarItem key="branch" id="branch" textValue="Branch">
        Branch
        <SidebarItem id="leaf" href="/users">
          Users
        </SidebarItem>
      </SidebarItem>,
    ];
    const collection = buildCollection(jsx);

    // Branch.href === "/users" via firstLeafHref. Should not trigger duplicate
    // warning because branches are excluded from leaf duplicate-detection.
    resolveCurrent(collection, '/users');

    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});

describe('applyCurrent', () => {
  test('applyCurrent sets active=true on matched nodes', () => {
    const collection = buildCollection(navJsx());

    applyCurrent(collection, new Set(['overview']));

    const node = collection.getItem('overview');
    expect(node?.type === 'item' && node.active).toBe(true);
  });

  test('applyCurrent does not unset active=true on items not in the set', () => {
    const jsx = [
      <SidebarItem key="explicit" id="explicit" href="/explicit" active>
        Explicit
      </SidebarItem>,
      <SidebarItem key="other" id="other" href="/other">
        Other
      </SidebarItem>,
    ];
    const collection = buildCollection(jsx);

    applyCurrent(collection, new Set(['other']));

    // Explicit override is preserved, other becomes active
    const explicit = collection.getItem('explicit');
    const other = collection.getItem('other');
    expect(explicit?.type === 'item' && explicit.active).toBe(true);
    expect(other?.type === 'item' && other.active).toBe(true);
  });

  test('applyCurrent walks nested branches', () => {
    const jsx = [
      <SidebarItem key="branch" id="branch" textValue="Branch">
        Branch
        <SidebarItem id="nested" href="/nested">
          Nested
        </SidebarItem>
      </SidebarItem>,
    ];
    const collection = buildCollection(jsx);

    applyCurrent(collection, new Set(['nested']));

    const nested = collection.getItem('nested');
    expect(nested?.type === 'item' && nested.active).toBe(true);
  });
});
