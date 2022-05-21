First of all, from a blog post in late March 2018, it was announced that the React lifecycle methods **componentWillReceiveProps**, **componentWillMount**, and **componentWillUpdate** will be deprecated in a future version of React. This is because of the eventual migration of React to async rendering; these lifecycle methods will become unreliable when async rendering is made default.

getDerivedStateFromProps is one of those newly introduced lifecycle method replacing componentWillReceiveProps, which has now become UNSAFE_componentWillReceiveProps.

Let's dive into the Update life cycle methods. The first method available to us is componentWillReceiveProps(). This method is called when props are passed to the Component instance.

Our component was doing just fine, when all of a sudden a stream of new props arrive to mess things up.
Perhaps some data that was loaded in by a parent component’s componentDidMount finally arrived, and is being passed down.
Before our component does anything with the new props, componentWillReceiveProps is called, with the next props as the argument.

```js
componentWillReceiveProps(nextProps) {
  if (parseInt(nextProps.modelId, 10) !== parseInt(this.props.modelId, 10)) {
    this.setState({postsLoaded : false})
    this.contentLoaded = 0
  }
}
```

#### We are now in a fun place, where we have access to both the next props (via nextProps), and our current props (via this.props).

Here’s what we should do:

- check which props will change (big caveat with componentWillReceiveProps — sometimes it’s called when nothing has changed; React just wants to check in)

- If the props will change in a way that is significant, act on it

Inside componentWillReceiveProps() - Here we could extract the new props and update our internal state. If we have a state that is a calculation of multiple props, we can safely apply the logic here and store the result using this.setState().

#### Use this as an opportunity to react to a prop transition before render() is called by updating the state using this.setState(). The old props can be accessed via this.props. Calling this.setState() within this function will NOT trigger an additional render.

#### calling setState inside componentWillReceiveProps should not trigger additional render (i.e. should be queued/batched). Render should be called only once along with nextProps applied and the new state.

#### Another Example

Let’s say, as we alluded to above, that we have a canvas element. Let’s say we’re drawing a nice circle graphic on there based on this.props.percent.

When we receive new props, IF the percent has changed, we want to redraw the grid. Here’s the code:

```js
componentWillReceiveProps(nextProps) {
  if(this.props.percent !== nextProps.percent) {
    this.setUpCircle(nextProps.percent)
  }
}

```

One more caveat — componentWillReceiveProps is not called on initial render. I mean technically the component is receiving props, but there aren’t any old props to compare to, so… doesn’t count.

Unlike the other methods in the Mounting phase, not all our Update phase methods are called every time. For example, we will skip componentWillReceiveProps() if the Update is triggered by just a state change.
