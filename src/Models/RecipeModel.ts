import  {Schema} from "mongoose"
import {DataAccess} from '../DataAccess'
import {IRecipeModel} from '../Interfaces/IRecipeModel'
import {MealType} from '../Enums/MealType'
import {CuisineType} from '../Enums/CuisineType'
import {FeatureType} from '../Enums/FeatureType'
import {AllergyType} from '../Enums/AllergyType'
import {RecipeTag} from '../Enums/RecipeTag'

let mongooseConnection = DataAccess.mongooseConnection;
// let mongooseObg = DataAccess.mongooseInstance;

class RecipeModel {
  public schema: any;
  public model: any;

  public constructor() {
    this.createSchema();
    this.createModel();
  }

  public createSchema(): void {
    this.schema = new Schema(
      {
        name: String,
        member_id: Schema.Types.ObjectId,
        date: Date,
        steps: String,
        ingredients: [[Schema.Types.ObjectId, Number]],
        group: Number,
        cost: Number,
        photo: Buffer,
        likes: Number,
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
          ],
        recipe_tags: [
          {
            type: String,
            enum: RecipeTag,
          }
          ]
      }, {collection: 'recipes'}
    );
  }

  public createModel(): void {
    this.model = mongooseConnection.model<IRecipeModel>("Recipes", this.schema);
  }

  public retrieveAllRecipes(response: any): any {
    var query = this.model.find({});
    query.exec( (err, itemArray) => {
      response.json(itemArray);
    });
  }
  
}

export {RecipeModel};

    