export function analyticMiddleware() {
  return function (next) {
    return function (action) {
      return next(action);
    };
  };
}
