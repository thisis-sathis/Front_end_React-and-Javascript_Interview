The lodash library also provides a throttling function to enables us to use it in our JS apps.

Using lodash, our autocomp would be like this:

```js

import { throttle } from lodash;
class autocomp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: []
        }
       this.handleInputThrottled = throttle(this.handleInput, 100)
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
                    {results.map(result=>{result})}
                </div>
            </div>
        );
    }
}

```

The same as underscore, nothing changed.

[improve-your-react-app-performance-by-using-throttling-and-debouncing](https://blog.bitsrc.io/improve-your-react-app-performance-by-using-throttling-and-debouncing-101afbe9055)
