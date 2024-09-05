"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const PollCard = ({ pollId, topic }) => {
    return (react_1.default.createElement("div", { style: cardStyle }, topic));
};
const cardStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    margin: '10px',
    borderRadius: '5px',
    display: 'inline-block',
};
exports.default = PollCard;
