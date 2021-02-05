"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const DataAccess_1 = require("../DataAccess");
let mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
// let mongooseObg = DataAccess.mongooseInstance;
class RecipeModel {
    constructor() {
        this.createSchema();
        this.createModel();
    }
    createSchema() {
        this.schema = new mongoose_1.default.Schema({
            recipe_id: String,
            name: String,
            member_id: String
        }, { collection: 'recipes' });
    }
    createModel() {
        this.model = mongooseConnection.model("Recipes", this.schema);
    }
    retrieveAllRecipes(response) {
        var query = this.model.find({});
        query.exec((err, itemArray) => {
            response.json(itemArray);
        });
    }
}
exports.RecipeModel = RecipeModel;
