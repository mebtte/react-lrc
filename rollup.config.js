import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { dts } from 'rollup-plugin-dts';
import pkg from './package.json';

export default [
  {
    input: 'src/index.ts',
    plugins: [typescript(), peerDepsExternal()],
    external: Object.keys(pkg.dependencies),
    output: [
      {
        file: 'dist/index.esm.js',
        format: 'esm',
      },
      {
        file: 'dist/index.cjs.js',
        format: 'cjs',
      },
    ],
  },
  {
    input: 'src/index.ts',
    plugins: [dts()],
    output: { file: 'dist/index.d.ts', format: 'es' },
  },
];
