### Why do we use StyleSheet.create? What are the tradeoffs with this approach?

StyleSheet is a module built into React Native that allows us to create immutable stylesheet references. We can pass regular style objects into the create() method, and the module will freeze the objects, and assign each one an ID. This has two benefits: it allows us to avoid creating a new style object on every render pass (which could lead to degradation of render performance), and it allows us to send the object across the asynchronous bridge only once (since these style objects map directly to native styles, they need to be passed across). So it allows to send the style only once through the bridge. All subsequent uses are going to refer an id

The key tradeoff with this method is that recomputing styles based on external criteria (like screen rotation or even a user-selected viewing mode) needs some infrastructure built to determine which styles to use. If objects were passed in “raw” they could be recomputed on the fly every time, based on arbitrary criteria.

```js
import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useSelector, useDispatch } from "react-redux"
import { View, Text, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  welcomeText: {
    textAlign: "center",
    color: constants().GLOBAL_BLUE,
    fontFamily: "Montserrat-Regular",
    fontSize: 28,
    lineHeight: 36,
  },
})
```
