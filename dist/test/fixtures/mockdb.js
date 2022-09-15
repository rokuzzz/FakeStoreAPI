"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const connect = async () => {
    const mongod = await mongodb_memory_server_1.MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose_1.default.connect(uri);
    return {
        closeDatabase: async () => {
            await mongoose_1.default.connection.dropDatabase();
            await mongoose_1.default.connection.close();
            await mongod.stop();
        },
        clearDatabase: async () => {
            const collections = mongoose_1.default.connection.collections;
            for (const key in collections) {
                const collection = collections[key];
                await collection.deleteMany({});
            }
        },
    };
};
exports.default = connect;
//# sourceMappingURL=mockdb.js.map