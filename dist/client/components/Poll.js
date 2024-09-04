"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Poll = () => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h1", null, "Question:"),
        react_1.default.createElement("div", null),
        react_1.default.createElement("div", null),
        react_1.default.createElement("input", { className: "input", placeholder: "Put your answer to the question here" }),
        react_1.default.createElement("button", { onClick: () => { console.log('submitted'); } })));
};
exports.default = Poll;
