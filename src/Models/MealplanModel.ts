import  {Schema} from "mongoose"
import {DataAccess} from '../DataAccess'
import {IRecipeModel} from '../Interfaces/IRecipeModel'
import {MealType} from '../Enums/MealType'
import {CuisineType} from '../Enums/CuisineType'
import {FeatureType} from '../Enums/FeatureType'
import {AllergyType} from '../Enums/AllergyType'
import {RecipeTag} from '../Enums/RecipeTag'
import { ObjectId } from "mongodb"
import { IMealplanModel } from "../Interfaces/IMealplanModel"

let mongooseConnection = DataAccess.mongooseConnection;

class MealplanModel {
    public schema: any;
    public model: any;

    public constructor() {
        
    }

    public createSchema(): void {
        this.schema = new Schema(
            {
                member_id: Schema.Types.ObjectId,
                date: Date,
                budget: Number,
                group: Number,
                recipe_list: [Schema.Types.ObjectId],
                shopping_list: [Schema.Types.ObjectId],
                meal_type: {
                    type: String,
                    enum: MealType,
                  },
                cuisine_type: {
                    type: String,
                    enum: CuisineType,
                  },
                feature_type: {
                    type: String,
                    enum: FeatureType,
                  },
                restrictions: [
                    {
                      type: String,
                      enum: AllergyType,
                    }
                ]
            }, {collection: 'mealplans'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IMealplanModel>("Mealplans", this.schema);
    }
    
}