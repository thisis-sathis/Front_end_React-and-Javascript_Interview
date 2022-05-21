#### So the point is when you define an object inside your React function component, it is not going to be referentially equal to the last time that same object was defined (even if it has all the same properties with all the same values).

### This comparison check will cause some React re-rendering we didn’t intend or expect. If that re-rendering is some expensive operation, that can hurt performance. If one part re-renders, it re-render the entire component tree. Thus, React released the memo idea to fix this

### First some fundamentals of JS before using Memo or useMemo()

You may remember how Javascript compares objects 🥴. There are some tricky results when we run equality comparisons:

```js
{} === {} // false

const z = {}
z === z // true

```

React uses Object.is to compare components, but that gives very similar results to using ===. So, when React checks for any changes in a component, it may find a “change” that we wouldn’t really consider a change.

```js
() => {} === () => {} // false
[] === [] // false

```

### There are two situations where referential equality matters in React, let's go through them one at a time.

Dependencies lists
Let's review an example.

Warning, you're about to see some seriously contrived code. Please don't nit-pick that and just focus on the concepts please, thank you.

```js
function Foo({ bar, baz }) {
  const options = { bar, baz }
  React.useEffect(() => {
    buzz(options)
  }, [options]) // we want this to re-run if bar or baz change
  return <div>foobar</div>
}
function Blub() {
  return <Foo bar="bar value" baz={3} />
}
```

The reason this is problematic is because useEffect is going to do a referential equality check on options between every render, and thanks to the way JavaScript works, options will be new every time so when React tests whether options changed between renders it'll always evaluate to true, meaning the useEffect callback will be called after every render rather than only when bar and baz change.

There are two things we can do to fix this:

**option 1**

```js
function Foo({ bar, baz }) {
  React.useEffect(() => {
    const options = { bar, baz }
    buzz(options)
  }, [bar, baz]) // we want this to re-run if bar or baz change
  return <div>foobar</div>
}
```

That's a great option and if this were a real thing that's how I'd fix this.

But there's one situation when this isn't a practical solution: If bar or baz are (non-primitive) objects/arrays/functions/etc:

**option 2**

```js
function Blub() {
  const bar = () => {}
  const baz = [1, 2, 3]
  return <Foo bar={bar} baz={baz} />
}
```

This is precisely the reason why useCallback and useMemo exist. So here's how you'd fix that (all together now):

```js
function Foo({ bar, baz }) {
  React.useEffect(() => {
    const options = { bar, baz }
    buzz(options)
  }, [bar, baz])
  return <div>foobar</div>
}
function Blub() {
  const bar = React.useCallback(() => {}, [])
  const baz = React.useMemo(() => [1, 2, 3], [])
  return <Foo bar={bar} baz={baz} />
}
```

#### Note that this same thing applies for the dependencies array passed to useEffect, useLayoutEffect, useCallback, and useMemo.

---

### Object.is() determines whether two values are the same value. Two values are the same if one of the following holds:

```js
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
