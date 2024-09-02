import { useEffect, useRef } from "react";

export function useInfiniteScroll(callback: () => void) {
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
  }, [observerTarget, callback]);

  return { observerTarget };
}
