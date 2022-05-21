### Making Data Immutable

Whenever an object containing complex data changes, instead of making the changes in that object, create a copy of that object with the changes. This makes detecting changes in data as simple as comparing the reference of the two objects.

**You can use Object.assign or `_.extend` (from Underscore.js or Lodash):**

### Object.assign(target, ...sources)

The Object.assign() method copies all enumerable own properties from one or more source objects to a target object. It returns the target object.

Properties in the target object are overwritten by properties in the sources if they have the same key. Later sources' properties overwrite earlier ones.

The Object.assign() method only copies enumerable and own properties from a source object to a target object. It uses [[Get]] on the source and [[Set]] on the target, so it will invoke getters and setters. Therefore it assigns properties, versus copying or defining new properties.

```js
const newValue2 = Object.assign({}, oldValue)
const newValue2 = _.extend({}, oldValue)

//Even better, you can use a library that provides immutable data structures:

var map1 = Immutable.Map({ a: 1, b: 2, c: 3 })
var map2 = map1.set("b", 2)
assert(map1.equals(map2) === true)
var map3 = map1.set("b", 50)
assert(map1.equals(map3) === false)
```

### Using the Production Build

When developing a React app, you are presented with really useful warnings and error messages. These make identifying bugs and issues during development a bliss. But they come at a cost of performance.

If you look into React’s source code, you will see a lot of if (process.env.NODE_ENV != 'production') checks. These chunks of code that React is running in your development environment isn’t something needed by the end user. For production environments, all of this unnecessary code can be discarded.

If you bootstrapped your project using create-react-app, then you can simply run npm run build to produce the production build without this extra code. If you are using Webpack directly, you can run webpack -p (which is equivalent of webpack --optimize-minimize --define process.env.NODE_ENV="'production'".

### Enabling Gzip on Your Web Server

React app’s bundle JS ﬁles are commonly very big, so to make the web page load faster, we can enable Gzip on the web server (Apache, Nginx, etc.)

Modern browsers all support and automatically negotiate Gzip compression for HTTP requests. Enabling Gzip compression can reduce the size of the transferred response by up to 90%, which can significantly reduce the amount of time to download the resource, reduce data usage for the client, and improve the time to first render of your pages.
