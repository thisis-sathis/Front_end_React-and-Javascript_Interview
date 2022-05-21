**setState is asynchronous**

The fact that setState causes reconciliation(the process of re-rendering the components tree) is base of the next property — setState is asynchronous. This allows us to have multiple calls to setState in a single scope and not trigger not needed re-renders of the whole tree.

**Because this.props and this.state may be updated asynchronously, you should not rely on their values for calculating the next state.**

**This is why you don’t see the new values in state right after you updated it**

// assuming this.state = { value: 0 }

```js
this.setState({
  value: 1,
})
console.log(this.state.value) // 0
```

React will also try to group or batch setState calls into a single call, which leads us to our first “gotcha”:

// assuming this.state = { value: 0 };

```js
this.setState({ value: this.state.value + 1 })
this.setState({ value: this.state.value + 1 })
this.setState({ value: this.state.value + 1 })
```

After all the above calls are processed this.state.value will be 1, not 3 like we would expect! To get around that …

assuming this.state = { value: 0 };

```js
this.setState(state => ({ value: state.value + 1 }))
this.setState(state => ({ value: state.value + 1 }))
this.setState(state => ({ value: state.value + 1 }))
```

The same funtion above could be written as below

```js
this.setState((state, props) => {
  return { value: state.value + 1 }
})
```

### Will give us this.state.value = 3 like we expected in the first place. Remember to always use this syntax when updating state to a value, which is computed based on previous state!

#### [From Official Doc](https://reactjs.org/docs/react-component.html#setstate)

setState() enqueues changes to the component state and tells React that this component and its children need to be re-rendered with the updated state. Think of setState() as a request rather than an immediate command to update the component. For better perceived performance, React may delay it, and then update several components in a single pass. React does not guarantee that the state changes are applied immediately. This makes reading this.state right after calling setState() a potential pitfall. Instead, use componentDidUpdate or a setState callback (setState(updater, callback)), either of which are guaranteed to fire after the update has been applied. If you need to set the state based on the previous state, read about the updater argument below.

The first argument is an updater function with the signature:

`(state, props) => stateChange`

state is a reference to the component state at the time the change is being applied. It should not be directly mutated. Instead, changes should be represented by building a new object based on the input from state and props. For instance, suppose we wanted to increment a value in state by props.step:

```js
this.setState((state, props) => {
  return { counter: state.counter + props.step }
})
```

Both state and props received by the updater function are guaranteed to be up-to-date. The output of the updater is shallowly merged with state.

The second parameter to setState() is an optional callback function that will be executed once setState is completed and the component is re-rendered. Generally we recommend using componentDidUpdate() for such logic instead.

### What is Deep and shallow merge in javascript

In a shallow merge, the properties of the first object are overwritten with the same property values of the second object.

Lets look at an example. Setup:

```js
// I have following 2 objects
var obj1 = {
  foo: {
    prop1: 42,
  },
}

var obj2 = {
  foo: {
    prop2: 21,
  },
  bar: {
    prop3: 10,
  },
}

// Shallow: - Shallow merging only merges things on the first level though (hence the term shallow),

var result = {
  foo: {
    // `foo` got overwritten with the value of `obj2`
    prop2: 21,
  },
  bar: {
    prop3: 10,
  },
}

// Now Deep merge

var result = {
  foo: {
    prop1: 42,
    prop2: 21, // `obj2.foo` got merged into `obj1.foo`.
  },
  bar: {
    prop3: 10,
  },
}
```

### Further Reading

[Official Docs](https://reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous)

[https://medium.com/@baphemot/understanding-reactjs-setstate-a4640451865b](https://medium.com/@baphemot/understanding-reactjs-setstate-a4640451865b)
