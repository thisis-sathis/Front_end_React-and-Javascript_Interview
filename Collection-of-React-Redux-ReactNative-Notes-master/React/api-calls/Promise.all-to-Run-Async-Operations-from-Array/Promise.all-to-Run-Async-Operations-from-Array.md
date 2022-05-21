Iterating through an array in JavaScript with .map() expects a synchronous operation and a return of an (updated) value. Well, you could do a trick and return a promise. The returned promise is a value that satisfies map and ultimately represents an async operation

```js
const axios = require("axios")

const repos = [
  {
    url: "https://api.github.com/repos/fs-opensource/futureflix-starter-kit",
  },
  {
    url: "https://api.github.com/repos/fs-opensource/android-tutorials-glide",
  },
]

const getRepoInArr = async repos => {
  // the below promises variable will hold the response from a map function.
  // The .map() will run an axios.get request for each of the url in the given array
  // and return an object for each of the axios.get request

  const promises = repos.map(async repo => {
    const response = await axios({
      method: "GET",
      url: repo.url,
      headers: {
        Accept: "application/json",
      },
    })

    return {
      name: response.data.full_name,
      description: response.data.description,
    }
  })

  //Outside the map function, await all promises to resolve.
  const promises = Promise.all(promises)
  console.log(results)
}

getRepoInArr()

/* OUTPUT :
[ { name: 'futurestudio/futureflix-starter-kit',
    description: 'Starter kit for the “learn hapi” learning path' },
  { name: 'futurestudio/android-tutorials-glide',
    description: 'Example code for Glide tutorial series, start here:' } ]
 */
```

#### Further Reading

[https://futurestud.io/tutorials/node-js-how-to-run-an-asynchronous-function-in-array-map](https://futurestud.io/tutorials/node-js-how-to-run-an-asynchronous-function-in-array-map)
