import mongoose from "mongoose"

interface IRecipeModel extends mongoose.Document {
    recipe_id: string;
    name: string;
    member_id: string;
}

export {IRecipeModel};