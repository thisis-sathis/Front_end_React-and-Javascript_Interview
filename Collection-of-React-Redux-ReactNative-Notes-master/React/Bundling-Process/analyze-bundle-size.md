[https://stackoverflow.com/questions/58009974/react-analyze-bundle-size](https://stackoverflow.com/questions/58009974/react-analyze-bundle-size)

You can use this script to analyze, without ejecting create-react-app

Put analyze.js in root of your project ( where the package.json is located )

```
yarn add -D webpack-bundle-analyzer
yarn add -D progress-bar-webpack-plugin
```


#### analyze.js

```js
process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpackConfigProd = require('react-scripts/config/webpack.config')('production');

// this one is optional, just for better feedback on build
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const green = text => {
  return chalk.green.bold(text);
};

// pushing BundleAnalyzerPlugin to plugins array
webpackConfigProd.plugins.push(new BundleAnalyzerPlugin());

// optional - pushing progress-bar plugin for better feedback;
// it can and will work without progress-bar,
// but during build time you will not see any messages for 10-60 seconds (depends on the size of the project)
// and decide that compilation is kind of hang up on you; progress bar shows nice progression of webpack compilation
webpackConfigProd.plugins.push(
  new ProgressBarPlugin({
    format: `${green('analyzing...')} ${green('[:bar]')}${green('[:percent]')}${green('[:elapsed seconds]')} - :msg`,
  }),
);

// actually running compilation and waiting for plugin to start explorer
webpack(webpackConfigProd, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error(err);
  }
});

```
Now simple put node ./analyze.js in package.json scripts

```js

  "scripts": {
      .....
    "analyze": "node ./analyze.js"
  },

```
after that run ``npm run analyze``