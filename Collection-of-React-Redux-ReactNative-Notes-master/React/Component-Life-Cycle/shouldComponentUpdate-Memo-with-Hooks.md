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

#### Why Memo or useMemo() required at all

This comparison check will cause some React re-rendering we didn’t intend or expect. If that re-rendering is some expensive operation, that can hurt performance. If one part re-renders, it re-render the entire component tree. Thus, React released the memo idea to fix this.

### shouldComponentUpdate() has been replaced with React memo. React.memo() is similar to PureComponent in that it will help us control when our components rerender.

The key question here is - How can I prevent my functional component from re-rendering with React memo or React hooks?

[From Official Docs](https://reactjs.org/docs/react-api.html#reactmemo) React.memo is a higher order component. It’s similar to React.PureComponent but for function components instead of classes.

```js
const MyComponent = React.memo(
  (MyComponent = props => {
    /* render using props */
  }),
)
```

**If your function component renders the same result given the same props, you can wrap it in a call to React.memo for a performance boost in some cases by memoizing the result. This means that React will skip rendering the component, and reuse the last rendered result. In another word, When a component is wrapped in React.memo(), React renders the component and memoizes the result. Before the next render, if the new props are the same, React reuses the memoized result skipping the next rendering.**

React.memo only affects props changes. If your function component wrapped in React.memo has a useState or useContext Hook in its implementation, it will still rerender when state or context change.

By default (i.e. when a custom comparison function of areEqual(), in second argument is NOT provided to React.memo() ) it will only shallowly compare complex objects in the props object. If you want control over the comparison, you can also provide a custom comparison function as the second argument.

**Unlike the shouldComponentUpdate() method on class components, the areEqual function in React.memo returns true if the props are equal and this is when the Component will NOT re-render. And it returns false, if the props are not equal. And this is when the Component WILL re-render**

```js
const MyComponent = props => {
  /* render using props */
}
const areEqual = (prevProps, nextProps) => {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
}
export default React.memo(MyComponent, areEqual)
```

An actual example

```js
const areEqual = (prevProps, nextProps) => {
  return prevProps.name === nextProps.name
}
React.memo(Person, areEqual)
```

By default, memo only does a shallow comparison of props and prop’s objects. You can pass a second argument to indicate a custom equality check, like so

`React.memo(Component, [areEqual(prevProps, nextProps)]);`

**This areEqual() functions is a reverser of what shouldComponentUpdate() method does in a class component. That is, render(), componentDidUpdate() will not be invoked if shouldComponentUpdate() returns false. We use shouldComponentUpdate() to let React know if a component’s output is not affected by the current change in state or props. The default behavior is to re-render on every state change, and in the vast majority of cases you should rely on the default behavior.**

**shouldComponentUpdate() is invoked before rendering when new props or state are being received. Defaults to true. This method is not called for the initial render or when forceUpdate() is used.**

**On the other hand, the areEqual function in React.memo returns true if the props are equal and this is when the Component will NOT re-render. And it returns false, if the props are not equal. And this is when the Component will re-render**

Let’s see the memoization in action. The functional component Movie is wrapped in React.memo():

```js
export function Movie({ title, releaseDate }) {
  return (
    <div>
      <div>Movie title: {title}</div>
      <div>Release date: {releaseDate}</div>
    </div>
  )
}

export const MemoizedMovie = React.memo(Movie)
```

React.memo(Movie) returns a new memoized component MemoizedMovie. It will output the same content as the original Movie component, but with one difference.
MemoizedMovie render output is memoized. **The memoized content is reused as long as title or releaseDate props are the same on next renderings.**

```js
// First render. React calls MemoizedMovie function.
<MemoizedMovie
  title="Heat"
  releaseDate="December 15, 1995"
/>

// On next round React does not call MemoizedMovie function,
// preventing rendering
<MemoizedMovie
  title="Heat"
  releaseDate="December 15, 1995"
/>
```

You gain a performance boost: by reusing the memoized content, React skips rendering the component and doesn’t perform a virtual DOM difference check.

##### Further Reading

-1. [https://dmitripavlutin.com/use-react-memo-wisely/](https://dmitripavlutin.com/use-react-memo-wisely/)
