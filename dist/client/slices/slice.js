"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.incrementByAmount = exports.decrement = exports.increment = exports.counterSlice = void 0;
// features/counter/counterSlice.ts
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    value: 0,
};
exports.counterSlice = (0, toolkit_1.createSlice)({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
});
_a = exports.counterSlice.actions, exports.increment = _a.increment, exports.decrement = _a.decrement, exports.incrementByAmount = _a.incrementByAmount;
exports.default = exports.counterSlice.reducer;
