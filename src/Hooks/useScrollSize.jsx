/**
* https://www.robinwieruch.de/react-hook-scrollbar-width/
*/

import { useRef } from 'react';

export const useScrollSize = () => {
  const didCompute = useRef(false);
  const widthRef = useRef(0);

  if (didCompute.current) {
    return widthRef.current;
  }

  // Creating invisible container
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll'; // forcing scrollbar to appear
  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement('div');
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollSize = outer.offsetWidth - inner.offsetWidth;

  // Removing temporary elements from the DOM
  outer.parentNode.removeChild(outer);

  didCompute.current = true;
  widthRef.current = scrollSize;

  return scrollSize;
};