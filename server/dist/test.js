"use strict";
function sum(a, b) {
    return a + b;
}
function sumChain(a) {
    return function (b) {
        return sum(a, b);
    };
}
