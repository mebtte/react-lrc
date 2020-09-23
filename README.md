# react-lrc

The react component that display lyric from lrc format.

## Screenshot

![](./screenshot/cicada.gif)

## Feature

- auto scroll smoothly
- user srcollable
- custom style

## Requirement

- `react >= 16.8` with `hook`
- [ResizeObserver](https://caniuse.com/?search=ResizeObserver)

## Usage

```sh
npm install --save @mebtte/react-lrc
```

```jsx
import React, { useCallback } from 'react';
import { Lrc, LrcLine } from '@mebtte/react-lrc';

const Lyric = ({ lrc, currentTime }) => {
  const onCurrentLineChange = useCallback(({ millisecond, content }, index) => {
    console.log(millisecond, content, index);
  }, []);

  return (
    <Lrc
      lrc={lrc}
      currentTime={currentTime}
      onCurrentLineChange={onCurrentLineChange}
    >
      {({ millisecond, content }, active, index) => (
        <LrcLine key={index} style={{ color: active ? 'red' : 'gray' }}>
          {content}
        </LrcLine>
      )}
    </Lrc>
  );
};

export default Lyric;
```

### `Lrc` Props

| prop                      | description                                   | type                                                                                                      | required | default |
| ------------------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------- | -------- | ------- |
| lrc                       | lrc string                                    | string                                                                                                    | true     |         |
| children                  | lrc line render method, must return `LrcLine` | (lrcLine: { millisecond: number, content: string }, active: boolean, index: number) => ReactNode<LrcLine> | true     |         |
| currentTime               | current time                                  | number is **millisecond**                                                                                 | false    | 0       |
| autoScrollAfterUserScroll | recover auto scroll after user scroll         | number is **millisecond**                                                                                 | false    | 5000    |
| onCurrentLineChange       | when current line change it will emit         | (lrcLine: { millisecond: number, content: string }, index: number) => any                                 | false    | null    |
| [key: string]             | any props like `style`/`className`...         | any                                                                                                       | false    |         |

### `Lrc` Methods

| method              | description                                                | type                                                                               |
| ------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| scrollToCurrentLine | call this it will scroll to current line after user scroll | () => void                                                                         |
| getCurrentLine      | get the current lrc line and index                         | () => { lrcLine: { millisecond: number, content: string }, index: number } \| null |

## Other API

### parseLrc

```jsx
import { parseLrc } from '@mebtte/react-lrc';

parseLrc(lrcString); // { id: string, millesecond: number: content: string }[]
```

### useLrc

```jsx
import React from 'react';
import { useLrc } from '@mebtte/react-lrc';

const Component = () => {
  const lrcLineList = useLrc(lrcString); // { id: string, millesecond: number: content: string }[]
  // ...
};
```

## Question

### How to prevent user scroll ?

```jsx
<Lrc style={{ overflow: 'hidden !important' }} autoScrollAfterUserScroll={0}>
  ...
</Lrc>
```

## License

MIT
