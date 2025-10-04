import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

const scrollPositions = new Map<string, number>();

export default function ScrollManager() {
  const location = useLocation();
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    const saveScroll = () => {
      scrollPositions.set(prevPath.current, window.scrollY);
    };

    window.addEventListener("beforeunload", saveScroll);
    return () => {
      saveScroll();
      window.removeEventListener("beforeunload", saveScroll);
    };
  }, [location]);

  useEffect(() => {
    const currentPath = location.pathname;
    const savedY = scrollPositions.get(currentPath);

    if (savedY !== undefined) {
      window.scrollTo(0, savedY);
    } else {
      window.scrollTo(0, 0);
    }

    prevPath.current = currentPath;
  }, [location]);

  return null;
}
