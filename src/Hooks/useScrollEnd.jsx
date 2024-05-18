/**
 * useScrollEnd.jsx
 * https://dirask.com/posts/React-scroll-stop-event-DkBe01
 */

// Note: uncomment import lines in your project.
import React from 'react';
// import ReactDOM from 'react-dom';

const createScrollEndListener = (element, callback, timeout) => {
  let removed = false;
  let handle = null;

  const onScroll = () => {
    if (handle) {
      clearTimeout(handle);
    }
    handle = setTimeout(callback, timeout);
  };

  element.addEventListener("scroll", onScroll);

  // For cleaning up
  return () => {
    if (removed) {
      return;
    }

    removed = true;

    if (handle) {
      clearTimeout(handle);
    }

    element.removeEventListener("scroll", onScroll);
  };
};

export const useScrollEnd = (callback, timeout=200) => {
  const containerRef = React.useRef();
  const callbackRef = React.useRef();
  callbackRef.current = callback;

  React.useEffect(() => {
    if (!containerRef.current) {
      // console.log("No ref to element")
      return
    }

    const destroyListener = createScrollEndListener(
      containerRef.current,
      () => {
        if (callbackRef.current) {
          callbackRef.current();
        }
      },
      timeout
    );

    return () => destroyListener();
  }, [containerRef.current]);

  return containerRef;
};
