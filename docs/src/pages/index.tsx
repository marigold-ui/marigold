import { useEffect } from 'react';
import { navigate } from 'gatsby';

export default function LandingPage() {
  useEffect(() => {
    navigate('/guides/installation');
  }, []);

  return null;
}
