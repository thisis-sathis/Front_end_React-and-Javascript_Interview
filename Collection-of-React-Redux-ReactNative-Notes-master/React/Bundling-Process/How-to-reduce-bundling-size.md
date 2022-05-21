
## How do you tell React to build in Production mode and what will that do?

Typically you’d use Webpack’s DefinePlugin method to set NODE_ENV to production. This will strip out things like propType validation and extra warnings. On top of that, it’s also a good idea to minify your code because React uses Uglify’s dead-code elimination to strip out development only code and comments, which will drastically reduce the size of your bundle.

#### The most important step - Add the following Webpack plugins

plugins: [
    new webpack.DefinePlugin({ // <-- key to reducing React's size
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(), //dedupe similar code
    new webpack.optimize.UglifyJsPlugin(), //minify everything
    new webpack.optimize.AggressiveMergingPlugin()//Merge chunks
  ],

Here's a super good example - [https://github.com/rajaraodv/react-redux-blog/blob/master/webpack.config.prod.js](https://github.com/rajaraodv/react-redux-blog/blob/master/webpack.config.prod.js)

#### TREE SHAKING

Tree shaking is the process of removing dead code from your bundle. Dead code is code that is exported without being imported anywhere.

How do I do this?

1) Use ES6 module syntax

Make sure you use ES6 modules and import by module name as much as possible. Like this:

```
import { connect } ​from ”react-redux”​; ​​ ​
```
Instead of:

```
import reactRedux ​from ”react-redux”​; ​​ ​
```

#### USE LODASH-WEBPACK-PLUGIN

If you are using lodash in your javascript project, you might want to check out lodash-webpack-plugin. It removes lodash features you don’t use. This will significantly reduce your bundle size.

How do I do this?

Install the dependency from npm with the command

``npm install lodash-webpack-plugin -save--dev``

And require the module at the top of your webpack.config.js:

​​ LodashModuleReplacementPlugin = ​require​(​’lodash-webpack-plugin’​);

add this line in your webpack.config.js in the plugin section
new LodashModuleReplacementPlugin