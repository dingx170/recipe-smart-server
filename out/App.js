"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const RecipeRoute_1 = require("./Routes/RecipeRoute");
const MyRecipes_1 = require("./Routes/MyRecipes");
const User_1 = require("./Routes/User");
const Mealplan_1 = require("./Routes/Mealplan");
class App {
    // run config methods
    constructor() {
        this.expApp = express_1.default();
        this.setupMiddleware();
        this.setupRoutes();
    }
    // config middleware
    setupMiddleware() {
        this.expApp.use(bodyParser.json());
        // TO-USE-LATER
        // this.express.use(logger('dev'));
        this.expApp.use(bodyParser.urlencoded({ extended: false }));
    }
    // config API endpoints
    setupRoutes() {
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
        // this.expApp.use("/recipes", recipesRoute);
        this.expApp.use("/myrecipes", MyRecipes_1.myRecipesRoute);
        this.expApp.use("/users", User_1.userRoute);
        let router = express_1.default.Router();
        var mealplan = new Mealplan_1.Mealplan();
        mealplan.registerRoutes(router);
        // 1. register routes
        RecipeRoute_1.RecipeRoute.registerRoutes(router);
        this.expApp.use('/', router);
    }
}
exports.App = App;
