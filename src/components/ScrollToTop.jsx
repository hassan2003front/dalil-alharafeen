import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    // Only scroll to top if the navigation is a PUSH (new page)
    // If it's a POP (back button), the browser/user usually expects to stay where they were
    if (navType === 'PUSH' || navType === 'REPLACE') {
      const scrollContainer = document.querySelector('.scroll-content');
      if (scrollContainer) {
        scrollContainer.scrollTo(0, 0);
      }
      window.scrollTo(0, 0);
    }
  }, [pathname, navType]);

  return null;
};

export default ScrollToTop;
