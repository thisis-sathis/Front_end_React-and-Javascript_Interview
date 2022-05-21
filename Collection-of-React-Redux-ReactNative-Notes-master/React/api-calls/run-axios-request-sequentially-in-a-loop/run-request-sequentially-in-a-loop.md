```js
const axios = require("axios")

const urls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
  "https://jsonplaceholder.typicode.com/posts/3",
  "https://jsonplaceholder.typicode.com/posts/4",
]

const urls2 = [
  "https://api.github.com/repos/fs-opensource/futureflix-starter-kit",
  "https://api.github.com/repos/fs-opensource/android-tutorials-glide",
]

const getSequentially = (arr, index) => {
  return axios
    .get(arr[index])
    .then(res => {
      // here do things like setState
      console.log(res.data)
      if (index < arr.length - 1) {
        // I could also implement a delay here
        // setTimeout(() => {
        // 	return getSequentially(arr, index + 1);
        // }, 1000);
        return getSequentially(arr, index + 1)
      }
    })
    .catch(err => console.log(err))
}

getSequentially(urls, 0)
```

#### Further Reading
