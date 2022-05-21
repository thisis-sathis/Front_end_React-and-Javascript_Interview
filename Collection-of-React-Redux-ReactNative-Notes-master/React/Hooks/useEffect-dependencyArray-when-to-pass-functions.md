#### What does it mean to “close over” something?

It means that a closure captures the variables and constants of the context in which it is defined, referred to as closing over those variables and constants.

### So when does a function need to go in the dependency array? Whenever it could potentially close over state.

This example probably sums it up perfectly:

```js
const MyComponent = () => {
  // This function doesn't close over state at this moment
  function logData() {
    console.log("logData")
  }

  useEffect(() => {
    logData()
  }, []) // `logData` not required in the dependency array

  // ...
}
```

Then we console.log some props:

```js
const MyComponent = ({ data }) => {
  // This function DOES close over state now (remember, props
  // are someone else's state)
  function logData() {
    console.log(data)
  }

  useEffect(() => {
    logData()
  }, [logData]) // Now we add it here

  // ...
}
```

Now that logData is in the dependency array, the new concern is that this function will change with every re-render of MyComponent. So we need to use useCallback:

```js
const MyComponent = ({ data }) => {
  const logData = useCallback(() => {
    console.log(data)
  }, [data])

  useEffect(() => {
    logData()
  }, [logData]) // Now we add it here

  // ...
}
```

Or, we can do this:

```js
const MyComponent = ({ data }) => {
  useEffect(() => {
    function logData() {
      console.log(data)
    }
    logData()
  }, [data]) // Now, just `data` is needed here

  // ...
}
```

logData does close over state, but it's apart of the effect itself so we don't need anything but data in the array.

The above way of declaing logData() when it prints a props is also the recommended way per [official-dox](https://reactjs.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies)

[https://reacttraining.com/blog/when-to-use-functions-in-hooks-dependency-array/](https://reacttraining.com/blog/when-to-use-functions-in-hooks-dependency-array/)

```

```
