"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const react_router_dom_1 = require("react-router-dom");
const PollCard_1 = __importDefault(require("./PollCard"));
const PollsPage = () => {
    const [topics, changeTopics] = (0, react_2.useState)([]);
    (0, react_2.useEffect)(() => {
        const fetchTopics = () => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield fetch('/api/topicsTest').then(response => response.json());
            changeTopics(data);
        });
        fetchTopics();
    }, []);
    console.log(topics);
    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', // Responsive columns
        gap: '10px', // Space between grid items
    };
    return (react_1.default.createElement("div", { style: gridStyle }, topics.map((topic) => {
        {
            console.log('pollcard generated');
        }
        return react_1.default.createElement(react_router_dom_1.Link, { key: topic._id, style: { color: 'black' }, to: `/poll/${topic._id}` },
            react_1.default.createElement(PollCard_1.default, { key: topic._id, pollId: topic._id, topic: topic.topic }));
    })));
};
exports.default = PollsPage;
