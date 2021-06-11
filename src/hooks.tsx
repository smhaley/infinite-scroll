import { useEffect, useState, useRef, RefObject } from "react";

interface Options {
  callback: () => Promise<unknown>;
  element: HTMLElement | null;
}

export const useInfiniteScroll = ({ callback, element }: Options) => {
  const [isFetching, setIsFetching] = useState(false);
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    if (!element) {
      return;
    }

    observer.current = new IntersectionObserver((entries) => {
      if (!isFetching && entries[0].isIntersecting) {
        setIsFetching(true);
        callback().finally(() => setIsFetching(false));
      }
    });
    observer.current.observe(element);

    return () => observer.current?.disconnect();
  }, [callback, isFetching, element]);

  return isFetching;
};

interface Args extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver(
  elementRef: RefObject<Element>,
  {
    threshold = 0,
    root = null,
    rootMargin = "0%",
    freezeOnceVisible = false,
  }: Args
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  useEffect(() => {
      console.log('fire')
    const node = elementRef?.current; // DOM Ref

    const hasIOSupport = !!window.IntersectionObserver;
    if (!hasIOSupport || frozen || !node) return;
    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);
    observer.observe(node);
    return () => observer.disconnect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef, threshold, root, rootMargin, frozen]);

  return entry;
}
