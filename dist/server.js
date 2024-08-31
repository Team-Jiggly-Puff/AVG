"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'client')));
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'build')));
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//     try {
//         console.log('I AM GETTING HIT');
//         res.send(path.join(__dirname,'..','build','index.html'));
//     } catch (err) {
//         return next({
//             log: 'Error sending index.html to client',
//             message: { err: 'Server error loading page'}
//         });
//     }
// });
app.get('*', (req, res) => {
    console.log('I AM GETTING');
    console.log(path_1.default.join(__dirname, '..', 'build', 'index.html'));
    res.sendFile(path_1.default.join(__dirname, '..', 'build', 'index.html'));
});
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//     console.error(err.stack); 
//     res.status(err.status || 500).json({
//       error: {
//         message: err.message || 'Internal Server Error',
//         stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
//       },
//     });
//   });
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
