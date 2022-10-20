export const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((v, f) => f(v), x);

export const curry = (func) => {
  const curried = (...args) => {
    if (args.length >= func.length) {
      return func.apply(this, args);
    }
    return (...args2) => {
      return curried.apply(this, args.concat(args2));
    };
  };
  return curried;
};
