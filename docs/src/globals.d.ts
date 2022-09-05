import type { NavigationTree } from '~/components';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      version: string;
      navigation: NavigationTree;
    }
  }
}
