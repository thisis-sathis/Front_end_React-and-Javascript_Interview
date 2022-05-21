## Other usecases of useRef() or createRef()

### Instance variables

In class based components, if you want a value that can change but doesn’t trigger a render cycle. An instance variable is what you want. eg: this.palindrome = 'racecar' and later this.palindrome='pullup'

In function components, useRef can fill that role!
Since useRef(initialValue) returns an object with a mutable current property. There is nothing stopping us from using it like an instance variable.

const palindrome = useRef('racecar');
// const palindrome = { current: 'racecar' }
// ...
palindrome.current = 'pullup';
// const palindrome = { current: 'pullup' }
