/* eslint-disable import/no-extraneous-dependencies */
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import { visualizer } from 'rollup-plugin-visualizer';
import filesize from 'rollup-plugin-filesize';
import typescript from 'rollup-plugin-typescript2';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import * as dotenv from 'dotenv';
import pkg from './package.json' assert { type: 'json' };

dotenv.config();

const INTG_SUFFIX = '_RS';
const isLegacyBuild = process.env.BROWSERSLIST_ENV !== 'modern';
const variantSubfolder = isLegacyBuild ? '/legacy' : '/modern';
const sourceMapType =
  process.env.PROD_DEBUG === 'inline' ? 'inline' : process.env.PROD_DEBUG === 'true';
const outDirNpmRoot = `dist/npm`;
const outDirCDNRoot = `dist/cdn`;
const outDirNpm = `${outDirNpmRoot}${variantSubfolder}/js-integrations`;
const outDirCDN = `${outDirCDNRoot}${variantSubfolder}/js-integrations`;
const distName = process.env.INTG_NAME;
const modName = `${process.env.INTG_NAME}${INTG_SUFFIX}`;

export function getOutputFilePath(dirPath, distName) {
  const fileNamePrefix = `${distName}${process.env.STAGING === 'true' ? '-staging' : ''}`;
  const fileNameSuffix = process.env.PROD_DEBUG === 'inline' ? '-map' : '';
  let outFilePath = '';

  if (process.env.ENV === 'prod') {
    outFilePath = `${dirPath}/${fileNamePrefix}${fileNameSuffix}.min.js`;
  } else {
    outFilePath = `${dirPath}/${fileNamePrefix}.js`;
  }
  return outFilePath;
}

export function getDefaultConfig(distName, moduleType = 'cdn') {
  const version = process.env.VERSION || 'dev-snapshot';
  // TODO: was: const moduleType = process.env.NPM === 'true' ? 'npm' : 'cdn';
  const isNpmPackageBuild = moduleType === 'npm';
  const isCDNPackageBuild = moduleType === 'cdn';
  const sourceMapType =
    process.env.PROD_DEBUG === 'inline' ? 'inline' : process.env.PROD_DEBUG === 'true';

  return {
    watch: {
      include: ['src/**'],
    },
    external: [...Object.keys(pkg.peerDependencies || {})],
    onwarn(warning, warn) {
      // Silence 'this' has been rewritten to 'undefined' warning
      // https://rollupjs.org/guide/en/#error-this-is-undefined
      if (warning.code === 'THIS_IS_UNDEFINED') {
        return;
      }

      warn(warning);
    },
    plugins: [
      replace({
        preventAssignment: true,
        __PACKAGE_VERSION__: version,
        __MODULE_TYPE__: moduleType,
        __RS_BUGSNAG_API_KEY__: process.env.BUGSNAG_API_KEY || '{{__RS_BUGSNAG_API_KEY__}}',
        __RS_BUGSNAG_RELEASE_STAGE__: process.env.BUGSNAG_RELEASE_STAGE || 'production',
      }),
      nodePolyfills(),
      resolve({
        jsnext: true,
        browser: true,
        preferBuiltins: false,
        extensions: ['.js', '.ts', '.mjs'],
      }),
      commonjs({
        include: /node_modules/,
        requireReturnsDefault: 'auto',
      }),
      json(),
      typescript({
        tsconfig: './tsconfig.json',
        useTsconfigDeclarationDir: true,
      }),
      babel({
        compact: true,
        babelHelpers: 'bundled',
        exclude: ['node_modules/@babel/**', 'node_modules/core-js/**'],
        extensions: [...DEFAULT_EXTENSIONS, '.ts'],
        sourcemap: sourceMapType,
      }),
      process.env.UGLIFY === 'true' &&
        terser({
          safari10: isLegacyBuild,
          ecma: isLegacyBuild ? 2015 : 2017,
          format: {
            comments: false,
          },
        }),
      filesize({
        showBeforeSizes: 'build',
        showBrotliSize: true,
      }),
      process.env.VISUALIZER === 'true' &&
        visualizer({
          filename: `./stats/${distName}.html`,
          title: `Rollup Visualizer - ${distName}`,
          sourcemap: true,
          open: true,
          gzipSize: true,
          brotliSize: true,
        })
    ],
  };
}

const outputFiles = [
  {
    file: getOutputFilePath(outDirCDN, distName),
    format: 'iife',
    name: modName,
    sourcemap: sourceMapType,
    generatedCode: {
      preset: isLegacyBuild ? 'es5' : 'es2015',
    },
  },
];

const buildConfig = {
  ...getDefaultConfig(distName),
};

export default [
  {
    ...buildConfig,
    input: `src/integrations/${process.env.INTG_NAME}/index.js`,
    output: outputFiles,
  },
];