Make a custom hook called useCounter that accepts the step and initialCount and returns the count and increment function.

```js
useCounter({stepCount = 1, initialCount = 0}) {
  const [count, setCount] = React.useState(initialCount)
  const increment = () => setCount(count + stepCount)
  return [count, increment]
}

const Counter({step = 1, initialCount = 0}) {
  const [count, increment] = useCounter(step, initialCount)
  return <button
          onClick={increment}
          >
          {counter}
        </button>
}

```
