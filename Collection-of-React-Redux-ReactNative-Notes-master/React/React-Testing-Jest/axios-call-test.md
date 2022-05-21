**Main Component file that fires the axios call**

```js
import axios from "axios"

export const API = "https://hn.algolia.com/api/v3"

export const fetchData = async query => {
  const url = `${API}/search?query=${query}`

  return await axios.get(url)
}

fetchData("react")
```

**Test** File

```js
import axios from "axios"
import { fetchData, API } from "./"
jest.mock("axios")

describe("fetchData", () => {
  it("fetches successfully data from an API", async () => {
    const data = {
      data: {
        hits: [
          {
            objectID: "1",
            title: "a",
          },
          {
            objectID: "2",
            title: "b",
          },
        ],
      },
    }

    axios.get.mockImplementationOnce(() => Promise.resolve(data))

    await expect(fetchData("react")).resolves.toEqual(data)

    expect(axios.get).toHaveBeenCalledWith(`${API}/search?query=react`)
  })

  it("fetches erroneously data from an API", async () => {
    const errorMessage = "Network Error"

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    )

    await expect(fetchData("react")).rejects.toThrow(errorMessage)
  })
})
```

#### Further Reading

[mockFn.mockImplementationOnce(fn)](https://jestjs.io/docs/en/mock-function-api.html#mockfnmockimplementationoncefn)

Accepts a function that will be used as an implementation of the mock for one call to the mocked function. Can be chained so that multiple function calls produce different results.

[https://www.robinwieruch.de/axios-jest](https://www.robinwieruch.de/axios-jest)
