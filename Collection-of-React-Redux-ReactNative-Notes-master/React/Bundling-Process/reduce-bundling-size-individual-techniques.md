I ejected my create-react-app and if you haven’t you should do it.

```
npm run eject
```

This will start the process of ejecting from Create React Native App's build scripts. You'll be asked a couple of questions about how you'd like to build your project. Once this command has successfully run, you should also follow any steps below that are applicable to your environment.

#### First Step: Analyze the bundle

We should install a npm package called “source-map-explorer”.

``npm install --save source-map-explorer``

you may use yarn as well.

``yarn add source-map-explorer``

Then in package.json, add the following line to scripts:

``"analyze": "source-map-explorer build/static/js/main.*",``

let’s roll.

```
npm run build
npm run analyze
```

this will open a new tab in your default browser, let’s take a look at it

#### Moment problem

Moment is really awesome package, easy to use and pretty powerful. It’s been my favorite for handing date easily since the very begging of my web development carrier, but it’s really big.

It’s core only 52KB but for some reason it imports all locale files at once. It’s not modularized so you carry around all the world languages’ locale files in your app.

I don’t want that, I only have used tr, so let’s get rid off useless locales, unfortunately for us, neither its documentation nor its core includes any solution fits for us, but we can always use Webpack for that job. We gonna use webpack.ContextReplacementPlugin.

You might be using some big packages like Moment, always try to use modularized packages so you don’t have to import all library at once.

Add the line below to your config/webpack.config.prod.js (you can add this to webpack.config.dev.js as well, but it might or might not slow down dev build progress and may cause latency in live review.)

// find plugins part and add this line.

```
plugins: [

    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
```

you can change /en/ part with whatever locale you want. let’s rebuild our app and analyze it.

#### 2. Serve gzipped file in production

You can dramatically reduce the size by gzipping the bundle.js. There are two ways to do it. 1. dynamic gzip (not preferred) and 2. build-time gzip (preferred)

 Build time gzip (preferred)
Instead of generating bundle.js, generate bundle.js.gz using Webpack’s compression plugin. Then add a middleware to return gzipped JS file.

```JS
1.Install the Webpack compression plugin
npm install compression-webpack-plugin --save-dev

2. Import the plugin to webpack.config.prod.js
var CompressionPlugin = require('compression-webpack-plugin');
3. Add it to plugins array
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({   <-- Add this
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
4. Finally, add this middleware to Express to return .js.gz so you can still load bundle.js from the html but will receive bundle.js.gz
app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});
```