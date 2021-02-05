import mongoose, {Model, Schema} from "mongoose"
import {DataAccess} from '../DataAccess'
import {IRecipeModel} from '../Interfaces/IRecipeModel'

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
    this.schema = new mongoose.Schema(
      {
        recipe_id: String,
        name: String,
        member_id: String
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

    