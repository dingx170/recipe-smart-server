import express, {Request, Response} from "express";

let recipesRoute = express.Router();

// view all recipes
recipesRoute.get("/", (req : Request, res : Response) => {
    res.send("Here are all the recipes!")
    console.log("View all recipes");
});

// view one recipe
recipesRoute.get("/:id", (req : Request, res : Response) => {
    res.send("Here is the recipe with id of " + req.params.id);
    console.log("View one recipe");
});

export {recipesRoute}