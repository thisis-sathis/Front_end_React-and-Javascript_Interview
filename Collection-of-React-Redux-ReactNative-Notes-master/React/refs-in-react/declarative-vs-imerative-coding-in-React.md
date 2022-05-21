### What are Declarative and Imperative Programming?

Declarative programming is a programming paradigm … that expresses the logic of a computation without describing its control flow.
Imperative programming is a programming paradigm that uses statements that change a program’s state.

I’ll start with the imperative example:

```js
const container = document.getElementById(‘container’);
const btn = document.createElement(‘button’);
btn.className = ‘btn red’;
btn.onclick = function(event) {
 if (this.classList.contains(‘red’)) {
   this.classList.remove(‘red’);
   this.classList.add(‘blue’);
 } else {
   this.classList.remove(‘blue’);
   this.classList.add(‘red’);
 }
};
container.appendChild(btn);

```

And our declarative React example:

```js
class Button extends React.Component{
  this.state = { color: 'red' }
  handleChange = () => {
    const color = this.state.color === 'red' ? 'blue' : 'red';
    this.setState({ color });
  }
  render() {
    return (<div>
      <button
         className=`btn ${this.state.color}`
         onClick={this.handleChange}>
      </button>
    </div>);
  }
}

```

The differences here may be subtle. We still have logic that says if red then blue, but there’s one huge difference. The React example never actually touches an element. it simply declares an element should be rendered given our current state. It does not actually manipulate the DOM itself.

When writing React, it’s often good not to think of how you want to accomplish a result, but instead what the component should look like in it’s new state. This sets us up for a good control flow where state goes through a series of predictable and replicable mutations.
