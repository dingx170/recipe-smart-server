import {Request, Response} from "express";
import {UserModel} from '../Models/UserModel';

class UserController{

    private static userModel = UserModel.getInstance();

    public static createUser(req : Request, res : Response){
        console.log(req.body);
        
	    UserController.userModel.createUser(req.body, res);

	    console.log("executed create user")
    }

    public static retrieveUser(req : Request, res : Response){
        let filter = req.query.body;
    
        UserController.userModel.retrieveUser(res, {filter});

        console.log("executed retrieve user by condition");
    }

    public static retrieveUserByID(req : Request, res : Response){
        let id = req.params.id;
        console.log('Query single list with uid: ' + id);
        UserController.userModel.retrieveUserByID(res, id);

        console.log("executed retrieve user by id")
    }

    public static updateUser(req : Request, res : Response){
        UserController.userModel.updateUser(req.params.id, req.body, res);
	    console.log("updated user");
    }

}
export {UserController}