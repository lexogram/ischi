// Linear Congruential Generator

// Returns a number x such that 0.0 <= x < 1.0
export function lcg(seed = 1) {
  const a = 214013;
  const c = 2531011;
  const m = Math.pow(2, 31);

  let state = seed

  return function() {
    state = (a * state + c) % m;
    return state / 1000000000 % 1;
  };
}