When a component is mounted it is being inserted into the DOM. This is when a constructor is called. componentWillMount is pretty much synonymous with a constructor and is invoked around the same time. componentDidMount will only be called once after the first render.

#### componentWillMount --> render --> componentDidMount

How is that different than rerendering or updating?

Now that the component is in the DOM, you want to change the data that is displayed. When calling setState or passing down new props from the parent component a component update will occur.

#### componentWillRecieveProps --> shouldComponentUpdate-->componentWillUpdate-->render-->componentDidUpdate

#### Also getDerivedStateFromProps method is called before the component is rendered to the DOM on initial mount.
