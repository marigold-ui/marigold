# Toast

_Toasts are used to display brief messages or notifications that appear temporarily on the screen._

A Toast is a small, temporary notification that appears on the screen to inform users about the outcome of an action or to provide brief feedback. Toasts are commonly used in applications to deliver messages such as success notifications, error alerts, or informational updates without interrupting the user's workflow.

## Anatomy

## Appearance

This component has multiple appearance variants and sizes available.

| Property  | Type                                             | Description                                 |
| :-------- | :----------------------------------------------- | :------------------------------------------ |
| `variant` | `default \| success \| warning \| info \| error` | `The available variants of this component.` |
| `size`    | `-`                                              | `The available sizes of this component.`    |

## Usage

The `<ToastProvider>` Component should be in the root of your application, so it can be used anywhere in your app. You can use the `addToast` function to add a Toast to the Toaster. The Toast will appear at the bottom right of the screen by default. with the position prop you can change the position of all Toasts.

### Simple toast

A Toast should be used when you want to give users quick, non-intrusive feedback after an action, such as saving, deleting, or uploading data. It appears on the edge of the screen and should remain visible for at least 5 seconds or until the user manually dismisses it. Because it doesn’t interrupt the user’s workflow, a Toast is ideal for success messages, notifications, or error alerts that don’t need immediate interaction. The message should be clear, concise, and easy to read.

```tsx title="toast-simple"
import { Button, ToastProvider, useToast } from '@marigold/components';

export default () => {
  const { addToast } = useToast();

  return (
    <>
      <ToastProvider position="bottom-right" />
      <Button
        onPress={() => addToast({ title: 'Simple Toast', variant: 'success' })}
      >
        Show Toast
      </Button>
    </>
  );
};
```

### Auto dismiss

This Toast will automatically dismiss itself after a specified duration.
This is useful for notifications that do not require user interaction and should disappear after a short time. The time is in milliseconds.

```tsx title="toast-auto-dismiss"
import { Button, useToast } from '@marigold/components';

export default () => {
  const { addToast } = useToast();

  return (
    <>
      <Button
        onPress={() =>
          addToast({
            title: 'Updated',
            description: 'I will vanish after 5 seconds',
            variant: 'info',
            timeout: 5000,
          })
        }
      >
        Show Toast
      </Button>
    </>
  );
};
```

### Programmatic dismiss

`addToast` does return the key of the Toast, with this the Toast can be dismissed programmatically, by saving the key of the Toast and then using `removeToast`.

```tsx title="toast-programmatic-dismiss"
import { useState } from 'react';
import { Button, useToast } from '@marigold/components';

export default () => {
  const [toastKey, setToastKey] = useState<string | null>(null);
  const { addToast, removeToast } = useToast();

  return (
    <>
      <Button
        onPress={() => {
          if (!toastKey) {
            setToastKey(
              addToast({
                title: 'Error',
                description: 'Click the Hide Toast button to dismiss me!',
                variant: 'error',
              })
            );
          } else {
            removeToast(toastKey);
            setToastKey(null);
          }
        }}
      >
        {toastKey ? 'Hide' : 'Show'} Toast
      </Button>
    </>
  );
};
```

### Close all toasts

All Toasts can be dismissed with `clearToasts`.

```tsx title="toast-close-all"
import { Button, useToast } from '@marigold/components';

export default () => {
  const { addToast, clearToasts } = useToast();

  return (
    <div className="flex flex-row gap-2">
      <Button
        onPress={() =>
          addToast({
            title: 'Updated Settings',
            variant: 'success',
          })
        }
      >
        Show Toast
      </Button>
      <Button onPress={clearToasts}>Clear Toasts</Button>
    </div>
  );
};
```

### Action

Toasts can also include an action element, which is typically a button or link that allows the user to take a specific action related to the toast message. This is useful for scenarios where you want to provide users with a way to respond to the notification.

