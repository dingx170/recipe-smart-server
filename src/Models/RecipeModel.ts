import {Schema} from "mongoose"
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
  public static schema: any;
  public static model: any;

  public constructor() {
    RecipeModel.createSchema();
    RecipeModel.createModel();
  }

  public static createSchema(): void {

    if (this.schema) {
      return;
    }

    this.schema = new Schema(
      {
        recipe_id: Number,
        name: String,
        member_id: Number,
        date: Date,
        steps: [String],
        ingredients: [[Number, Number]],
        group: Number,
        cost: Number,
        unit_cost: Number,
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

  public static createModel(): void {

    if (this.model) {
      return;
    }

    this.model = mongooseConnection.model<IRecipeModel>("Recipes", this.schema);
  }

  public static retrieveAllRecipes(response: any): any {
    let query = this.model.find({});
    query.exec( (err, itemArray) => {
      response.json(itemArray);
    });
  }

  public static retrieveRecipeByID(response: any, filter: Object): any {
    let query = this.model.findOne(filter);
    query.exec( (err, item) => {
      response.json(item);
    });
  }

  // For My Recipes
  public static retrieveRecipesByMemberID(response: any, filter: Object): any { 
    let query = this.model.find(filter);
    query.exec( (err, item) => {
      response.json(item);
    });
  }

  public static createRecipeByMemberID(response: any, new_recipe: any): any { 

    // let new_recipe_id: number = 0; 
    // this.model.countDocuments({}, function(err, c) {
    //   console.log('Count is ' + c);
    // });
    // new_recipe.recipe_id = new_recipe_id;

    this.model(new_recipe).save((err, new_recipe) => {
      if (err) {
        response.send(err);
        return;
      }
      response.json(new_recipe);
    });
  }

  public static updateRecipe(response: any, filter: Object, new_recipe: any): any { 

    this.model.findOneAndUpdate(filter, new_recipe, {useFindAndModify: false}, (err, recipe) => {
      if (err){
        response.send(err);
        return;
      }
      response.json(recipe);
    });
  }

  public static removeRecipe(response: any, filter: Object): any { 

    this.model.findOneAndDelete(filter, {useFindAndModify: false}, (err, recipe) => {
      if (err){
        response.send(err);
        return;
      }
      response.json(recipe);
    });
  }


  // TO-DO

  // TO-DO: allow finding names includeing keywords
  public static retrieveRecipeByName(response: any, filter: Object): any { 
    let query = this.model.find(filter);
    query.exec( (err, item) => {
      response.json(item);
    });
  }

  // TO-DO: allow finding recipes with any combos of types
  public static retrieveRecipeByType(response: any, filter: Object): any { 

    console.log(filter);

    let query = this.model.find(filter);
    query.exec( (err, item) => {
      response.json(item);
    });
  }
  
}

RecipeModel.createSchema();
RecipeModel.createModel();

export {RecipeModel};

    