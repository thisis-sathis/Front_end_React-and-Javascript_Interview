## Why should I choose Immutable.JS as an immutable library?

Immutable.JS was designed to provide immutability in a performant manner in an effort to overcome the limitations of immutability with JavaScript. Its principle advantages include:

## Guaranteed immutability

Data encapsulated in an Immutable.JS object is never mutated. A new copy is always returned. This contrasts with JavaScript, in which some operations do not mutate your data (e.g. some Array methods, including map, filter, concat, forEach, etc.), but some do (Array’s pop, push, splice, etc.).

## Rich API

Immutable.JS provides a rich set of immutable objects to encapsulate your data (e.g. Maps, Lists, Sets, Records, etc.), and an extensive set of methods to manipulate it, including methods to sort, filter, and group the data, reverse it, flatten it, and create subsets.

## Performance

Immutable.JS does a lot of work behind the scenes to optimize performance. This is the key to its power, as using immutable data structures can involve a lot of expensive copying. In particular, immutably manipulating large, complex data sets, such as a nested Redux state tree, can generate many intermediate copies of objects, which consume memory and slow down performance as the browser’s garbage collector fights to clean things up.

Immutable.JS avoids this by cleverly sharing data structures under the surface, minimizing the need to copy data. It also enables complex chains of operations to be carried out without creating unnecessary (and costly) cloned intermediate data that will quickly be thrown away.

## Negatives of Immutable.js

### Once used, Immutable.JS will spread throughout your codebase

Once you encapsulate your data with Immutable.JS, you have to use Immutable.JS’s get() or getIn() property accessors to access it.

This has the effect of spreading Immutable.JS across your entire codebase, including potentially your components, where you may prefer not to have such external dependencies. Your entire codebase must know what is, and what is not, an Immutable.JS object. It also makes removing Immutable.JS from your app difficult in the future, should you ever need to.

This issue can be avoided by uncoupling your application logic from your data structures, as outlined in the best practices section below.

### No Destructuring or Spread Operators

Because you must access your data via Immutable.JS’s own get() and getIn() methods, you can no longer use JavaScript’s destructuring operator (or the Object spread operator), making your code more verbose.

### Difficult to interoperate with other Libs and plain JS

For example, you will no longer be able to reference an object’s properties through standard JavaScript dot or bracket notation. Instead, you must reference them via Immutable.JS’s get() or getIn() methods, which use an awkward syntax that accesses properties via an array of strings, each of which represents a property key.

For example, instead of myObj.prop1.prop2.prop3, you would use myImmutableMap.getIn([‘prop1’, ‘prop2’, ‘prop3’]).

This makes it awkward to interoperate not just with your own code, but also with other libraries, such as lodash or ramda, that expect plain JavaScript objects.

#### Further Reading

[https://redux.js.org/recipes/using-immutablejs-with-redux/](https://redux.js.org/recipes/using-immutablejs-with-redux/)
