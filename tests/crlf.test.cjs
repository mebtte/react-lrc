// Exercise the components with React's production server renderer.
process.env.NODE_ENV = 'production';

const assert = require('node:assert/strict');
const test = require('node:test');
const { createElement } = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { Lrc, MultipleLrc } = require('..');

const lrc = ['[00:01.00]one', '[00:02.00]two', '[00:03.00]three'].join('\r\n');
const translation = [
  '[00:01.00]uno',
  '[00:02.00]dos',
  '[00:03.00]tres',
  '',
].join('\r\n');

test('Lrc renders every lyric line in a CRLF-terminated string', () => {
  const contents = [];
  renderToStaticMarkup(
    createElement(Lrc, {
      lrc: `${lrc}\r\n`,
      lineRenderer: ({ line }) => {
        contents.push(line.content);
        return null;
      },
    }),
  );
  assert.deepEqual(contents, ['one', 'two', 'three']);
});

test('MultipleLrc groups CRLF lyric lines by timestamp', () => {
  const lines = [];
  renderToStaticMarkup(
    createElement(MultipleLrc, {
      lrcs: [lrc, translation],
      lineRenderer: ({ line }) => {
        lines.push([
          line.startMillisecond,
          line.children.map(({ content }) => content),
        ]);
        return null;
      },
    }),
  );
  assert.deepEqual(lines, [
    [1000, ['one', 'uno']],
    [2000, ['two', 'dos']],
    [3000, ['three', 'tres']],
  ]);
});
