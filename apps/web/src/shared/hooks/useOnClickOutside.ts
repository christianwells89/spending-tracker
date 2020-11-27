import { Ref, useCallback, useEffect, useRef } from 'react';

export function useOnClickOutside<T extends HTMLElement>(handler: () => void): [Ref<T>] {
  const ref = useRef<T>(null);

  const callback = useCallback(() => {
    handler();
  }, [handler]);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent): void => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      callback();
    };

    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
  }, [ref, callback]);

  return [ref];
}
