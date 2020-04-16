# react-lrc

The react component that display lyric from lrc format.

## Feature

- auto scroll smoothly
- user srcollable
- custom style

## Example

[https://mebtte.github.io/react-lrc](https://mebtte.github.io/react-lrc)

![](./case/demo.gif)

![](./case/cicada_default.gif)

[Static lyric](https://codesandbox.io/s/staticlrcdisplay-89q5m?file=/src/App.js)

## Requirement

- `react >= 16.8` with `hook`

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

| method              | description                                                | type                                                                       |
| ------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------- |
| scrollToCurrentLine | call this it will scroll to current line after user scroll | () => void                                                                 |
| getCurrentLine      | get the current lrc line and index                         | () => { lrcLine: { millisecond: number, content: string }, index: number } |

### `LrcLine` Props

| prop          | description                           | type | required | default |
| ------------- | ------------------------------------- | ---- | -------- | ------- |
| [key: string] | any props like `style`/`className`... | any  | false    |         |

## Question

### How to prevent user scroll ?

```jsx
<Lrc style={{ overflow: 'hidden !important' }} autoScrollAfterUserScroll={0}>
  ...
</Lrc>
```

### Can not auto scroll to correct line after `Lrc` resized ?

`window.resize` is supportted, but `Lrc.resize` is not, because i don't know how to inspect `Lrc` resize, if you know how please [tell me](https://github.com/mebtte/react-lrc/issues/1), thanks very much.

## License

MIT