To add an action element, use the `action` prop which accepts any React component (button, link, etc.).

```tsx title="toast-action"
import { Button, Link, useToast } from '@marigold/components';

export default () => {
  const { addToast } = useToast();

  return (
    <div className="flex flex-row gap-2">
      <Button
        onPress={() =>
          addToast({
            title: 'Update Available',
            variant: 'info',
            description: 'A new version is available.',
            timeout: 0,
            action: (
              <Link size="small" href="https://github.com/marigold-ui/marigold">
                Update now
              </Link>
            ),
          })
        }
      >
        Show Toast with Link
      </Button>
      <Button
        onPress={() =>
          addToast({
            title: 'File Upload Failed',
            variant: 'error',
            description:
              'The file could not be uploaded due to network issues.',
            timeout: 0,
            action: (
              <Button size="small" variant="primary">
                Retry
              </Button>
            ),
          })
        }
      >
        Show Toast with Button
      </Button>
    </div>
  );
};
```

## Props

### Toast Provider

| Prop                        | Type                     | Default           | Description                                                                                        |
| :-------------------------- | :----------------------- | :---------------- | :------------------------------------------------------------------------------------------------- |
| aria-describedby            | `string`                 | -                 | Identifies the element (or elements) that describes the object.                                    |
| aria-details                | `string`                 | -                 | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| aria-label                  | `string`                 | `"Notifications"` | An accessibility label for the toast region.                                                       |
| aria-labelledby             | `string`                 | -                 | Identifies the element (or elements) that labels the current element.                              |
| dir                         | `string`                 | -                 |                                                                                                    |
| hidden                      | `boolean`                | -                 |                                                                                                    |
| inert                       | `boolean`                | -                 |                                                                                                    |
| lang                        | `string`                 | -                 |                                                                                                    |
| onAnimationEnd              | `AnimationEventHandler`  | -                 |                                                                                                    |
| onAnimationEndCapture       | `AnimationEventHandler`  | -                 |                                                                                                    |
| onAnimationIteration        | `AnimationEventHandler`  | -                 |                                                                                                    |
| onAnimationIterationCapture | `AnimationEventHandler`  | -                 |                                                                                                    |
| onAnimationStart            | `AnimationEventHandler`  | -                 |                                                                                                    |
| onAnimationStartCapture     | `AnimationEventHandler`  | -                 |                                                                                                    |
| onAuxClick                  | `MouseEventHandler`      | -                 |                                                                                                    |
| onAuxClickCapture           | `MouseEventHandler`      | -                 |                                                                                                    |
| onClick                     | `MouseEventHandler`      | -                 |                                                                                                    |
| onClickCapture              | `MouseEventHandler`      | -                 |                                                                                                    |
| onContextMenu               | `MouseEventHandler`      | -                 |                                                                                                    |
| onContextMenuCapture        | `MouseEventHandler`      | -                 |                                                                                                    |
| onDoubleClick               | `MouseEventHandler`      | -                 |                                                                                                    |
| onDoubleClickCapture        | `MouseEventHandler`      | -                 |                                                                                                    |
| onGotPointerCapture         | `PointerEventHandler`    | -                 |                                                                                                    |
| onGotPointerCaptureCapture  | `PointerEventHandler`    | -                 |                                                                                                    |
| onLostPointerCapture        | `PointerEventHandler`    | -                 |                                                                                                    |
| onLostPointerCaptureCapture | `PointerEventHandler`    | -                 |                                                                                                    |
| onMouseDown                 | `MouseEventHandler`      | -                 |                                                                                                    |
| onMouseDownCapture          | `MouseEventHandler`      | -                 |                                                                                                    |
| onMouseEnter                | `MouseEventHandler`      | -                 |                                                                                                    |
| onMouseLeave                | `MouseEventHandler`      | -                 |                                                                                                    |
| onMouseMove                 | `MouseEventHandler`      | -                 |                                                                                                    |
| onMouseMoveCapture          | `MouseEventHandler`      | -                 |                                                                                                    |
| onMouseOut                  | `MouseEventHandler`      | -                 |                                                                                                    |
| onMouseOutCapture           | `MouseEventHandler`      | -                 |                                                                                                    |
| onMouseOver                 | `MouseEventHandler`      | -                 |                                                                                                    |
| onMouseOverCapture          | `MouseEventHandler`      | -                 |                                                                                                    |
| onMouseUp                   | `MouseEventHandler`      | -                 |                                                                                                    |
| onMouseUpCapture            | `MouseEventHandler`      | -                 |                                                                                                    |
| onPointerCancel             | `PointerEventHandler`    | -                 |                                                                                                    |
| onPointerCancelCapture      | `PointerEventHandler`    | -                 |                                                                                                    |
| onPointerDown               | `PointerEventHandler`    | -                 |                                                                                                    |
| onPointerDownCapture        | `PointerEventHandler`    | -                 |                                                                                                    |
| onPointerEnter              | `PointerEventHandler`    | -                 |                                                                                                    |
| onPointerLeave              | `PointerEventHandler`    | -                 |                                                                                                    |
| onPointerMove               | `PointerEventHandler`    | -                 |                                                                                                    |
| onPointerMoveCapture        | `PointerEventHandler`    | -                 |                                                                                                    |
| onPointerOut                | `PointerEventHandler`    | -                 |                                                                                                    |
| onPointerOutCapture         | `PointerEventHandler`    | -                 |                                                                                                    |
| onPointerOver               | `PointerEventHandler`    | -                 |                                                                                                    |
| onPointerOverCapture        | `PointerEventHandler`    | -                 |                                                                                                    |
| onPointerUp                 | `PointerEventHandler`    | -                 |                                                                                                    |
| onPointerUpCapture          | `PointerEventHandler`    | -                 |                                                                                                    |
| onScroll                    | `UIEventHandler`         | -                 |                                                                                                    |
| onScrollCapture             | `UIEventHandler`         | -                 |                                                                                                    |
| onTouchCancel               | `TouchEventHandler`      | -                 |                                                                                                    |
| onTouchCancelCapture        | `TouchEventHandler`      | -                 |                                                                                                    |
| onTouchEnd                  | `TouchEventHandler`      | -                 |                                                                                                    |
| onTouchEndCapture           | `TouchEventHandler`      | -                 |                                                                                                    |
| onTouchMove                 | `TouchEventHandler`      | -                 |                                                                                                    |
| onTouchMoveCapture          | `TouchEventHandler`      | -                 |                                                                                                    |
| onTouchStart                | `TouchEventHandler`      | -                 |                                                                                                    |
| onTouchStartCapture         | `TouchEventHandler`      | -                 |                                                                                                    |
| onTransitionCancel          | `TransitionEventHandler` | -                 |                                                                                                    |
| onTransitionCancelCapture   | `TransitionEventHandler` | -                 |                                                                                                    |
| onTransitionEnd             | `TransitionEventHandler` | -                 |                                                                                                    |
| onTransitionEndCapture      | `TransitionEventHandler` | -                 |                                                                                                    |
| onTransitionRun             | `TransitionEventHandler` | -                 |                                                                                                    |
| onTransitionRunCapture      | `TransitionEventHandler` | -                 |                                                                                                    |
| onTransitionStart           | `TransitionEventHandler` | -                 |                                                                                                    |
| onTransitionStartCapture    | `TransitionEventHandler` | -                 |                                                                                                    |
| onWheel                     | `WheelEventHandler`      | -                 |                                                                                                    |
| onWheelCapture              | `WheelEventHandler`      | -                 |                                                                                                    |
| position                    | `ObjectFitProp`          | `"bottom-right"`  |                                                                                                    |
| translate                   | `"yes" \| "no"`          | -                 |                                                                                                    |
