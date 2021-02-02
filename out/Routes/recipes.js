"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipesRoute = void 0;
const express_1 = __importDefault(require("express"));
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
    console.log("View one recipe");
});
