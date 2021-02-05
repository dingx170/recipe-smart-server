import express, {Request, Response} from "express";

import {RecipeModel} from '../Models/RecipeModel';


let recipesRoute = express.Router();
let recipes = new RecipeModel();

// view all recipes
recipesRoute.get("/", (req : Request, res : Response) => {
    console.log("View all recipes");

    recipes.retrieveAllRecipes(res);

    console.log("done");
});

// view one recipe
recipesRoute.get("/:id", (req : Request, res : Response) => {
    res.send("Here is the recipe with id of " + req.params.id);
    console.log("View one recipe");
});

export {recipesRoute}