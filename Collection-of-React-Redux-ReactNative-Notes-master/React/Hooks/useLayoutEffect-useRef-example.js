import React, { useState, useLayoutEffect, useRef } from "react"
import ShapeSizer from "./ShapeSizer"

export default function TheShape(props) {
  const [percentage, setPercentage] = useState(50)
  const [height, setHeight] = useState(null)

  const shapeRef = useRef(null)

  // I am setting the height inside the useLayoutEffect
  useLayoutEffect(() => {
    // Note, shapeRef.current is the the <div></div> node which is rendering the height
    setHeight(shapeRef.current.offsetHeight)
  }, [percentage])

  const style = {
    width: `100px`,
    height: `${percentage}%`,
    background: props.color,
    borderRadius: props.shape === "circle" ? "50%" : 0,
  }

  return (
    <React.Fragment>
      <main>
        {/* When I pass a ref object to React with <div ref={myRef} />, React will set myRef's .current property to the corresponding DOM node whenever that node changes. So here also the shapeRef.current is the this <div></div> node */}
        <div ref={shapeRef} className="shape__main" style={style}>
          {height}
        </div>
      </main>
      <ShapeSizer handleChange={percentage => setPercentage(percentage)} />
    </React.Fragment>
  )
}

/* Explanation
1. In the above the below div
        <div ref={shapeRef} className="shape__main" style={style}>
          {height}
        </div>

will ONLY show the {height} with useLayoutEffect() and NOT with useEffect()

2. The HTMLElement.offsetHeight read-only property returns the height of an element, including vertical padding and borders, as an integer.

Typically, offsetHeight is a measurement in pixels of the element's CSS height, including any borders, padding, and horizontal scrollbars (if rendered). It does not include the height of pseudo-elements such as ::before or ::after.
*/

/* More example -
https://codesandbox.io/s/oo47nj9mk9
*/

/*
Primer on what is is ref

Sometimes when using React.js you’ll need an escape hatch to write imperative-style code to interact directly with DOM elements. Using React’s createRef (for class component) and useRef(for Hooks based component) method allows you to do just that! refs are used to get reference to a DOM node or an instance of a component in a React Application i.e. refs would return the node we are referencing . All standard HTML elements in React have a reserved prop called ref (much like style which is a reserved prop).

If you pass a ref object to React with <div ref={myRef} />, React will set its .current property to the corresponding DOM node whenever that node changes.

**useRef** can be used to store an arbitrary value. E.g. you might want to use `useRef` to keep a mutable value for the entire life of the component.
*/
