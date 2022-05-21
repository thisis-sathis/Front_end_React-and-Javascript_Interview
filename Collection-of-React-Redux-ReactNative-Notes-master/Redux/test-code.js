function foo4() {
  console.log(this === global)
}
foo4() // => true

function foo5() {
  "use strict"
  console.log(this === undefined)
}
foo5() // => true
