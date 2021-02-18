import express, {Application, Request, Response} from "express";
import * as bodyParser from 'body-parser';
import {RecipeRoute} from './Routes/RecipeRoute';
// import {myRecipesRoute} from './Routes/MyRecipes';
import {UserRoute} from "./Routes/UserRoute";
import {MealplanRoute} from "./Routes/MealplanRoute"
import { RecipeModel } from "./Models/RecipeModel";
import { MyRecipeRoute } from "./Routes/MyRecipeRoute";


import ejs from "ejs";
import multer from "multer";
import path from "path";

class App {

    public expApp: Application;

    // run config methods
    constructor() {
        this.expApp = express();
        this.setupMiddleware();
        this.setupRoutes();
    }

    // config middleware
    private setupMiddleware(): void {
        this.expApp.use(bodyParser.json());

        // TO-USE-LATER
        // this.express.use(logger('dev'));
        this.expApp.use(bodyParser.urlencoded({ extended: false }));
    }

    // config API endpoints
    private setupRoutes(): void {

        let router =  express.Router();

        // 1. register routes
        RecipeRoute.registerRoutes(router);
        MyRecipeRoute.registerRoutes(router);
        UserRoute.registerRoutes(router);
        MealplanRoute.registerMealplanRoutes(router);
        // TO-USE-LATER

        // this.expApp.use('/images', express.static(__dirname+'/img'));
        // this.expApp.use('/', express.static(__dirname+'/pages'));
        // this.expApp.use("/users", UserRoute);
        
        // EJS 
        
        // this.expApp.set('view engine', 'ejs');

        // this.expApp.use(express.static(__dirname + './src'));

        //TempPageRoute.registerRoutes(router);
        

        this.expApp.use('/', router);
    }
}

export {App}