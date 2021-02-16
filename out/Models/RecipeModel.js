"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeModel = void 0;
const mongoose_1 = require("mongoose");
const DataAccess_1 = require("../DataAccess");
const MealType_1 = require("../Enums/MealType");
const CuisineType_1 = require("../Enums/CuisineType");
const FeatureType_1 = require("../Enums/FeatureType");
const AllergyType_1 = require("../Enums/AllergyType");
const RecipeTag_1 = require("../Enums/RecipeTag");
let mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
// let mongooseObg = DataAccess.mongooseInstance;
class RecipeModel {
    constructor() {
        RecipeModel.createSchema();
        RecipeModel.createModel();
    }
    static createSchema() {
        if (this.schema) {
            return;
        }
        this.schema = new mongoose_1.Schema({
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
                enum: MealType_1.MealType,
            },
            cuisine_type: {
                type: String,
                enum: CuisineType_1.CuisineType,
            },
            feature_type: {
                type: String,
                enum: FeatureType_1.FeatureType,
            },
            restrictions: [
                {
                    type: String,
                    enum: AllergyType_1.AllergyType,
                }
            ],
            recipe_tags: [
                {
                    type: String,
                    enum: RecipeTag_1.RecipeTag,
                }
            ]
        }, { collection: 'recipes' });
    }
    static createModel() {
        if (this.model) {
            return;
        }
        this.model = mongooseConnection.model("Recipes", this.schema);
    }
    /* General methods */
    static retrieveRecipeByID(response, filter) {
        let query = this.model.findOne(filter);
        query.exec((err, item) => {
            response.json(item);
        });
    }
    static retrieveRecipesWithFilter(response, filter) {
        console.log(filter);
        let query = this.model.find(filter);
        query.exec((err, item) => {
            response.json(item);
        });
    }
    static retrieveRecipesWithFilterForMealPlan(filter) {
        console.log(filter);
        let query = this.model.find(filter);
        query.exec().then((res) => {
            console.log(res);
            return res;
        });
    }
    /* Member methods */
    static retrieveRecipesByMemberID(response, filter) {
        let query = this.model.find(filter);
        query.exec((err, item) => {
            response.json(item);
        });
    }
    static createRecipeByMemberID(response, new_recipe) {
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
    static updateRecipe(response, filter, new_recipe) {
        this.model.findOneAndUpdate(filter, new_recipe, { useFindAndModify: false }, (err, recipe) => {
            if (err) {
                response.send(err);
                return;
            }
            response.json(recipe);
        });
    }
    static removeRecipe(response, filter) {
        this.model.findOneAndDelete(filter, { useFindAndModify: false }, (err, recipe) => {
            if (err) {
                response.send(err);
                return;
            }
            response.json(recipe);
        });
    }
}
exports.RecipeModel = RecipeModel;
RecipeModel.createSchema();
RecipeModel.createModel();
