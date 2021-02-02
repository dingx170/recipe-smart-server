import express, {Application, Request, Response} from "express";
import * as bodyParser from 'body-parser';
import {recipesRoute} from './Routes/Recipes';
import {myRecipesRoute} from './Routes/MyRecipes';

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
        
        // let router = express.Router();

        // // route handler for default home page
        // router.get("/home", (req : Request, res : Response) => {
        //     res.send("Hello from server! Hello world!")
        // });

        // router.post("/myrecipe", (req : Request, res : Response) => {
        //     res.send(req.body);
        // });

        // this.expApp.use('/', router);

        // TO-USE-LATER
        // this.expApp.use('/images', express.static(__dirname+'/img'));
        // this.expApp.use('/', express.static(__dirname+'/pages'));

        this.expApp.use("/recipes", recipesRoute);
        this.expApp.use("/myrecipes", myRecipesRoute);
    }
}

export {App}