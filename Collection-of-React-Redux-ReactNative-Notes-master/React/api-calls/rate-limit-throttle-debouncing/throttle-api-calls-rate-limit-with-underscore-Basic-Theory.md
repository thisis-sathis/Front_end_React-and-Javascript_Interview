Throttling
Throttling enforces a maximum number of times a function can be called over time. As in “execute this function at most once every 100 milliseconds.”

To throttle in React, we will use the underscore and lodash.

### Use case of user typing in Input Field and an API call is made with that input to get the relevant data as typed by the user

once we enter a word in the input box it requests the api/users to fetch a list of users to display. On every letter type, the async network request is triggered and on success, the DOM is updated with the result via the this.setState call.

This name has 10 letters so doing the math, we will have 10 API requests and 10 DOM updates. Just for a single user!! To eventually get to see our intended name fidudusolanke appear with fewer results.
Even if the autocomplete lookups can be done without network requests (e.g. you have a local “database” in-memory) there’s still expensive DOM updates for that needs to be done for every single character/word typed in.

### Using underscore

We will use the underscore library to throttle our autocomp component. Underscore library has a throttle function that does throttling.

```js
import * as _ from underscore;

class Autocomp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: []
        }
       this.handleInputThrottled = _.throttle(this.handleInput, 100)
    }
    handleInput = evt => {
        const value = evt.target.value
        const filteredRes = data.filter((item)=> {
            // algorithm to search through the `data` array
        })
        this.setState({ results: filteredRes })
    }
    render() {
        let { results } = this.state;
        return (
            <div className='autocomp_wrapper'>
                <input placeholder="Enter your search.." onChange={this.handleInputThrottled} />
                <div>
                    {results.map(result=>{result})}****
                </div>
            </div>
        );
    }
}

```

The throttle function is passed a function that wants to be throttled and the amount of time it is to be throttled, it returns a function that is throttled. Here in our case, the handleInput method is passed to the throttle function and we want it to be throttled to 100ms.

Now, if we type **fidudusola** (which has 10 letters) at a normal speed of 1 letter per 200ms. In our throttled comp it would take 10 \* 200ms = (2000ms) 2s to type **fidudusola** that is the handleInput method would be called 2 (2000ms/ 100ms = 2) times instead of 10 times initially in our non-throttled autocomp component.

See our component would have to update twice for typing **fidudusola** it is appreciable for the 10-letter word, other than the 10 re-renders for the initial non-throttled component.
