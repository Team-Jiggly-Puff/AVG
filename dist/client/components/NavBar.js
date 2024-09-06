"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const NavBar = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    return (react_1.default.createElement("nav", { className: "navbar navbar-expand-lg navbar-light bg-light" },
        react_1.default.createElement("a", { className: "navbar-brand", href: "#" }, "AVG"),
        react_1.default.createElement("button", { className: "navbar-toggler", type: "button", "data-toggle": "collapse", "data-target": "#navbarNavDropdown", "aria-controls": "navbarNavDropdown", "aria-expanded": "false", "aria-label": "Toggle navigation" },
            react_1.default.createElement("span", { className: "navbar-toggler-icon" })),
        react_1.default.createElement("div", { className: "collapse navbar-collapse", id: "navbarNavDropdown" },
            react_1.default.createElement("ul", { className: "navbar-nav" },
                react_1.default.createElement("li", { className: "nav-item active" },
                    react_1.default.createElement(react_router_dom_1.Link, { className: "nav-link", to: "/Home" },
                        "Home ",
                        react_1.default.createElement("span", { className: "sr-only" }, "(current)"))),
                react_1.default.createElement("li", { className: "nav-item", onClick: () => { console.log('hi'); } },
                    react_1.default.createElement(react_router_dom_1.Link, { className: "nav-link", to: "/polls" }, "Polls")),
                react_1.default.createElement("li", { className: "nav-item" },
                    react_1.default.createElement("a", { className: "nav-link", href: "#" }, "Pricing")),
                react_1.default.createElement("li", { className: "nav-item dropdown" },
                    react_1.default.createElement("a", { className: "nav-link dropdown-toggle", href: "#", id: "navbarDropdownMenuLink", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" }, "Dropdown link"),
                    react_1.default.createElement("div", { className: "dropdown-menu", "aria-labelledby": "navbarDropdownMenuLink" },
                        react_1.default.createElement("a", { className: "dropdown-item", href: "#" }, "Action"),
                        react_1.default.createElement("a", { className: "dropdown-item", href: "#" }, "Another action"),
                        react_1.default.createElement("a", { className: "dropdown-item", href: "#" }, "Something else here")))))));
};
exports.default = NavBar;
