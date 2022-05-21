First of all, from a blog post in late March 2018, it was announced that the React lifecycle methods **componentWillReceiveProps**, **componentWillMount**, and **componentWillUpdate** will be deprecated in a future version of React. This is because of the eventual migration of React to async rendering; these lifecycle methods will become unreliable when async rendering is made default.

**getDerivedStateFromProps** is one of those newly introduced lifecycle method replacing componentWillReceiveProps, which has now become UNSAFE_componentWillReceiveProps.

In place of these methods, the new static method **getDerivedStateFromProps** was introduced.

#### getDerivedStateFromProps is invoked every time a component is rendered. Remember, this method is called (or invoked) before the component is rendered to the DOM on initial mount. It takes in two arguments: the next props object (which may be the same as the previous object) and the previous state object of the component in question. When implementing this method, we need to return the changes to our component state or null (or {}) if no changes need to be made.

### Need to keep in mind that the new method is static, and therefore does not have access to the this context that the old lifecycle methods provided.

And you can either return an object to update the state of the component:

```js
static getDerivedStateFromProps(props, state) {
    return {
        points: 200 // update state with this
    }
}
```

Below’s a quick example:

Consider a simple component that renders the number of points scored by a football team.

As you may have expected, the number of points is stored in the component state object:

```js
class App extends Component {
  state = {
    points: 10,
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>You've scored {this.state.points} points.</p>
        </header>
      </div>
    )
  }
}
```

The result of this is the following: **You've scored 10 points**

Now, if you put in the static **getDerivedStateFromProps** method as shown below.

```js
class App extends Component {
  state = {
    points: 10,
  }

  // *******
  //  NB: Not the recommended way to use this method. Just an example. Unconditionally overriding state here is generally considered a bad idea
  // ********
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      points: 1000,
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>You've scored {this.state.points} points.</p>
        </header>
      </div>
    )
  }
}
```

Right now, we have the static **getDerivedStateFromProps** component life-cycle method in there. If you remember from the previous explanation, this method is called before the component is mounted to the DOM. By returning an object, we update the state of the component before it is even rendered.

And here’s what we get: **You've scored 1000 points**

With the 1000 coming from updating state within the static getDerivedStateFromProps method.

Well, this example is contrived, and not really the way you’d use the static getDerivedStateFromProps method. I just wanted to make sure we understood the basics first.

So when should you use the static **getDerivedStateFromProps** lifecycle method?

Essentially, this method allows a component to update its internal state in response to a change in props. Also, component state in this manner is referred to as Derived State.

As a rule of thumb, derived state should be used sparingly as you can introduce subtle bugs into your application if you aren’t sure of what you’re doing.

#### An actual real-world example comparing it with the previous method

Here’s a pattern we were using in many components throughout our codebase:

```js
componentWillReceiveProps(nextProps) {
  if (nextProps.selectedTab !== this.state.selectedTab) {
    this.setState(() => { return {selectedTab: nextProps.selectedTab} })
  }
}
```

This lifecycle method fired when we were about to receive new props in our component, passing in the new value as the first argument. We needed to check whether the new props indicated a change in the state of our tab bar, which we stored in state. This is one of the simplest patterns to address with getDerivedStateFromProps:

```js
static getDerivedStateFromProps(nextProps, prevState) {
  return nextProps.selectedTab === prevState.selectedTab
    ? {}
    : {selectedTab: nextProps.selectedTab}
}
```

### This code works in exactly the same way, but, since it’s static, we no longer use the context provided by this. Instead, we return any state changes. In this case, I’ve returned an empty object ({}) to indicate no state change when the tabs are identical; otherwise, I return an object with the new selectedTab value.

#### General Example below

```js
static getDerivedStateFromProps(nextProps, prevState){
   if(nextProps.someValue!==prevState.someValue){
     return { someState: nextProps.someValue};
  }
  else return null;
}

```

It receives two params nextProps and prevState. As mentioned previously you cannot access this inside this method so you’ll have to store the props in the state to compare the nextProps with previous props. In above code nextProps and prevState are compared, if both are different then an object will be returned to update the state otherwise null will be returned indicating state update not required.

#### Real world example below

```js
mport React, {PureComponent} from "react";

class DisplayStat extends PureComponent{
  constructor(props){
    super();
    this.state={
      path: this.props.path,
      firebaseRef: firebase.database().ref(this.props.path);
    }
  }
  componentDidMount() {
    this.getData(this.state.firebaseRef);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.path !== this.state.path) {
      let firebaseRef=firebase.database().ref(this.state.path);
      this.setState({firebaseRef});
      this.getData(firebaseRef);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.path!==prevState.path){
      let firebaseRef=prevState.firebaseRef;

      firebaseRef.off("value"); //Turn off the connection to previous path.

//       We can't do this here as we can't access `this` inside this method.
//       firebaseRef=firebase.database().ref(nextProps.path);
//       this.setState({firebaseRef, path :nextProps.path });
//       this.getData(firebaseRef);

      return {path : nextProps.path};
    }
    else return null;
  }

  getData=(ref)=>{
    // open connection and listen to firebase path
    ref.on("value", snapshot => {
      //Perform some operation
    });
  }

  render(){
    return(
      <div>
        //Display Stats
      </div>
    );
  }
}

```
