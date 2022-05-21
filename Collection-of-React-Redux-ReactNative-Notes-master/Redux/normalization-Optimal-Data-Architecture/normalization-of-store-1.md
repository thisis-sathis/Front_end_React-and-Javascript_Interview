### Redux docs official recommendation on normalization

**Redux docs recommend that state is normalized. That means that we should store the items in an object where the keys are the IDs of the items and the values the items themselves.**

### What is Normalisation, and why its required

The term normalisation comes from the database world. It refers to transforming the schema of a database to remove redundant information. Also, redundant information means the same data that is stored in more than one place.

Why is it important? There are many possible reasons, the one thats probably the most important is about offering a single point of truth. It means that there’s exactly one place in the database that contains the true value of something.

#### Another Big reason to go for a normalised state in Redux is performance.

If you have deeply nested structures, it’s difficult to traverse them. It’s much easier to find your data if you have it all filed by their ID in a dictionary / hash / map structure.

Imagine the performance of finding an article by its ID in a big array of articles (you’d have to go through the whole collection and check IDs along the way until you find it) compared to finding it in a dictionary structure where you can just fetch it directly by the ID.

Usually, the format of the data that you receive in your app from your REST API reflects how backend treats this data, which probably will be different how this data should be structured for you in the FrontEnd.

Lets take a look at the below data,

```js
const blogPosts = [
  {
    id: "post1",
    author: { username: "user1", name: "User 1" },
    body: "......",
    comments: [
      {
        id: "comment1",
        author: { username: "user2", name: "User 2" },
        comment: ".....",
      },
      {
        id: "comment2",
        author: { username: "user3", name: "User 3" },
        comment: ".....",
      },
    ],
  },
  {
    id: "post2",
    author: { username: "user2", name: "User 2" },
    body: "......",
    comments: [
      {
        id: "comment3",
        author: { username: "user3", name: "User 3" },
        comment: ".....",
      },
      {
        id: "comment4",
        author: { username: "user1", name: "User 1" },
        comment: ".....",
      },
      {
        id: "comment5",
        author: { username: "user3", name: "User 3" },
        comment: ".....",
      },
    ],
  },
  // and repeat many times
]
```

Notice in the above, the structure of the data is a bit complex, and some of the data is repeated. This is a concern for several reasons:

When a piece of data is duplicated in several places, it becomes harder to make sure that it is updated appropriately.
Nested data means that the corresponding reducer logic has to be more nested and therefore more complex. In particular, trying to update a deeply nested field can become very ugly very fast.
Since immutable data updates require all ancestors in the state tree to be copied and updated as well, and new object references will cause connected UI components to re-render, an update to a deeply nested data object could force totally unrelated UI components to re-render even if the data they're displaying hasn't actually changed.

### Backend

The backend side needs to handle thousands of different users, so when one of them signs in using the mobile app and fetches their articles here’s what they do: they look for this particular user, find a collection of all of their articles and send it back to the app. Probably, as an array. Maybe something like that:

```js
{
  articles: [
    {
      id: 1,
      title: "Dagon",
      tags: [
        { id: 1, name: "old ones" },
        { id: 2, name: "short story" },
      ],
    },
    {
      id: 2,
      title: "Azathoth",
      tags: [
        { id: 1, name: "old ones" },
        { id: 3, name: "novel" },
      ],
    },
    {
      id: 3,
      title: "At the Mountains of Madness",
      tags: [
        { id: 4, name: "insanity" },
        { id: 3, name: "novel" },
      ],
    },
  ]
}
```

### Frontend

What would happen in a lot of apps, they’d just store those articles in the same form as they received it — as an array. This would make it easy to store (you can just save the JSON object that you received), but (a bit more) difficult to fetch the articles afterwards.

Instead of doing that, we should think about what would be the best schema for us. Probably, we’d do a lot of accessing by the article ID, so it would be nice to store them in a dictionary that allows us direct access. Also, we might notice that there’s some data redundancy with the tags. Backend returned to us a bunch of strings that get repeated a lot. We could do better by assigning them IDs, storing them in a separate table / dictionary and just reference them in articles. For example, our store could look like that:

```js
{
  articles: {
    1: { title: "Dagon", tags: [1, 2] },
    2: { title: "Azathoth", tags: [1, 3] },
    3: { title: "At the Mountains of Madness", tags: [3, 4] }
  },
  tags: {
    1: "old ones",
    2: "short story",
    3: "novel",
    4: "insanity"
  }
}

```

And the below code will output exactly what what I want my final data-signature to be

```js
import { normalize, schema } from "normalizr"
// const { normalize, schema } = require("normalizr"); // If I am using it in a stand-alone .js file
// https://nodejs.org/api/modules.html#modules_require_id

const tag = new schema.Entity("tags", {})
const article = new schema.Entity("articles", {
  tags: [tag],
})

// We assume articlesData is the (parsed) JSON object that we got
const normalizedData = normalize(articlesData, { articles: [article] })

console.log("normalizr data is ", normalizedData)
```

Output

```js
{
  articles: {
    1: { title: "Dagon", tags: [1, 2] },
    2: { title: "Azathoth", tags: [1, 3] },
    3: { title: "At the Mountains of Madness", tags: [3, 4] }
  },
  tags: {
    1: "old ones",
    2: "short story",
    3: "novel",
    4: "insanity"
  }
}

```

- [normalizing-state-shape/](https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape/)

- [advanced-redux-patterns-normalisation](https://blog.brainsandbeards.com/advanced-redux-patterns-normalisation-6b9a5aa46e1f)

- [shape-your-redux-store-like-your-database](https://hackernoon.com/shape-your-redux-store-like-your-database-98faa4754fd5)
