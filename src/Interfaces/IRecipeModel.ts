import {ObjectId, Date, Document} from "mongoose"

interface IRecipeModel extends Document {
    name: String;
    member_id: ObjectId;
    date: Date;
    steps: String;
    ingredients: [[ObjectId, Number]];
    group: Number;
    cost: Number;
    photo: Buffer;
    likes: Number;
    meal_type: MEALTYPE;
    cuisine_type: CUISINETYPE;
    feature_type: FEATURETYPE;
    restrictions: [ALLERGYTYPE];
    recipe_tags: [RECIPETAG];
}

export {IRecipeModel};