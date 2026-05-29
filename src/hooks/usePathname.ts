import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/** /admin/waitlist/ → /admin/waitlist so PageRouter matches on Amplify trailing-slash URLs */
export function normalizePathname(path: string) {
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }
  return path;
}

/**
 * Keeps pathname in sync with the browser URL even when router context
 * fails to trigger a re-render (popstate + pushState/replaceState).
 */
export function usePathname() {
  const location = useLocation();
  const readPath = useCallback(
    () => normalizePathname(window.location.pathname),
    []
  );
  const [pathname, setPathname] = useState(readPath);

  useEffect(() => {
    setPathname(readPath());
  }, [location.pathname, readPath]);

  useEffect(() => {
    const sync = () => setPathname(readPath());

    window.addEventListener("popstate", sync);

    const pushState = history.pushState.bind(history);
    const replaceState = history.replaceState.bind(history);

    history.pushState = (...args) => {
      pushState(...args);
      sync();
    };
    history.replaceState = (...args) => {
      replaceState(...args);
      sync();
    };

    return () => {
      window.removeEventListener("popstate", sync);
      history.pushState = pushState;
      history.replaceState = replaceState;
    };
  }, [readPath]);

  return pathname;
}
