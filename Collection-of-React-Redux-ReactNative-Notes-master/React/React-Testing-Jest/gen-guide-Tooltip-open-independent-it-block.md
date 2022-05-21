Original Case - See How it could be improved
I am adding tests for a react tooltip component. In describe block there are two it blocks, one opens it, other one closes it. So I don't need cleanup between them, just after every describe. How do I achieve that? Also, if I am grouping these blocks in the wrong way, please do correct me. I am new to testing.

```js
import React from "react"
import { render, fireEvent, screen } from "@testing-library/react"

afterEach(cleanup)
describe("renders hover triggered tooltip", () => {
  const { container, queryByText } = render(
    <TooltipTrigger tooltip={Tooltip}>{Trigger}</TooltipTrigger>,
  )

  it("opens tooltip", () => {
    fireEvent.mouseEnter(container.firstChild)
    jest.runAllTimers()
    expect(queryByText("Tooltip")).toBeTruthy()
  })

  it("closes tooltip", () => {
    fireEvent.mouseLeave(container.firstChild)
    jest.runAllTimers()
    expect(queryByText("Tooltip")).toBeFalsy()
  })
})
```

The problem in the above code is - **your tests should be independent from each other and they shouldn't have this kind of shared state.**

If you arranged your tests in this way then if someone introduces a bug in the "opens tooltip" logic, both tests fail. The "closes tooltip" test failure is just a false positive, and will automatically be resolved when you fix the "opens tooltip" logic.

All that false positive is doing is making it take longer for you to understand the actual issue. You can see how if you apply the same pattern to your entire testing codebase, then before long any change that breaks the tests will result in 1 legitimate failure, and potentially hundreds of false positives, which you have to trace through to find the one actually broken test.

You really want your it blocks to be independent, so if you have one it that's opening a tooltip, and then a second it that's expecting a tooltip to be opened from the previous one, then you're implicitly coupling global state between the 2 tests. It'd be better to make each it independent.

First off, I'd render the component in a beforeEach so that each it gets a fresh instance. Without really having much context, I'd probably write the code something like this:

```js
describe("renders hover triggered tooltip", () => {
  let container, queryByText

  beforeEach(() => {
    ;({ container, queryByText } = render(
      <TooltipTrigger tooltip={Tooltip}>{Trigger}</TooltipTrigger>,
    ))
    fireEvent.mouseEnter(container.firstChild)
    jest.runAllTimers()
  })

  afterEach(() => {
    // Cleanup
  })

  it("opens tooltip", () => {
    expect(queryByText("Tooltip")).toBeTruthy()
  })

  it("closes tooltip", () => {
    fireEvent.mouseLeave(container.firstChild)
    jest.runAllTimers()
    expect(queryByText("Tooltip")).toBeFalsy()
  })
})
```

I think it's up for debate if the code to open the tooltip should be in beforeEach or repeated in each it.

Separately on fireEvent - [From the docs](https://testing-library.com/docs/guide-events)

you should know that fireEvent isn't exactly how the user interacts with your application, but it's close enough for most scenarios.

Consider fireEvent.click which creates a click event and dispatches that event on the given DOM node. This works properly for most situations when you simply want to test what happens when your element is clicked, but when the user actually clicks your element, these are the events that are typically fired (in order):

fireEvent.mouseOver(element)
fireEvent.mouseMove(element)
fireEvent.mouseDown(element)
element.focus() (if that element is focusable)
fireEvent.mouseUp(element)
fireEvent.click(element)
And then, if that element happens to be a child of a label, then it will also move focus to the form control that the label is labeling. So even though all you really are trying to test is the click handler, by simply using fireEvent.click you're missing out on several other potentially important events the user is firing along the way.

Again, most of the time this isn't critical for your tests and the trade-off of simply using fireEvent.click is worth it.
