"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeSchema = void 0;
const mongoose_1 = require("mongoose");
const RecipeSchema = new mongoose_1.Schema({
    recipe_id: String,
    name: String,
    member_id: String
});
exports.RecipeSchema = RecipeSchema;
