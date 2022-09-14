# react-lrc [![version](https://img.shields.io/npm/v/react-lrc)](https://www.npmjs.com/package/react-lrc) [![license](https://img.shields.io/npm/l/react-lrc)](https://github.com/mebtte/react-lrc/blob/master/LICENSE) [![](https://img.shields.io/bundlephobia/minzip/react-lrc)](https://bundlephobia.com/result?p=react-lrc)

The react component that display lrc format. See [example](https://mebtte.github.io/react-lrc) and play it powered by [storybook](https://storybook.js.org).

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

#### Props

##### lineRenderer: ({ index: number, active: boolean, line: LyricLine }) => React.ReactNode

Lyric line's renderer. When `active` is `true` means it is current line. `LyricLine` is exported from [clrc](https://github.com/mebtte/clrc).

##### currentMillisecond?: number

Current time of lrc string. default `0`.

##### autoScroll?: boolean

Whether to scroll when `currentMillisecond` changed. default `true`;

##### intervalOfRecoveringAutoScrollAfterUserScroll?: number

The interval of recovering auto scroll after user scroll, it is `millisecond`. default `5000`.

##### topBlank?: boolean

If `true` will insert blank space to top of `Lrc`. default `false`.

![](./docs/top_blank.png)

##### bottomBlank?: boolean

If `true` will insert blank space to bottom of `Lrc`. default `false`.

![](./docs/bottom_blank.png)

##### onLineChange?: ({ index: number; line: LyricLine | null }) => void

Call this when current line changed. `index` maybe `-1` and `line` maybe `null`. default `null`. `LyricLine` is exported from [clrc](https://github.com/mebtte/clrc).

### Component `Lrc`

##### lrc: string

The lrc string.

### Component `MultipleLrc`

## Q & A

### How to prevent user scroll ?

```jsx
<Lrc style={{ overflow: 'hidden !important' }} {...otherProps} />
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
