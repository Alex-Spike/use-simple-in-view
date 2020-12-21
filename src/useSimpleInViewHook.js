import React from 'react';
import isInViewHelper from './isInViewport.helper';

export default (rootWrapper, padding, deps) => {
  const elementRef = React.useRef(null);
  const isHidden = React.useRef(false);
  const [isInViewState, setIsInViewState] = React.useState(false);

  React.useEffect(() => {
    const onScroll = (event) => {
      const isElementInView = isInViewHelper(event.target, elementRef.current, padding);

      if (!isElementInView && !isHidden.current) {
        setIsInViewState(false);

        isHidden.current = true;
      }

      if (isElementInView && isHidden.current) {
        setIsInViewState(true);

        isHidden.current = false;
      }

      event.preventDefault();
    };

    rootWrapper.addEventListener('scroll', onScroll);

    if (isInViewHelper(rootWrapper, elementRef.current, padding)) {
      setIsInViewState(true);

      isHidden.current = false;
    } else {
      setIsInViewState(false);

      isHidden.current = true;
    }

    return () => {
      rootWrapper.removeEventListener('scroll', onScroll);
    };
  }, [rootWrapper, padding, ...deps]);

  return [elementRef, isInViewState];
};
