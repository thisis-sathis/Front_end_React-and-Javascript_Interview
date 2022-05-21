Debouncing
Debouncing enforces that a function will not be called again until a certain amount of time has passed since its last call. As in “execute this function only if an amount of time (ex. 100 milliseconds) have passed without it being called.”

In debouncing, it ignores all calls to a function and waits until the function has stopped being called for a specified amount of time.
Let’s make our auto component use debouncing:

### Using lodash

```js
import { debounce } from "lodash"
class autocomp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      results: [],
    }
    this.handleInputThrottled = debounce(this.handleInput, 100)
  }
  handleInput = evt => {
    const value = evt.target.value
    const filteredRes = data.filter(item => {
      // algorithm to search through the `data` array
    })
    this.setState({ results: filteredRes })
  }
  render() {
    let { results } = this.state
    return (
      <div className="autocomp_wrapper">
        <input
          placeholder="Enter your search.."
          onChange={this.handleInputThrottled}
        />
        <div>
          {results.map(result => {
            result
          })}
        </div>
      </div>
    )
  }
}
```
