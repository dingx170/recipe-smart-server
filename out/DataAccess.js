"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataAccess = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class DataAccess {
    constructor() {
        DataAccess.connect();
    }
    static connect() {
        if (this.mongooseInstance) {
            return this.mongooseInstance;
        }
        this.mongooseConnection = mongoose_1.default.connection;
        this.mongooseConnection.on("open", () => {
            console.log("Connected to MongoDB");
        });
        mongoose_1.default.set('useCreateIndex', true);
        mongoose_1.default.set('useNewUrlParser', true);
        mongoose_1.default.set('useUnifiedTopology', true);
        this.mongooseInstance = mongoose_1.default.connect(this.DB_CONNECTION_STRING);
        return this.mongooseInstance;
    }
}
exports.DataAccess = DataAccess;
DataAccess.DB_CONNECTION_STRING = 'mongodb://localhost:27017/test'; // 'mongodb://dbAdmin:test@localhost:3000/toDoSample?authSource=admin';
DataAccess.connect();
