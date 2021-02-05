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
let recipes = new RecipeModel_1.RecipeModel();
// view all recipes
recipesRoute.get("/", (req, res) => {
    console.log("View all recipes");
    recipes.retrieveAllRecipes(res);
    console.log("done");
});
// view one recipe
recipesRoute.get("/:id", (req, res) => {
    res.send("Here is the recipe with id of " + req.params.id);
    console.log("View one recipe");
});
