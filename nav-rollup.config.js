// Make sure you have a process.env.BUILD set to something that is not production
// To set on a mac write eg export BUILD=development in the terminal
// In const destinationDir change the path to desired dist folder
// Chage name of css-/jsOutput if you want another name for the build files

import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import path from 'path';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

const buildEnv = process.env.BUILD || 'production';
const destinationDir = path.resolve(__dirname, 'build/navigation');
const isProdBuild = buildEnv === 'production';
const src = path.resolve(__dirname, 'src');
const inputFile = path.resolve(src, 'index.js');
const cssOutput = path.resolve(destinationDir, 'style.css');
const jsOutput = path.resolve(destinationDir, 'navigation.js');

export default (async () => ({
    input: inputFile,
    output: {
        file: jsOutput,
        format: 'umd',
        sourcemap: !isProdBuild
    },
    plugins: [
        resolve(),
        commonjs({
            sourceMap: isProdBuild
        }),
        isProdBuild && (await import('rollup-plugin-terser')).terser(),
        babel({
            exclude: 'node_modules/**',
            extensions: ['.js'],
            runtimeHelpers: true
        }),
        postcss({
            config: true,
            sourceMap: !isProdBuild,
            extract: cssOutput,
            plugins: [
                autoprefixer,
                cssnano
            ],
            extensions: ['.scss', '.css'],
            use: ['sass']
        }),
      ]
}))()