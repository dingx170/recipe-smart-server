import express, {Request, Response} from "express";
import {Router} from "express";
import {UserController} from '../Controllers/UserController';
import {UserModel} from '../Models/UserModel';

class UserRoute{

    public static registerRoutes(userRoute: Router) {

        // 2. get requests and pass to controller
        userRoute.get("/user/:id", UserController.retrieveUserByID);

        // userRoute.get("/user/", UserController.retrieveUser);
        
        userRoute.post("/user", UserController.createUser);

        userRoute.put("/user/:id", UserController.updateUser);

        userRoute.post("/login", UserController.logincheck);

        userRoute.get("/login", UserController.getSession);

        userRoute.get("/validation", UserController.validateNameEmail);
    }


}

export{UserRoute};