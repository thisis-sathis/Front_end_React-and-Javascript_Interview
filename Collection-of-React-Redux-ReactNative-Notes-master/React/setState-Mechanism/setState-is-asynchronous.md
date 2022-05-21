setState is asynchronous function and just like any asynchronous function is being passed on to the event loop, setState also is passed on to the event loop and any code after it will execute seemlessly.

Once the setState method has completed executing, it will trigger the render method, which is when React will work on the document render.
