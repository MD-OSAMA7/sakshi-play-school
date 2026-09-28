import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const scrollToHash = () => {
        const element = document.getElementById(hash.substring(1));

        if (!element) {
          return false;
        }

        element.scrollIntoView({
          behavior: "instant",
          block: "start",
        });

        return true;
      };

      // React ko pehle target section render karne ka time do.
      const firstFrame = requestAnimationFrame(() => {
        if (!scrollToHash()) {
          requestAnimationFrame(scrollToHash);
        }
      });

      return () => {
        cancelAnimationFrame(firstFrame);
      };
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;