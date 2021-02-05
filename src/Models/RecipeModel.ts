import mongoose, {Schema} from "mongoose"

// let mongooseConnection = DataAccess.mon

const RecipeSchema: Schema = new Schema({
    recipe_id: String,
    name: String,
    member_id: String
  });

export {RecipeSchema};

    