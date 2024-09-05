"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Poll = () => {
    const { pollId } = (0, react_router_dom_1.useParams)();
    const [pollInfo, changePollInfo] = (0, react_1.useState)({
        topic: '',
        created_by: 0,
        questions: [{}]
    });
    (0, react_1.useEffect)(() => {
        const getPollInfo = () => __awaiter(void 0, void 0, void 0, function* () {
            const pollInfo = yield fetch(`/api/pollTest/${pollId}`).then(data => data.json());
            changePollInfo(pollInfo);
        });
        getPollInfo();
    }, []);
    console.log(pollInfo);
    const pollQuestions = pollInfo.questions;
    const displayOptions = (options) => {
        if (options) {
            return options.map((string) => ({ string }));
        }
    };
    return (pollInfo && (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h1", null,
            "Topic:",
            pollInfo.topic),
        pollQuestions.map((q, index) => {
            const displayOptions = (options) => {
                if (q.options) {
                    return (q.options.map((string, index) => {
                        console.log(string);
                        return (react_1.default.createElement("div", { key: index }, string));
                    }));
                }
            };
            return (react_1.default.createElement("div", { key: index, style: { marginBottom: '20px' } },
                react_1.default.createElement("div", null, q.question),
                displayOptions(q.options),
                react_1.default.createElement("input", { type: "text", placeholder: "Input Answer" })));
        }),
        react_1.default.createElement("div", null),
        react_1.default.createElement("button", { onClick: () => { console.log('submitted'); } }, "Submit"))));
};
exports.default = Poll;
