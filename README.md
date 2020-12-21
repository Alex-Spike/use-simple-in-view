## use-simple-in-view

Simple React Hook is for monitoring when an element is in the viewport.

## Install

```
$ npm i use-simple-in-view --save
```

## Usage

Simple React Hook makes monitoring easier when an element is in the viewport. You can use it for example for virtual scroll - remove an element from DOM when it is outside of the main wrapper.

```jsx
import useSimpleInView from 'use-simple-in-view';

const MainComponent = () => {
  const rootRef = React.useRef(null);
  const padding = 200;
  const [inViewRef, inView] = useSimpleInView(rootRef, padding, []);

  return (
    <div ref={rootRef}>
      <div ref={inViewRef}>{inView && <p>I'm in view</p>}</div>
    </div>
  );
};
```

**`inViewRef`** - ref to an element that should monitor whether it is in the viewport of mainWrapper or not.

**`rootRef`** - ref to scrollable element that should listen to scroll event.

**`padding`** - padding around the root.

## Assign multiple refs to a component

You can wrap multiple `ref` assignments in a single `useCallback`:

```jsx
import React, { useRef } from 'react';
import useSimpleInView from 'use-simple-in-view';

function MainComponent(props) {
  const ref = useRef();
  const [inViewRef, inView] = useSimpleInView(rootRef, 0, []);

  const setRefs = useCallback(
    (node) => {
      ref.current = node;
      inViewRef.current = node;
    },
    [inViewRef]
  );

  return (
    <div ref={rootRef}>
      <div ref={setRefs}>Shared ref is visible: {inView}</div>
    </div>
  );
}
```
