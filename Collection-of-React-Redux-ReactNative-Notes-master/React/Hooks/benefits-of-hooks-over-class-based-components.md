There are several well-documented problems with the class-based lifecycle events. One of the biggest complaints is that you often have to repeat logic in componentDidMount and componentDidUpdate.

```js
async componentDidMount() {
  const response = await get(`/users`);
  this.setState({ users: response.data });
};

async componentDidUpdate(prevProps) {
  if (prevProps.resource !== this.props.resource) {
    const response = await get(`/users`);
    this.setState({ users: response.data });
  }
};
```
