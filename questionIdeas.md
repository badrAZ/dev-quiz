### React

- What's the difference between useMemo and useCallback?

```js
// returns the passed function
// Need: to not create a function on each render
I: useCallBack(() => a, [])
O: () => a

// execute the passed function
// Idea: to not do computations on each render
I: useMemo(() => a, [])
O: a
```
