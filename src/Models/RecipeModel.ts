import  {Schema} from "mongoose"
import {DataAccess} from '../DataAccess'
import {IRecipeModel} from '../Interfaces/IRecipeModel'
import {MealType} from '../Enums/MealType'
import {CuisineType} from '../Enums/CuisineType'
import {FeatureType} from '../Enums/FeatureType'
import {AllergyType} from '../Enums/AllergyType'

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
        meal_type: MealType,
        cuisine_type: CuisineType,
        feature_type: FeatureType,
        restrictions: [AllergyType],
        recipe_tags: [RECIPETAG]
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

    