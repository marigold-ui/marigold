export const focusLandmark = (landmark: HTMLElement) => {
  const addedTabIndex = !landmark.hasAttribute('tabindex');
  if (addedTabIndex) {
    landmark.tabIndex = -1;
  }
  landmark.focus();
  return addedTabIndex;
};
