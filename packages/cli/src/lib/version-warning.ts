import { installedVersion } from './doctor/package-json.js';
import { compareVersions } from './doctor/version.js';
import { type Manifest, loadManifest } from './manifest.js';

const COMPONENTS = '@marigold/components';

export interface VersionWarning {
  installed: string;
  docs: string;
  message: string;
}

// New components and props ship in minor releases, fixes in patches. An app a
// patch behind is missing nothing the docs describe, and many apps always are,
// so a warning there would fire on nearly every call and get ignored.
const minorOf = (version: string): string =>
  `${version.split('.').slice(0, 2).join('.')}.0`;

/**
 * The docs always describe the latest release. Warn when the app has an older
 * minor or major version of `@marigold/components`, so a reader knows a prop
 * may not exist for them yet. Silent when either version is unknown.
 */
export const versionWarning = (
  manifest: Pick<Manifest, 'packages'> | null,
  cwd: string
): VersionWarning | null => {
  const docs = manifest?.packages?.[COMPONENTS];
  const installed = installedVersion(cwd, COMPONENTS);
  if (
    !docs ||
    !installed ||
    compareVersions(minorOf(installed), minorOf(docs)) >= 0
  ) {
    return null;
  }
  return {
    installed,
    docs,
    message: `These docs describe ${COMPONENTS} ${docs}, but ${installed} is installed. Some components or props may not exist in your version.`,
  };
};

/** Never throws: a missing manifest only means no warning. */
export const loadVersionWarning = async ({
  cwd = process.cwd(),
  offline,
}: {
  cwd?: string;
  offline?: boolean;
} = {}): Promise<VersionWarning | null> => {
  try {
    const { manifest } = await loadManifest({ offline });
    return versionWarning(manifest, cwd);
  } catch {
    return null;
  }
};
