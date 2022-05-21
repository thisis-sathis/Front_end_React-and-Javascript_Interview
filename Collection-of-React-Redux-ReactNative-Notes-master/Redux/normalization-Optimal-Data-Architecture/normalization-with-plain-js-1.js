const categories = [
  { name: "abs", id: "32o8wafe", exercises: ["crunches", "plank"] },
  { name: "arms", id: "oaiwefjo", exercises: ["crunches", "pullups"] },
  { name: "legs", id: "aoijwfeo", exercises: ["squat", "plank"] },
]

/*
In a large redux app, we need a different approach that gives us the benefit of both easy iteration with Object.values(state.categories), and fast O(1) access to individual items:

categories: {
'32o8wafe': {id: '32o8wafe', name: 'abs',  exercises: ["crunches", "plank"]},
'oaiwefjo': {id: 'oaiwefjo', name: 'arms', exercises:["crunches", "pullups"] },
'3oij2e3c': {id: '3oij2e3c', name: 'legs', exercises: ["squat", "plank"] },
}

Notice how the id is both the key for the row, and a property in the row itself. This little bit of duplication affords us great flexibility at access time. It’s also compatible with the normalized (aka flat) shape that the redux docs recommend.
*/

// const normalizeArr = arr => {
//   return arr.reduce((obj, item) => Object.assign(obj, { [item.id]: item }), {})
// }

// Alt-2

const normalize = arr => {
  let result = {}
  arr.map(item => {
    result[item.id] = item
  })
  return result
}

console.log(normalizeArr(categories))
