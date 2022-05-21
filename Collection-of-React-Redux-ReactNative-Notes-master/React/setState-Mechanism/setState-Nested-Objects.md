#### React's setState() by default does shallow merging

Shallow merging only merges things on the first level though (hence the term shallow), which means that we have to be careful when we use setState( ) on state objects with nested structures.

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

Now lets say I have the following state

```js
this.state = {
  name: 'Paul',
  isLoggedIn: false,
  address: {
    street, '123 Bakers St',
    city: null
  }
}
```

Following the logic of shallow merging, you might try to update the value of “address.city” for the state object illustrated above with the method setState( ) like this…

```js
this.setState({
  address: {
    city: "New York",
  },
})
```

However, this will change the state object’s structure to look something like:

```js
this.state = {
  name: "Paul",
  isLoggedIn: false,
  address: {
    city: "New York",
  },
}
```

Because the first level here is 'address' property and that will be completely replaced from the new state.

we lost “address.street” within the state object because the nested object (value of the key “address”) got overwritten by a new object with a single key of “city”. The logic of shallow merging does not apply for nested objects.
How do we update the value for “address.city” without totally overwriting the nested object (and thus saving the “address.street” information)? In other words, is there a way to deep merge? There are multiple ways to tackle this but the spread operator provides us a feasible solution.

```js
this.setState({
  address: {
    ...this.state.address,
    city: "New York",
  },
})
```

#### Further Reading

[https://medium.com/@imrobinkim/how-state-updates-are-merged-in-react-e07fc669fec2](https://medium.com/@imrobinkim/how-state-updates-are-merged-in-react-e07fc669fec2)
