### componentWillMount

**componentWillMount** is executed just before the React Component is about to mount on the DOM. Hence, after this method the component will mount. All the things that you want to do before a component mounts has to be defined here.
This method is executed once in a lifecycle of a component and before first render.
Usage: **componentWillMount** is used for initializing the states or props, there is a huge debate going on to merge it with the constructor.

## Difference between constructor and componentWillMount

Only thing you can't achieve inside the constructor that you can with ComponentWillMount is to setState(). Also react throws a warning if anything inside your constructor modifies state even in another component.

### On doing API call inside componentWillMount

There is a common misconception that fetching in componentWillMount lets you avoid the first empty rendering state. In practice this was never true because React has always executed render immediately after componentWillMount. If the data is not available by the time componentWillMount fires, the first render will still show a loading state regardless of where you initiate the fetch. This is why moving the fetch to componentDidMount has no perceptible effect in the vast majority of cases.
