# react-lrc [![version](https://img.shields.io/npm/v/react-lrc)](https://www.npmjs.com/package/react-lrc) [![license](https://img.shields.io/npm/l/react-lrc)](https://github.com/mebtte/react-lrc/blob/master/LICENSE)

The react component that display lrc format. If using `react-natvie`, you can use [react-native-lrc](https://github.com/wubocong/react-native-lrc).

## [1.x README](https://github.com/mebtte/react-lrc/blob/74df10e762b12fce1ca54bab27a6d4844be25503/README.md)

## Example

## Feature

- Auto scroll smoothly
- User srcollable
- Custom style

## Requirement

- `react >= 16.8` with `hook`
- [ResizeObserver](https://caniuse.com/?search=ResizeObserver)

## Usage

```sh
npm install --save react-lrc
```

### `Lrc` Props

### `Lrc` Methods

## Other API

## Typescript support

## Question

### Why lrc component do not auto scroll ?

You probably do not specify `height` to `Lrc`. The `height` make `Lrc` scrollable.

### How to prevent user scroll ?

```jsx
<Lrc
  style={{ overflow: 'hidden !important' }}
  autoScrollAfterUserScroll={0}
  {...otherProps}
/>
```

### How to hide scrollbar ?

```scss
.lrc {
  /* webkit */
  ::-webkit-scrollbar {
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
