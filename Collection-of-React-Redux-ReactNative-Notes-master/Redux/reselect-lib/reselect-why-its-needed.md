In Redux, whenever an action is called anywhere in the application, all mounted & connected components call their mapStateToProps function. This is why Reselect is awesome. It will just return the memoized result if nothing has changed.

Operators like .map and .filter return referentially different values every time they are invoked. Thus, we must make sure that when the actual output is the same, then the reference stays the same and when the actual output is different, then the reference should be different as well. To do that, we employ a technique called memoization. This technique guarantees that “as long as the inputs to a function are the same, then the output will be referentially the same”. One popular library option to implement that is **reselect**. With it, we could re-write our selector like so:

[3-small-tips-for-better-redux-performance-in-a-react-app](https://itnext.io/3-small-tips-for-better-redux-performance-in-a-react-app-9cde549df6af)

```js
import { createSelector } from "reselect"
export const getItems = createSelector(
  state => state.items,
  items => Object.keys(items),
)
```

### Selectors created using Reselect’s createSelector function are memoized. That’s a fancy word to mean that the function remembers the arguments passed-in the last time it was invoked and doesn’t recalculate if the arguments are the same. You can view it a little bit like caching.

**The createSelector accepts an arbitrary number of function arguments, where the first N-1 functions are “inputs” to the selector and the Nth one is the “output”. It guarantees that as long as the inputs have the same value, the output will be “cached” and re-used. If any of the inputs has a different value compared to the value it had during the last selector invocation, then the “output” from the Nth function will be re-computed. In our example, as long as the items remain the same, then the getItems selector will return a value with the same reference, no matter how many times it’s called. If new items are added, then the items state won’t have the same value anymore, so the getItems will return a new reference which will be cached and re-used.**

Reselect selectors can be composed/chained together easily. This way, each selector stays small and focused on one task.

Another small example below

```js
import { createSelector } from "reselect"

const todoSelector = state => state.todo.todo

export const todosWithMilk = createSelector([todoSelector], todos => {
  return todos.filter(todo => todo.title.toLowerCase().includes("milk"))
})

export const todosWithMilkAndBread = createSelector([todosWithMilk], todos => {
  return todos.filter(todo => todo.title.toLowerCase().includes("bread"))
})
```
