import { useEffect } from 'react';
import { navigate } from 'gatsby';

export default function LandingPage() {
  useEffect(() => {
    navigate('/introduction/00-getting-started');
  }, []);

  return null;
}
