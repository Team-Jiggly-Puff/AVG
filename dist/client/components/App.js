"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Home_1 = __importDefault(require("./Home"));
const react_redux_1 = require("react-redux");
const store_1 = __importDefault(require("../store"));
const Poll_1 = __importDefault(require("./Poll"));
require("bootstrap/dist/css/bootstrap.min.css");
const Layout_1 = __importDefault(require("./Layout"));
const App = () => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_redux_1.Provider, { store: store_1.default },
            react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
                react_1.default.createElement(react_router_dom_1.Routes, null,
                    react_1.default.createElement(react_router_dom_1.Route, { path: '/', element: react_1.default.createElement(Layout_1.default, null) },
                        react_1.default.createElement(react_router_dom_1.Route, { path: 'Home', element: react_1.default.createElement(Home_1.default, null) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: 'poll', element: react_1.default.createElement(Poll_1.default, null) })))))));
};
exports.default = App;
