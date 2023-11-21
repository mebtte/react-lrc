# react-lrc [![version](https://img.shields.io/npm/v/react-lrc)](https://www.npmjs.com/package/react-lrc) [![license](https://img.shields.io/npm/l/react-lrc)](https://github.com/mebtte/react-lrc/blob/master/LICENSE) [![](https://img.shields.io/bundlephobia/minzip/react-lrc)](https://bundlephobia.com/result?p=react-lrc)

The react component to display lyric by lrc format. See [example](https://mebtte.github.io/react-lrc) or play on [CodeSandbox](https://codesandbox.io/s/3-playground-ku96gv).

## [2.x README](https://github.com/mebtte/react-lrc/blob/d714e64e5bb70a551b498559436fdd9f1d71f8ce/README.md)

## Feature

- Auto scroll smoothly
- Support multiple lrcs
- User srcollable
- Custom style
- Typescript support

## Install & Usage

```sh
npm install react-lrc
```

```jsx
import { Lrc } from 'react-lrc';

const Demo = () => {
  // ...
  return (
    <Lrc
      lrc={lrc}
      lineRenderer={lineRenderer}
      currentMillisecond={currentMillisecond}
    />
  );
};
```

## Reference

### Common Component Props

#### `lineRenderer`: ({ index: number, active: boolean, line: Line }) => React.ReactNode

The method to render every valid line of parsed lrc. `active` means whether it is current line. `Line` is `LrcLine` when using `Lrc` component or is `MultipleLrcLine` when `MultipleLrc`.

#### `currentMillisecond`?: number

Current time of lrc, default `-1`.

#### `verticalSpace`?: boolean

Make active line always vertical-middle even start or end of line list, default `false`.

without verticalSpace:

![](./docs/without_vertical_space.png)

with verticalSpace:

![](./docs/with_vertical_space.png)

#### `onLineUpdate`?: ({ index: number, line: Line | null }) => void

Call this when current line changed. `Line` is `LrcLine` when using `Lrc` component or is `MultipleLrcLine` when `MultipleLrc`.

#### `recoverAutoScrollInterval`

The interval of recovering auto scroll after user scroll. It is `millisecond`, default `5000`.

### Component `Lrc`

#### `lrc`: string

The lrc.

### Component `MultipleLrc`

#### `lrcs`: string[]

The lrc array.

### Hook `useRecoverAutoScrollImmediately`

When user scroll, `react-lrc` will stop auto scroll during `recoverAutoScrollInterval`. `useRecoverAutoScrollImmediately` helps recover auto scroll immediately.

```tsx
import { Lrc, useRecoverAutoScrollImmediately } from 'react-lrc';

const Demo = () => {
  const { signal, recoverAutoScrollImmediately } =
    useRecoverAutoScrollImmediately();

  return (
    <>
      <button type="button" onClick={recoverAutoScrollImmediately}>
        recover auto scroll immediately
      </button>
      <Lrc {...otherProps} recoverAutoScrollSingal={signal} />
    </>
  );
};
```

## Q & A

### How to prevent user scroll ?

```jsx
<Lrc
  style={{ overflow: 'hidden !important' }}
  recoverAutoScrollInterval={0}
  {...otherProps}
/>
```

### How to hide scrollbar ?

```scss
.lrc {
  /* webkit */
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  /* firefox */
  scrollbar-width: none;

  /* ie */
  -ms-overflow-style: none;
}
```

```jsx
<Lrc className="lrc" {...otherProps} />
```

## License

[MIT](./LICENSE)
