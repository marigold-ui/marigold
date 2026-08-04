const BREAKPOINT_NAMES = ['sm', 'md', 'lg', 'xl', '2xl'] as const;

export const resolveScreens = (
  themeScreens?: Record<string, string>
): Record<string, string> => {
  if (themeScreens && Object.keys(themeScreens).length > 0) return themeScreens;
  if (typeof document === 'undefined') return {};

  const computed = getComputedStyle(document.documentElement);
  const screens: Record<string, string> = {};
  for (const name of BREAKPOINT_NAMES) {
    const value = computed.getPropertyValue(`--breakpoint-${name}`).trim();
    if (value) screens[name] = value;
  }
  return screens;
};
