Basically, it’s React wrapping actual events in a JavaScript wrapper. So instead of onClick, it’s something like reactOnClick. The onClick event still fires ultimately in the browser, but it’s not what you as a programmer is actually calling.

According to the official docs, SyntheticEvent is a cross-browser wrapper around the browser's native event. It has the same interface as the browser's native event, including stopPropagation() and preventDefault(), except the events work identically across all browsers.

Why does React have a synthetic event system instead of using the native one?

So that, events work identically across all browsers.

### How does React manage the event system?

For performance reasons, React reuses the SyntheticEvent objects by pooling them. This means that the SyntheticEvent object is reused, so after an event handler is invoked all the properties on event.target are nullified, because then its ready for reuse

### An example showing that, so after an event handler is invoked all the properties on event.target are nullified AND that you cannot access the event in an asynchronous way.

First note, that setState actions are asynchronous. And remember the way JS-Engine handles asynchronous codes and functions. That is, its transferred to the separate execution context to the EventLoop while the main thread continues and gets executed only when the main thread's call-stack is empty.

The most common example of an asynchronous access to a SyntheticEvent is within a setState. When we update a component state through the updater function, the updater will be called asynchronously and the event will be already nullified.

```js
import React, { Component } from "react";

class TextInput extends Component {
  state = {
    editionCounter: 0,
    value: this.props.defaultValue,
  }
  // WRONG ACCESS TO EVENT PROPERTIES! NOT WORKING!!
  handleChange = event =>
    this.setState(prevState => ({ value: event.target.value, editionCounter: prevState.editionCounter + 1 }));

  render() {
    return (
      <span>Edited {this.state.editionCounter} times</span>
      <input
        type="text"
        value={this.state.value}
        onChange={this.handleChange} // WRONG!
      />
    )
  }
}

```

#### event.persist()

If you want to access the event properties in an asynchronous way, you should call event.persist() on the event
Calling event.persist() on the synthetic event removes the event from the pool allowing references to the event to be retained asynchronously.

```js
class TextInput extends Component {
  state = {
    editionCounter: 0,
    value: this.props.defaultValue,
  }

  handleChange = event => {
    event.persist();
    this.setState(prevState => ({ value: event.target.value, editionCounter: prevState.editionCounter + 1 }));
  }

  render() {
    return (
      <span>Edited {this.state.editionCounter} times</span>
      <input
        type="text"
        value={this.state.value}
        onChange={this.handleChange}
      />
    )
  }
}

```
