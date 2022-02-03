import { useEffect } from 'react';
import { navigate } from 'gatsby';

export default function LandingPage() {
  useEffect(() => {
    navigate('/introduction/getting-started');
  }, []);

  return null;
}
