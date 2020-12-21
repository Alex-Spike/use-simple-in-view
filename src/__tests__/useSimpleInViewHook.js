import { renderHook, act } from '@testing-library/react-hooks';
import { fireEvent } from '@testing-library/react';

import useSimpleInView from '../useSimpleInViewHook';

let element;

const setElementTopPos = (topValue) => {
  element.getBoundingClientRect = jest.fn(() => ({
    width: 0,
    height: 0,
    top: topValue,
    left: 0,
    bottom: 0,
    right: 0
  }));
};

const scroll = (container, top) => {
  setElementTopPos(top);
  fireEvent.scroll(container, { target: { scrollY: 100 } });
};

describe('useSimpleInView hook', () => {
  test('Should react on widnow scroll and change inView state', () => {
    const rootWrapper = document.createElement('div');
    element = document.createElement('div');

    const { result } = renderHook(() => {
      const [inViewRef, inView] = useSimpleInView(rootWrapper, 20, []);
      inViewRef.current = element;

      return [inViewRef, inView];
    });

    expect(result.current[0].current).toBe(element);
    expect(result.current[1]).toBe(true);

    act(() => scroll(rootWrapper, 100));

    expect(result.current[1]).toBe(false);
  });
});
