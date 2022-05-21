#### Native apps that feel smooth often incorporate lots of little animations for state changes and transitions. How would you implement these behaviors?

React Native comes with the Animated API built in. This API is declarative: We define specific animations, using Animated.timing, Animated.spring, etc., and provide the exact parameters needed for the animation to run. This technique falls apart when we need lots of subtle and delicate animations on the fly; it’s not performant, and maintaining all that code would be a nightmare.

Instead, we look to the LayoutAnimation module, which is an interpolative API. We can invoke predefined LayoutAnimations, or define our own. LayoutAnimation watches changes in the positions of elements between cycles of the render loop, and computes the positional differences between elements at different cycles. Then, it interpolates those changes and produces a smooth, natively driven animation.
