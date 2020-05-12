export default (fn: any, ...rest: any) => (...args: any) => {
  const result = fn(...args);
  console.warn(
    {
      args,
      result,
    },
    rest
  );
  return result;
};
