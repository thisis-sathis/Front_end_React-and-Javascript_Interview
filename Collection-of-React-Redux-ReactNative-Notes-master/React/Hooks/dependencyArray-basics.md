The useEffect Hook can take an optional second argument called the dependencies array which allows you to optimize when React would execute the effect callback. React will make a comparison between each of the values via Object.is to determine whether anything has changed. If any of the elements are different than the last render cycle, then the effect will be run against the new values.

The comparison works great for primitive JavaScript types, but the problems can arise if one of the elements is an object or an array. Object.is will compare objects and arrays by reference, and there is no way to override this functionality and supply a custom comparator.

#### 1. One solution is to use - https://github.com/kentcdodds/use-deep-compare-effect

Here you replace useEffect() with useDeepCompareEffect(()

```js
import useDeepCompareEffect from "use-deep-compare-effect"

function Query({ query, variables }) {
  // some code...

  useDeepCompareEffect(
    () => {
      // make an HTTP request or whatever with the query and variables
      // optionally return a cleanup function if necessary
    },
    // query is a string, but variables is an object. With the way Query is used
    // in the example above, `variables` will be a new object every render.
    // useDeepCompareEffect will do a deep comparison and your callback is only
    // run when the variables object actually has changes.
    [query, variables],
  )

  return <div>{/* awesome UI here */}</div>
}
```

#### [Object.is()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)

Object.is() determines whether two values are the same value. Two values are the same if one of the following holds:

```
both undefined
both null
both true or both false
both strings of the same length with the same characters in the same order
both the same object (means both object have same reference)
both numbers and
both +0
both -0
both NaN
or both non-zero and both not NaN and both have the same value

```

This is not the same as being equal according to the == operator. The == operator applies various coercions to both sides (if they are not the same Type) before testing for equality (resulting in such behavior as "" == false being true), but Object.is doesn't coerce either value.

This is also not the same as being equal according to the === operator. The === operator (and the == operator as well) treats the number values -0 and +0 as equal and treats Number.NaN as not equal to NaN.
