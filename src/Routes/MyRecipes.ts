import express, {Request, Response} from "express";

let myRecipesRoute = express.Router();

// view all recipes
myRecipesRoute.get("/", (req : Request, res : Response) => {
    res.send("Here are all my recipes!")
    console.log("View all recipes");
});

// view one recipe
myRecipesRoute.get("/:id", (req : Request, res : Response) => {
    res.send("Here is the recipe with id of " + req.params.id);
    console.log("View one recipe");
});

// post one recipe
myRecipesRoute.post("/", (req : Request, res : Response) => {
    res.send(req.body);
    console.log("Post one recipe");
});

// update one recipe
myRecipesRoute.put("/:id", (req : Request, res : Response) => {
    res.send("Updated the recipe with id of " + req.params.id);
    console.log("Update one recipe");
});

// delete one recipe
myRecipesRoute.delete("/:id", (req : Request, res : Response) => {
    res.send("Deleted the recipe with id of " + req.params.id);
    console.log("Delete one recipe");
});

export {myRecipesRoute}