import { useEffect, useState } from 'react';
import { Box, Button } from '@marigold/components';
import { ChevronUp } from '@marigold/icons';
import { useComponentStyles } from '@marigold/system';
import { colors } from '~/theme/colors';

export const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', toggleVisible);
    }
  });

  const styles = useComponentStyles('ScrollToTop');

  return (
    <Box css={styles} style={{ display: visible ? 'inline' : 'none' }}>
      <Button variant="scrollToTop" onClick={scrollToTop}>
        <ChevronUp fill={`${colors.brand.primary}`} />
      </Button>
    </Box>
  );
};
