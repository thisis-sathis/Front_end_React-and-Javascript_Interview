### Shallow vs mount

Mount actually executes the html, css and js code like a browser would, but does so in a simulated way. It is “headless” for example, meaning it doesn’t render or paint anything to a UI, but acts as a simulated web browser and executes the code in the background.

Not spending time painting anything to the UI makes your tests much faster. However mount tests are still much slower than shallow tests.

This is why you unmount or cleanup the component after each test, because it’s almost a live app and one test will affect another test.

Mount/render is typically used for integration testing and shallow is used for unit testing.

shallow rendering only renders the single component we are testing. It does not render child components. This allows us to test our component in isolation.
