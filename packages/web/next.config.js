/* eslint-disable @typescript-eslint/no-var-requires */

const withTranspileModules = require('next-transpile-modules')([
  '@teamzero/types',
  '@teamzero/common'
]);

/** @type {import('next').NextConfig} */
module.exports = withTranspileModules({
  reactStrictMode: true
});
