1. Don’t call Hooks inside loops, conditions, or nested functions. Instead, always use Hooks at the top level of your React function.

By following this rule, you ensure that Hooks are called in the same order each time a component renders. That’s what allows React to correctly preserve the state of Hooks between multiple useState and useEffect calls.

2. even if two Hooks use a name state variable, they would be isolated from each other. Every useState() call gets its own “memory cell”.
