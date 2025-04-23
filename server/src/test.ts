function sum(a: number, b: number) {
  return a + b;
}

function sumChain(a: number) {
  return function (b: number) {
    return sum(a, b);
  };
}
