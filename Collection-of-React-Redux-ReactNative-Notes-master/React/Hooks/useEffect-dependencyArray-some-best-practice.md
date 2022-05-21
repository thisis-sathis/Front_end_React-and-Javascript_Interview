If you use dependency array - make sure the array includes all values from the component scope (such as props and state) that change over time and that are used by the effect. Otherwise, your code will reference stale values from previous renders.

[https://reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect](https://reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect)

React defers running useEffect until after the browser has painted, so doing extra work is less of a problem.

We recommend using the exhaustive-deps rule as part of our eslint-plugin-react-hooks package. It warns when dependencies are specified incorrectly and suggests a fix.

### Is it safe to omit functions from the list of dependencies?

**Generally speaking, NO.**

## It’s difficult to remember which props or state are used by functions outside of the effect. This is why usually you’ll want to declare functions needed by an effect inside of it. Then it’s easy to see what values from the component scope that effect depends on:

```js
function Example({ someProp }) {
  function doSomething() {
    console.log(someProp)
  }

  useEffect(() => {
    doSomething()
  }, []) // 🔴 This is not safe (it calls `doSomething` which uses `someProp`)
}
```

```js
function Example({ someProp }) {
  useEffect(() => {
    function doSomething() {
      console.log(someProp)
    }

    doSomething()
  }, [someProp]) // ✅ OK (our effect only uses `someProp`)
}
```

If after that we still don’t use any values from the component scope, it’s safe to specify [] in dependency array:

```js
useEffect(() => {
  function doSomething() {
    console.log("hello")
  }

  doSomething()
}, []) // ✅ OK in this example because we don't use _any_ values from component scope
```
