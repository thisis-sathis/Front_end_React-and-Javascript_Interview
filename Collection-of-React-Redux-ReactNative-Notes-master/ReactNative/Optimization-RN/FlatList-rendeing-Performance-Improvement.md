I was getting performance issues while rendering 5000+ items in flat-list. Looked for other alternatives and found recyclerlistview - High performance list-view for React Native and web. Much better scrollTo performance and better rendering optimisations compared to flat-list.

## FlatList Performance Improvement

### A. Avoid anonymous arrow function on renderItem props.

Move out the renderItem function to the outside of render function, so it won't recreate itself each time render function called.

### B. Try add initialNumToRender prop on your FlatList

It will define how many items will be rendered for the first time, it could save some resources with lot of data.

> ### C. Define the key prop on your Item Component

Simply it will avoid re-render on dynamically added/removed items with defined key on each item. Make sure it is unique, don't use index as the key! You can also using keyExtractor as an alternative.

### D. maxToRenderPerBatch

set the maxToRenderPerBatch={number}, which is a VirtualizedList prop that can be passed directly to FlatList. With this, you can control the amount of items rendered per batch, which is the next chunk of items rendered on every scroll.

Win: Setting a bigger number means less visual blank areas when scrolling (a better fill rate).

Trade offs: More items per batch means less javascript performance, which means less responsiveness (clicking a item and opening the detail). If you have a static and non-interactive list, this could be the way to go.

### E. Set removeClippedSubviews={true}. Because, by setting the removeClippedSubviews prop to true, RN will un-mount components that are off of the window.

Win: This is very memory friendly, as you will always have a little amount of rendered items instead of the whole list.

Trade offs: Be aware that this implementation can have bugs, such as missing content (mainly observed on iOS) if you use it on a component that will not unmount (such as a root navigation scene). It also can be less performant, having choppy scroll animations for big lists with complex items on not-so-good devices, as it makes crazy amounts of calculations per scroll.

### E. getItemLayout - It improves item rendering since React will previously know its layout definition

You can set the getItemLayout to your FlatList component. If all your list item components have the same height (or width, for a horizontal list), passing this prop removes the need for your FlatList to dynamically calculate it every time. This is a very desirable optimization technique and if your components have dynamic size, and you really need performance, consider asking your design team if they may think of a redesign in order to perform better. Your method should look like this, for items with height of, say, 70:

```js
getItemLayout = (data, index) => ({
  length: 70,
  offset: 70 * index,
  index,
})
```

```js

// render item function, outside from class's `render()`
const renderItem = ({ item }) => (<Text key={item.key}>{item.key}</Text>);

// we set the height of item is fixed
const getItemLayout = (data, index) => (
  {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
);

const items = [{ key: 'a' }, { key: 'b'}, ...+400];

function render () => (
  <FlatList
    data={items}
    renderItem={renderItem}
    getItemLayout={getItemLayout}
    initialNumToRender={5}
    maxToRenderPerBatch={10}
    windowSize={10}
  />
);
```

### F. Remove console.logs anywhere near your list. They slow the Javascript thread really bad.

### G. Use cached and performatic images, such as [react-native-fast-image](https://github.com/DylanVann/react-native-fast-image). Every operation that you can remove or abbreviate for freeing the Javascript thread: do it (every image is a new Image(), so, if they are cached, you have your loaded hook called sooner)

#### Further Reading

- [https://stackoverflow.com/questions/44384773/react-native-100-items-flatlist-very-slow-performance](https://stackoverflow.com/questions/44384773/react-native-100-items-flatlist-very-slow-performance)

- [https://github.com/filipemerker/flatlist-performance-tips](https://github.com/filipemerker/flatlist-performance-tips)

- [https://reactnative.dev/docs/optimizing-flatlist-configuration](https://reactnative.dev/docs/optimizing-flatlist-configuration)
