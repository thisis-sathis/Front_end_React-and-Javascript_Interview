#### Most Important points on setState

- setState is asynchronous function and just like any asynchronous function is being passed on to the event loop, while any code after it will execute seemlessly in the main thread.
- setState() Can Have a Function as A Parameter Instead of An Object
- setState() Can Have a Callback Function
- setState() will always lead to a re-render unless shouldComponentUpdate() returns false
- In case multiple setState() calls are made, React may batch the state updates while respecting the order of updates.

## What happens when you call setState?

The first thing React will do when setState is called is merge the object you passed into setState into the current state of the component. This will kick off a process called reconciliation. The end goal of reconciliation is to, in the most efficient way possible, update the UI based on this new state. To do this, React will construct a new tree of React elements (which you can think of as an object representation of your UI). Once it has this tree, in order to figure out how the UI should change in response to the new state, React will diff this new tree against the previous element tree. By doing this, React will then know the exact changes which occurred, and by knowing exactly what changes occurred, will able to minimize its footprint on the UI by only making updates where absolutely necessary.

## ReactJS uses observable’s to find the modified components. Whenever setState() method is called on any component, ReactJS makes that component dirty and re-renders it.

[https://hackernoon.com/virtual-dom-in-reactjs-43a3fdb1d130](https://hackernoon.com/virtual-dom-in-reactjs-43a3fdb1d130)

Whenever setState() method is called, ReactJS creates the whole Virtual DOM from scratch. Creating a whole tree is very fast so it does not affect the performance. At any given time, ReactJS maintains two virtual DOM, one with the updated state Virtual DOM and other with the previous state Virtual DOM.

ReactJS using diff algorithm compares both the Virtual DOM to find the minimum number of steps to update the Real DOM.

I wouldn't worry too much about calling renders excessively until you have determined you have a performance problem.

#### Rendering (in the React context) and committing the virtual DOM updates to the real DOM are different matters. The rendering here is referring to generating virtual DOMs, and not about updating the browser DOM. React may batch the setState calls and update the browser DOM with the final new state.

#### Beside the above, note, setState() is that it is an asynchronous method,

Asynchronous meaning it returns before actually setting the state. As such, it’s advised against relying on the state to have changed immediately after invoking setState . For example:

```js
class SomeForm extends React.Component {
  handleFirstNameChange = event => {
    this.setState({ firstName: event.currentTarget.value })
    console.log(this.state.firstName)
  }

  render() {
    return (
      <div>
        <input
          onChange={this.handleFirstnameChange}
          value={this.state.firstName}
        />
      </div>
    )
  }
}
```

As we type values into the input field, the console log won’t actually print out the new characters we type.

```js
Because of its asynchronous nature, setState accepts a second argument that is a function that it invokes after the state has been updated. So the above example would work if we rewrote handleFirstNameChange as

handleFirstNameChange = (event) => {
  this.setState({firstName: event.currentTarget.value}, () => {
    console.log(this.state.firstName);
  });
}
```

## Why is setState in reactjs Async instead of Sync?

setState actions are asynchronous and are batched for performance gains. This is explained in the documentation of setState.

setState() does not immediately mutate this.state but creates a pending state transition. Accessing this.state after calling this method can potentially return the existing value. There is no guarantee of synchronous operation of calls to setState and calls may be batched for performance gains.

2. Why would they make setState async as JS is a single threaded language and this setState is not a WebAPI or server call?

This is because setState alters the state and causes rerendering. This can be an expensive operation and making it synchronous might leave the browser unresponsive.

Thus the setState calls are asynchronous as well as batched for better UI experience and performance.

[For a Great explanation by Dan why setState is asynchronous](https://github.com/facebook/react/issues/11527#issuecomment-360199710)

First, I think we agree that delaying reconciliation in order to batch updates is beneficial. That is, we agree that setState() re-rendering synchronously would be inefficient in many cases, and it is better to batch updates if we know we’ll likely get several ones.

For example, if we’re inside a browser click handler, and both Child and Parent call setState, we don’t want to re-render the Child twice, and instead prefer to mark them as dirty, and re-render them together before exiting the browser event.

You’re asking: why can’t we do the same exact thing (batching) but write setState updates immediately to this.state without waiting for the end of reconciliation. I don’t think there’s one obvious answer (either solution has tradeoffs) but here’s a few reasons that I can think of.

Guaranteeing Internal Consistency
Even if state is updated synchronously, props are not. (You can’t know props until you re-render the parent component, and if you do this synchronously, batching goes out of the window.)

Right now the objects provided by React (state, props, refs) are internally consistent with each other. This means that if you only use those objects, they are guaranteed to refer to a fully reconciled tree (even if it’s an older version of that tree). Why does this matter?

When you use just the state, if it flushed synchronously (as you proposed), this pattern would work:

```js
console.log(this.state.value) // 0
this.setState({ value: this.state.value + 1 })
console.log(this.state.value) // 1
this.setState({ value: this.state.value + 1 })
console.log(this.state.value) // 2
```

However, say this state needs to be lifted to be shared across a few components so you move it to a parent:

```js
;-this.setState({ value: this.state.value + 1 })
;+this.props.onIncrement() // Does the same thing in a parent
```

I want to highlight that in typical React apps that rely on setState() this is the single most common kind of React-specific refactoring that you would do on a daily basis.

However, this breaks our code!

```js
console.log(this.props.value) // 0
this.props.onIncrement()
console.log(this.props.value) // 0
this.props.onIncrement()
console.log(this.props.value) // 0
```

This is because, in the model you proposed, this.state would be flushed immediately but this.props wouldn’t. And we can’t immediately flush this.props without re-rendering the parent, which means we would have to give up on batching (which, depending on the case, can degrade the performance very significantly).
