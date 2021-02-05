"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipesRoute = void 0;
const express_1 = __importDefault(require("express"));
const RecipeModel_1 = require("../Models/RecipeModel");
let recipesRoute = express_1.default.Router();
exports.recipesRoute = recipesRoute;
// view all recipes
recipesRoute.get("/", (req, res) => {
    res.send("Here are all the recipes!");
    console.log("View all recipes");
});
// view one recipe
recipesRoute.get("/:id", (req, res) => {
    res.send("Here is the recipe with id of " + req.params.id);
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true }, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Database connected");
    });
    let Recipes = mongoose.model('Recipes', RecipeModel_1.RecipeSchema, 'recipes');
    Recipes.find({}, function (err, doc) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(doc);
    });
    console.log("View one recipe");
});
