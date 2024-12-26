import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'
import yaml from '@rollup/plugin-yaml'
import pkg from './package.json' assert { type: 'json' }

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      exports: 'auto',
    },
    {
      file: pkg.browser,
      format: 'umd',
      name: 'OpenFlare',
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
  ],
  external: ['react', 'react-dom'],
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true,
      preferBuiltins: false,
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.yaml', '.yml'],
    }),
    commonjs({
      include: /node_modules/,
      transformMixedEsModules: true,
    }),
    yaml(),
    postcss({
      extract: true,
      minimize: true,
      sourceMap: true,
      extensions: ['.css'],
    }),
    typescript({
      useTsconfigDeclarationDir: true,
      clean: true,
    }),
  ],
}
