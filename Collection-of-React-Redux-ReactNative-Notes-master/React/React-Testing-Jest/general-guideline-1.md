1. Always add **afterEach(cleanup)** unless you set the script to run automatically
   Failing to call cleanup when you've called render could result in a memory leak and tests which are not "idempotent" (which can lead to difficult to debug errors in your tests).

2. Avoid deep nesting
   I am sure you have seen code like this in tests files quite often. It’s so painful to maintain tests like these as its hard to keep track of what's initialized in before sections and what is state of data when actual scenario gets exected.

```js

describe('scenario 1 ', ()=>{
  before(()=>{
    ...
  });
  after(()=>{
    ...
  });
  describe('sub scenario', ()=>{
    before(()=>{
      ...
    });
    after(()=>{
      ...
    });
    describe('deep sub scenario', ()=>{
      ....
    });
  });
});

```

The best way is to avoid this nesting and try to isolate these scenarios which makes it really clean

```js
describe('scenario 1', ()=>{
  before(()=>{...})
  after(()=>{...})
  it('test scenario', ()=>{})
})

describe('scenario n', ()=>{
  before(()=>{...})
  after(()=>{...})
  it('test scenario', ()=>{})
}
```

So the above is an application of [Scoping](https://jestjs.io/docs/en/setup-teardown.html#scoping)

Meaning, by default, the before and after blocks apply to every test in a file. You can also group tests together using a describe block. When they are inside a describe block, the before and after blocks only apply to the tests within that describe block.

For example, let's say we had not just a city database, but also a food database. We could do different setup for different tests:

```js
// Applies to all tests in this file
beforeEach(() => {
  return initializeCityDatabase()
})

test("city database has Vienna", () => {
  expect(isCity("Vienna")).toBeTruthy()
})

test("city database has San Juan", () => {
  expect(isCity("San Juan")).toBeTruthy()
})

describe("matching cities to foods", () => {
  // Applies only to tests in this describe block
  beforeEach(() => {
    return initializeFoodDatabase()
  })

  test("Vienna <3 sausage", () => {
    expect(isValidCityFoodPair("Vienna", "Wiener Schnitzel")).toBe(true)
  })

  test("San Juan <3 plantains", () => {
    expect(isValidCityFoodPair("San Juan", "Mofongo")).toBe(true)
  })
})
```
