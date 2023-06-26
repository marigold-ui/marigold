import type { NavigationTree, NavigationLinks } from '~/components';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      version: string;
      navigation: {
        tree: NavigationTree;
        links: NavigationLinks;
      };
    }
  }
}
