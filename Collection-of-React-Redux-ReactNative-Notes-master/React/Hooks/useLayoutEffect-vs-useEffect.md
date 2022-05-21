#### First note this basic property of useEffect()

Unlike componentDidMount or componentDidUpdate, effects scheduled with useEffect don’t block the browser from updating the screen. This makes your app feel more responsive. The majority of effects don’t need to happen synchronously. In the uncommon cases where they do (such as measuring the layout), there is a separate useLayoutEffect Hook with an API identical to useEffect.

### useEffect vs useLayoutEffect

#### The Difference Between useEffect and useLayoutEffect

It’s all in the timing.

useEffect runs asynchronously and after a render is painted to the screen.

So that looks like:

You cause a render somehow (change state, or the parent re-renders)
React renders your component (calls it)
The screen is visually updated
THEN useEffect runs
useLayoutEffect, on the other hand, runs synchronously after a render but before the screen is updated. That goes:

You cause a render somehow (change state, or the parent re-renders)
React renders your component (calls it)
useLayoutEffect runs, and React waits for it to finish.
The screen is visually updated

#### useLayoutEffect, executes AFTER the dom changes are calculated during a render but BEFORE the dom gets painted. Thus you can manipulate what the user actually sees before the initial render.

useEffect on the other hand always occurs AFTER the dom gets painted, thus you can’t use it to calculate something based on the dom (like current width of an auto-width element) and then also manipulate the dom without causing an additional render (which leads to a render loop). useLayoutEffect short circuits this loop by calculating and manipulating before any painting happens so you only render once.

Both type of effects would cause another render/commit, but a layout effect would do it before the browser paints - so the user would never see the intermediate state. This is the main reason you'd use one

### useEffect

99% of the time this is what you want to use. When hooks are stable and if you refactor any of your class components to use hooks, you'll likely move any code from componentDidMount, componentDidUpdate, and componentWillUnmount to useEffect.

The one catch is that this runs after react renders your component and ensures that your effect callback does not block browser painting. This differs from the behavior in class components where componentDidMount and componentDidUpdate run synchronously after rendering. It's more performant this way and most of the time this is what you want.

#### When to use useLayoutEffect instead of useEffect

However, if your effect is mutating the DOM (via a DOM node ref) and the DOM mutation will change the appearance of the DOM node between the time that it is rendered and your effect mutates it, then you don't want to use useEffect. You'll want to use useLayoutEffect. Otherwise the user could see a flicker when your DOM mutations take effect. This is pretty much the only time you want to avoid useEffect and use useLayoutEffect instead.

useLayoutEffect
This runs synchronously immediately after React has performed all DOM mutations. This can be useful if you need to make DOM measurements (like getting the scroll position or other styles for an element) and then make DOM mutations or trigger a synchronous re-render by updating state.

As far as scheduling, this works the same way as componentDidMount and componentDidUpdate. Your code runs immediately after the DOM has been updated, but before the browser has had a chance to "paint" those changes (the user doesn't actually see the updates until after the browser has repainted).

#### The right time to useLayoutEffect ? You’ll know it when you see it. Literally ;)

If your component is flickering when state is updated – as in, it renders in a partially-ready state first and then immediately re-renders in its final state – that’s a good clue that it’s time to swap in useLayoutEffect.

In most cases where I will have a choice between useEffect() and useLayoutEffect() I will see that the version with useLayoutEffect only updates visually once even though the component rendered twice. The useEffect version, on the other hand, visually renders twice, so you see a flicker where the value is briefly 0.
