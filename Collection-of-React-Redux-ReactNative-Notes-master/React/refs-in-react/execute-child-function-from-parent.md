A full example
[Source](https://stackblitz.com/edit/react-a1mlqw?file=index.js)

```js
import React, { Component, useRef, useImperativeHandle } from "react"
import { render } from "react-dom"
import Hello from "./Hello"
import "./style.css"

class App extends Component {
  constructor() {
    super()
    this.state = {
      name: "React",
    }
  }

  render() {
    return (
      <div>
        <Hello name={this.state.name} />
        <p>Start editing to see some magic happen :)</p>
        <Parent />
      </div>
    )
  }
}

function Parent(props) {
  const refs = useRef([])
  const someData = [1, 2, 3, 4, 5]

  function handleClickOnChildren() {
    refs.current.forEach(child => {
      // in below the validate() function comes from Child comp and will be available to parent component using ref
      child.validate()
    })
  }

  return (
    <>
      <button onClick={handleClickOnChildren}>Validate</button>
      {someData.map((data, index) => {
        return <Child key={index} ref={ins => (refs.current[index] = ins)} />
      })}
    </>
  )
}

const Child = React.forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    validate() {
      // to validate this component
      console.log("I'm clicked")
    },
  }))

  return <>Some code here</>
})

render(<App />, document.getElementById("root"))
```

From the docs,

**useImperativeHandle** customizes the instance value that is exposed to parent components when using ref. As always, imperative code using refs should be avoided in most cases.**useImperativeHandle should be used with forwardRef**

Usually when you use useRef you are given the instance value of the component the ref is attached to. This allows you to interact with the DOM element directly.

useImperativeHandle is very similar, but it lets you do two things:

- 1. It gives you control over the value that is returned. Instead of returning the instance element, you explicitly state what the return value will be (see snippet below).

- 2. It allows you to replace native functions (such as blur, focus, etc) with functions of your own, thus allowing side-effects to the normal behavior, or a different behavior altogether. Though, you can call the function whatever you like.

There could be many reasons you want might to do either of the above; you might not want to expose native properties to the parent or maybe you want to change the behavior of a native function. There could be many reasons. However, useImperativeHandle is rarely used.

**Another example of passing ref further down Parent > Middle > Child . Where I want to call a method from Child in Parent**
[https://stackoverflow.com/questions/57389181/unable-to-call-child-function-from-parent-using-refs-with-functional-component](https://stackoverflow.com/questions/57389181/unable-to-call-child-function-from-parent-using-refs-with-functional-component)

Essentially, useRef is like a “box” that can hold a mutable value in its `.current` property.

You might be familiar with refs primarily as a way to access the DOM. If you pass a ref object to React with <div ref={myRef} />, React will set its .current property to the corresponding DOM node whenever that node changes.

#### Further Reading

[https://stackoverflow.com/questions/57005663/when-to-use-useimperativehandle-uselayouteffect-and-usedebugvalue](https://stackoverflow.com/questions/57005663/when-to-use-useimperativehandle-uselayouteffect-and-usedebugvalue)
