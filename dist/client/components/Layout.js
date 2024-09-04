"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const NavBar_1 = __importDefault(require("./NavBar")); // Adjust the import path as needed
const react_router_dom_1 = require("react-router-dom");
const Layout = () => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(NavBar_1.default, null),
        react_1.default.createElement(react_router_dom_1.Outlet, null)));
};
exports.default = Layout;
