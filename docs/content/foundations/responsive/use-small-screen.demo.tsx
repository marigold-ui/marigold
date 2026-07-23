import { useSmallScreen } from '@marigold/system';

export default () => {
  const isSmallScreen = useSmallScreen();

  return (
    <div className={isSmallScreen ? 'bg-lime-500' : 'bg-sky-500'}>
      {isSmallScreen
        ? 'Small screen (below 640px)'
        : 'Large screen (640px and up)'}
    </div>
  );
};
